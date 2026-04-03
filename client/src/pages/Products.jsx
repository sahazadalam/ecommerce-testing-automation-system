import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/Product/ProductCard';
import ProductSkeleton from '../components/Product/ProductSkeleton';

const Products = () => {
  const { products, loading, filters, updateFilters, pagination, changePage } = useContext(ProductContext);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const categories = ['All', 'Electronics', 'Audio', 'Footwear', 'Wearables', 'Clothing', 'Books'];

  const handleSearch = () => {
    updateFilters({ search: searchTerm });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryFilter = (category) => {
    updateFilters({ category: category === 'All' ? '' : category });
  };

  const handlePriceFilter = (min, max) => {
    updateFilters({ minPrice: min, maxPrice: max });
  };

  const clearFilters = () => {
    setSearchTerm('');
    updateFilters({ search: '', category: '', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="lg:w-64 bg-white rounded-lg shadow-md p-6 h-fit"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === (category === 'All' ? '' : category)}
                          onChange={() => handleCategoryFilter(category)}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handlePriceFilter('', '')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear Price Filter
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePriceFilter(0, 50)}
                        className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                      >
                        Under $50
                      </button>
                      <button
                        onClick={() => handlePriceFilter(50, 100)}
                        className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                      >
                        $50 - $100
                      </button>
                      <button
                        onClick={() => handlePriceFilter(100, 200)}
                        className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                      >
                        $100 - $200
                      </button>
                      <button
                        onClick={() => handlePriceFilter(200, 1000)}
                        className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                      >
                        $200+
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Clear All Filters */}
                {(filters.search || filters.category || filters.minPrice) && (
                  <button
                    onClick={clearFilters}
                    className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button
                      onClick={() => changePage(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      {pagination.currentPage} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => changePage(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;