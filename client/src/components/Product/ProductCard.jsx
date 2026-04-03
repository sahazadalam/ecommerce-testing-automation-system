import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(product._id, 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      className="product-card relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badges */}
          {product.stock < 10 && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
            >
              Only {product.stock} left
            </motion.div>
          )}
          
          {product.rating >= 4.5 && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-semibold"
            >
              🔥 Best Seller
            </motion.div>
          )}
          
          {/* Quick Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-2 left-0 right-0 flex justify-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Eye className="w-5 h-5 text-gray-600" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-blue-600 font-semibold">{product.category}</span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold gradient-text">${product.price}</span>
              {product.stock > 0 ? (
                <p className="text-green-600 text-xs">In Stock</p>
              ) : (
                <p className="text-red-600 text-xs">Out of Stock</p>
              )}
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Add to Cart Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50"
          >
            Added to cart! 🛒
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;