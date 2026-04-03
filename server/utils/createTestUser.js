const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcryptjs');

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // First, drop the existing collections to start fresh
    try {
      await User.collection.drop();
      console.log('⚠️  Dropped Users collection');
    } catch (err) {
      console.log('Users collection may not exist yet');
    }
    
    try {
      await Cart.collection.drop();
      console.log('⚠️  Dropped Carts collection');
    } catch (err) {
      console.log('Carts collection may not exist yet');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'user'
    });
    
    console.log('✅ User created successfully');
    console.log('User ID:', user._id);
    
    // Create cart for user
    const cart = await Cart.create({ 
      user: user._id, 
      items: [], 
      totalPrice: 0 
    });
    
    console.log('✅ Cart created successfully');
    console.log('Cart ID:', cart._id);
    
    console.log('\n📋 =================================');
    console.log('✅ TEST USER CREATED SUCCESSFULLY!');
    console.log('📧 Email: test@example.com');
    console.log('🔑 Password: password123');
    console.log('=====================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

createTestUser();