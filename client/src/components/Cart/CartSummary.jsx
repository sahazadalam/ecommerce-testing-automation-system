import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
      
      <div className="space-y-2 mb-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Link
        to="/checkout"
        className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;