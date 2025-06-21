import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShieldAlt, FaMagic, FaCloud, FaRocket } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Tricky Trials',
      icon: FaShieldAlt,
      description: 'Face challenging trials and earn exclusive rewards',
      details: [
        'New trial chambers with unique challenges',
        'Exclusive armor and weapon sets',
        'Progressive difficulty system',
        'Leaderboards and achievements'
      ],
      color: '#4CAF50'
    },
    {
      title: 'Spring Update',
      icon: FaMagic,
      description: 'Experience the magic of spring with new content',
      details: [
        'New biomes and seasonal changes',
        'Spring-themed mobs and items',
        'Weather effects and particle systems',
        'Seasonal events and celebrations'
      ],
      color: '#2196F3'
    },
    {
      title: 'Chase the Skies',
      icon: FaCloud,
      description: 'Take to the skies with enhanced flying mechanics',
      details: [
        'Improved elytra mechanics',
        'New flying mobs and creatures',
        'Sky islands and floating structures',
        'Aerial combat and exploration'
      ],
      color: '#9C27B0'
    }
  ];

  return (
    <div className="features-page">
      <motion.div
        className="features-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Minecraft 1.21.6 Features</h1>
        <p>Discover the latest updates and enhancements</p>
      </motion.div>

      <div className="features-content">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="feature-section"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="feature-header">
              <div 
                className="feature-icon"
                style={{ color: feature.color }}
              >
                <feature.icon />
              </div>
              <div className="feature-info">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
            </div>

            <div className="feature-details">
              <h3>Key Features:</h3>
              <ul>
                {feature.details.map((detail, detailIndex) => (
                  <motion.li
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: detailIndex * 0.1, duration: 0.4 }}
                  >
                    <FaStar className="detail-icon" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="features-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FaRocket className="cta-icon" />
        <h3>Ready to Experience These Features?</h3>
        <p>Join our server and be among the first to try these amazing updates!</p>
        <button className="btn btn-primary">Join Now</button>
      </motion.div>
    </div>
  );
};

export default Features; 