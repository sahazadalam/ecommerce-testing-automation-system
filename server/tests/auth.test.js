const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Use a test database
const testDB = 'mongodb://localhost:27017/ecommerce_test';

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(testDB);
});

afterAll(async () => {
  // Clean up and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe('Authentication API Tests', () => {
  let testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123'
  };
  let authToken = '';

  test('POST /api/auth/register - Should register new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.email).toBe(testUser.email);
    authToken = response.body.token;
  });

  test('POST /api/auth/login - Should login with correct credentials', async () => {
    // First register a user
    await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - Should fail with wrong password', async () => {
    // First register a user
    await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });
    
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('GET /api/auth/profile - Should get user profile with valid token', async () => {
    // First register and get token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    const token = registerRes.body.token;
    
    const response = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(testUser.email);
  });
});