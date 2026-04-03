const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPaymentStatus,
  getPaymentHistory
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/process', processPayment);
router.get('/history', getPaymentHistory);
router.get('/:paymentId', getPaymentStatus);

module.exports = router;