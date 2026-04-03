import React, { createContext, useState, useEffect } from 'react';
import productService from '../services/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        ...filters,
        page: pagination.currentPage
      });
      setProducts(data.products);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const changePage = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      filters,
      pagination,
      updateFilters,
      changePage,
      fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};