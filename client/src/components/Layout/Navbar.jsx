import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, LogOut, Package, Menu, X, Home, ShoppingBag } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/products', icon: ShoppingBag, label: 'Products' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="text-2xl font-bold">
                <span className="gradient-text">ShopHub</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition-colors">
                      <Package className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                    <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      <AnimatePresence>
                        {cartCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            {cartCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>

                  <div className="relative group">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name.split(' ')[0]}</span>
                    </motion.button>
                    
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 0, y: -10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block"
                    >
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart ({cartCount})</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-gray-700 hover:text-red-600 py-2 w-full transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;