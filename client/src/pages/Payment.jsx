import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  if (!orderId) {
    navigate('/checkout');
    return null;
  }

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    
    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '');
      if (value.length > 16) value = value.slice(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\//g, '');
      if (value.length > 4) value = value.slice(0, 4);
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }
    
    // Limit CVV
    if (name === 'cvv') {
      if (value.length > 3) value = value.slice(0, 3);
    }
    
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate card details
    const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return;
    }
    
    if (cardDetails.expiryDate.length !== 5) {
      toast.error('Please enter valid expiry date (MM/YY)');
      return;
    }
    
    if (cardDetails.cvv.length !== 3) {
      toast.error('Please enter valid CVV');
      return;
    }
    
    if (!cardDetails.cardName) {
      toast.error('Please enter cardholder name');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.post('/payments/process', {
        orderId,
        paymentMethod: 'credit_card',
        cardDetails: {
          cardNumber: cleanCardNumber,
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
          cardName: cardDetails.cardName
        }
      });
      
      if (response.data.success) {
        toast.success('Payment successful!');
        navigate(`/order-success/${orderId}`);
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Payment Details</h1>
            </div>
            <p className="mt-2 text-blue-100">Amount to pay: ${total?.toFixed(2)}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="JOHN DOE"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                required
                maxLength="19"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                  required
                  maxLength="5"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleChange}
                  required
                  maxLength="3"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Test Card Information</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Use card ending with 4242 for successful payment<br />
                    Use card ending with 0000 for failed payment
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ${total?.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;