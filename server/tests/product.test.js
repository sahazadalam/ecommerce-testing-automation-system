const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');
const User = require('../models/User');

const testDB = 'mongodb://localhost:27017/ecommerce_test';

beforeAll(async () => {
  await mongoose.connect(testDB);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Product API Tests', () => {
  let authToken = '';
  let testUser = null;
  let testProduct = null;

  beforeEach(async () => {
    // Create test user
    testUser = await User.create({
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    
    // Create test product
    testProduct = await Product.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      category: 'Electronics',
      stock: 10,
      imageUrl: 'https://example.com/image.jpg',
      rating: 4.5
    });
  });

  test('GET /api/products - Should get all products', async () => {
    const response = await request(app)
      .get('/api/products');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
  });

  test('GET /api/products/:id - Should get single product', async () => {
    const response = await request(app)
      .get(`/api/products/${testProduct._id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('Test Product');
  });

  test('GET /api/products - Should search products', async () => {
    const response = await request(app)
      .get('/api/products?search=Test');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.products.length).toBeGreaterThan(0);
  });
});