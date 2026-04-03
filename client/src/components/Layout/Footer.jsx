import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-gray-300">Your one-stop shop for everything!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-300 hover:text-white">Products</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
              <li><a href="/orders" className="text-gray-300 hover:text-white">Orders</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">Email: sahazadalam@gmail.com</p>
            <p className="text-gray-300">Phone: +917905464147</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; 2026 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;