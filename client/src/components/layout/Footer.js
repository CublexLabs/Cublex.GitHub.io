import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  FaDiscord, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok,
  FaHeart,
  FaServer,
  FaUsers,
  FaEnvelope
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const { status, community } = useSelector(state => state.server);

  const socialLinks = [
    { icon: FaDiscord, url: 'https://discord.gg/cublex', label: 'Discord' },
    { icon: FaTwitter, url: 'https://twitter.com/CublexServer', label: 'Twitter' },
    { icon: FaYoutube, url: 'https://youtube.com/CublexMC', label: 'YouTube' },
    { icon: FaTiktok, url: 'https://tiktok.com/@CublexMC', label: 'TikTok' },
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/community', label: 'Community' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Join Beta' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Server Info */}
          <div className="footer-section">
            <h3 className="footer-title">Cublex</h3>
            <p className="footer-description">
              Experience the latest Minecraft 1.21.6 features in our vibrant community.
              Join thousands of players in the ultimate adventure!
            </p>
            
            <div className="server-status-footer">
              <div className="status-item">
                <FaServer />
                <span>{status.ip}</span>
              </div>
              <div className="status-item">
                <FaUsers />
                <span>{status.onlinePlayers} online</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Stats */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Community</h4>
            <div className="community-stats">
              <div className="stat-item">
                <span className="stat-number">{community.discordMembers.toLocaleString()}</span>
                <span className="stat-label">Discord Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{community.totalPlayers.toLocaleString()}</span>
                <span className="stat-label">Total Players</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{community.eventsThisMonth}</span>
                <span className="stat-label">Events This Month</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="social-links-footer">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-footer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon />
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope />
                <span>support@cublex.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 Cublex. Made with <FaHeart className="heart-icon" /> for the Minecraft community.
            </p>
            
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
              <Link to="/rules" className="footer-bottom-link">Server Rules</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 