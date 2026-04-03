export const API_BASE_URL = 'http://localhost:5000/api';

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Audio',
  'Footwear',
  'Wearables',
  'Clothing',
  'Books'
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal'
};

export const SHIPPING_COST = 10;
export const FREE_SHIPPING_THRESHOLD = 100;
export const TAX_RATE = 0.1;