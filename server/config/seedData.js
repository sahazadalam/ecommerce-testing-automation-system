const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const products = [
  {
    name: "iPhone 15 Pro Max",
    description: "Apple's latest flagship with A17 Pro chip, titanium design, and amazing camera system.",
    price: 1199,
    category: "Electronics",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
    rating: 4.8
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android experience with AI features and S Pen integration.",
    price: 1299,
    category: "Electronics",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    rating: 4.7
  },
  {
    name: "MacBook Pro M3",
    description: "Powerful laptop with M3 chip, 16-inch Liquid Retina XDR display.",
    price: 2499,
    category: "Electronics",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    rating: 4.9
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    price: 399,
    category: "Audio",
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    rating: 4.8
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable sneakers with iconic Air Max cushioning.",
    price: 150,
    category: "Footwear",
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    rating: 4.6
  },
  {
    name: "Smart Watch Ultra",
    description: "Advanced fitness tracking, GPS, and heart rate monitoring.",
    price: 399,
    category: "Wearables",
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
    rating: 4.5
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    
    // Insert products
    await Product.insertMany(products);
    
    console.log('✅ Database seeded successfully!');
    console.log(`📦 Added ${products.length} products`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();