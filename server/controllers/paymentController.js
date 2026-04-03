const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { processMockPayment } = require('../utils/mockPayment');

// @desc    Process payment
// @route   POST /api/payments/process
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, cardDetails } = req.body;
    
    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Process mock payment
    const paymentResult = await processMockPayment({
      amount: order.totalPrice,
      cardDetails,
      paymentMethod
    });
    
    // Create payment record
    const payment = await Payment.create({
      order: orderId,
      user: req.user._id,
      amount: order.totalPrice,
      paymentMethod,
      paymentStatus: paymentResult.status,
      transactionId: paymentResult.transactionId,
      paymentDetails: paymentResult
    });
    
    // Update order if payment successful
    if (paymentResult.status === 'completed') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = 'processing';
      order.paymentResult = {
        id: paymentResult.transactionId,
        status: 'success',
        updateTime: new Date().toISOString()
      };
      await order.save();
      
      res.json({
        success: true,
        message: 'Payment successful',
        payment,
        order
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed',
        payment
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get payment status
// @route   GET /api/payments/:paymentId
// @access  Private
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate('order', 'orderNumber totalPrice');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Check authorization
    if (payment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('order', 'orderNumber totalPrice')
      .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  processPayment,
  getPaymentStatus,
  getPaymentHistory
};