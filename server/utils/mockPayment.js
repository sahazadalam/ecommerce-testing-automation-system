const processMockPayment = async ({ amount, cardDetails, paymentMethod }) => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation
  if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
    return {
      status: 'failed',
      transactionId: null,
      message: 'Missing card details'
    };
  }
  
  // Mock card number validation (simple check for demo)
  const lastFourDigits = cardDetails.cardNumber.slice(-4);
  
  // Always succeed for test card 4242
  if (lastFourDigits === '4242') {
    return {
      status: 'completed',
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: 'Payment successful',
      amount,
      lastFourDigits
    };
  }
  
  // Always fail for test card 0000
  if (lastFourDigits === '0000') {
    return {
      status: 'failed',
      transactionId: null,
      message: 'Payment declined by bank',
      amount,
      lastFourDigits
    };
  }
  
  // Random success/failure for other cards (80% success for demo)
  const isSuccess = Math.random() < 0.8;
  
  if (isSuccess) {
    return {
      status: 'completed',
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: 'Payment successful',
      amount,
      lastFourDigits
    };
  } else {
    return {
      status: 'failed',
      transactionId: null,
      message: 'Payment failed. Please try again.',
      amount,
      lastFourDigits
    };
  }
};

module.exports = { processMockPayment };