import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 py-4 border-b last:border-b-0"
    >
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">${item.price.toFixed(2)}</p>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
              className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
              className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => onRemove(item.product._id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default CartItem;