import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaCog, 
  FaDiscord,
  FaTwitter,
  FaYoutube,
  FaTiktok
} from 'react-icons/fa';
import { logoutUser } from '../../store/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated, isAdmin } = useSelector(state => state.auth);
  const { status } = useSelector(state => state.server);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/community', label: 'Community' },
  ];

  const socialLinks = [
    { icon: FaDiscord, url: 'https://discord.gg/cublex', label: 'Discord' },
    { icon: FaTwitter, url: 'https://twitter.com/CublexServer', label: 'Twitter' },
    { icon: FaYoutube, url: 'https://youtube.com/CublexMC', label: 'YouTube' },
    { icon: FaTiktok, url: 'https://tiktok.com/@CublexMC', label: 'TikTok' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="logo-container"
            >
              <span className="logo-text">Cublex</span>
              <span className="logo-version">1.21.6</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Server Status */}
          <div className="server-status">
            <div className="status-indicator">
              <span className={`status-dot ${status.status === 'online' ? 'online' : 'offline'}`}></span>
              <span className="status-text">
                {status.onlinePlayers}/{status.maxPlayers}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>

          {/* User Menu */}
          <div className="user-menu">
            {isAuthenticated ? (
              <div className="user-dropdown">
                <motion.button
                  className="user-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FaUser />
                  <span className="username">{user?.username}</span>
                </motion.button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="user-info">
                        <span className="user-name">{user?.username}</span>
                        <span className="user-role">{user?.role}</span>
                      </div>
                      
                      {isAdmin && (
                        <Link to="/admin" className="dropdown-item">
                          <FaCog />
                          Admin Panel
                        </Link>
                      )}
                      
                      <button onClick={handleLogout} className="dropdown-item">
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Join Beta
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-nav-content">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="mobile-social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-social-link"
                    >
                      <social.icon />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 