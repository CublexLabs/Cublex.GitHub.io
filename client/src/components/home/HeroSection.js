import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaPlay, FaDiscord, FaRocket, FaUsers, FaStar } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = ({ status, isAuthenticated, isLoaded }) => {
  const [ghastPosition, setGhastPosition] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (isLoaded) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" }
      });
    }
  }, [isLoaded, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGhastPosition(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const ghastVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="hero-section">
      {/* Background with animated clouds and fog */}
      <div className="hero-background">
        <div className="clouds">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="cloud"
              style={{
                left: `${i * 20}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="fog-layer">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="fog"
              style={{
                left: `${i * 30}%`,
                animationDelay: `${i * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Happy Ghast */}
      <motion.div
        className="happy-ghast"
        style={{
          left: `${ghastPosition}%`,
          top: `${20 + Math.sin(ghastPosition * 0.1) * 10}%`
        }}
        variants={ghastVariants}
        animate="float"
      >
        <div className="ghast-body">
          <div className="ghast-tentacles">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="tentacle"
                style={{
                  transform: `rotate(${i * 40}deg)`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          <div className="ghast-face">
            <div className="ghast-eyes">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
            </div>
            <div className="ghast-mouth"></div>
          </div>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="container">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hero-title"
            >
              Welcome to Cublex
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hero-subtitle"
            >
              Experience the latest Minecraft 1.21.6 features in our vibrant community
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="hero-features"
            >
              <div className="feature-tag">
                <FaStar />
                <span>Tricky Trials</span>
              </div>
              <div className="feature-tag">
                <FaUsers />
                <span>Rideable Ghasts</span>
              </div>
              <div className="feature-tag">
                <FaRocket />
                <span>Latest Updates</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="hero-actions"
            >
              <div className="server-status-display">
                <div className="status-indicator">
                  <span className={`status-dot ${status.status === 'online' ? 'online' : 'offline'}`}></span>
                  <span className="status-text">
                    {status.onlinePlayers} players online
                  </span>
                </div>
                <div className="server-ip-display">
                  <span className="ip-label">Server IP:</span>
                  <span className="ip-address">{status.ip}</span>
                </div>
              </div>

              <div className="action-buttons">
                {!isAuthenticated ? (
                  <>
                    <motion.a
                      href="/register"
                      className="btn btn-primary hero-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaRocket />
                      Join Beta
                    </motion.a>
                    
                    <motion.a
                      href="https://discord.gg/cublex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary hero-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDiscord />
                      Join Discord
                    </motion.a>
                  </>
                ) : (
                  <>
                    <motion.a
                      href="/features"
                      className="btn btn-primary hero-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaStar />
                      Explore Features
                    </motion.a>
                    
                    <motion.a
                      href="https://discord.gg/cublex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline hero-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDiscord />
                      Community
                    </motion.a>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>Scroll to explore</span>
      </motion.div>

      {/* Locator bar motif */}
      <div className="locator-bar">
        <div className="locator-content">
          <div className="locator-item">
            <span className="locator-label">Players</span>
            <span className="locator-value">{status.onlinePlayers}/{status.maxPlayers}</span>
          </div>
          <div className="locator-item">
            <span className="locator-label">Status</span>
            <span className={`locator-value ${status.status}`}>{status.status}</span>
          </div>
          <div className="locator-item">
            <span className="locator-label">Version</span>
            <span className="locator-value">{status.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 