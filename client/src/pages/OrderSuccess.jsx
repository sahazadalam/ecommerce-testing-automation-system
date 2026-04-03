import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const data = await orderService.getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Order not found</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-green-100">Thank you for your purchase</p>
          </div>
          
          <div className="p-6">
            <div className="border-b pb-4 mb-4">
              <p className="text-gray-600">Order Number</p>
              <p className="font-mono text-sm">{order._id}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Order Status</p>
                  <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Shipping Address</p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-blue-600">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link
                to="/orders"
                className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View My Orders
              </Link>
              <Link
                to="/"
                className="flex-1 border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;