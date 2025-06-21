import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRocket, FaCloud, FaUsers, FaShieldAlt, FaMagic } from 'react-icons/fa';
import './FeatureHighlights.css';

const FeatureHighlights = ({ features }) => {
  const featureIcons = {
    trickyTrials: FaShieldAlt,
    springUpdate: FaMagic,
    chaseTheSkies: FaCloud
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="feature-highlights"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="features-grid">
        {features.map((feature, index) => {
          const IconComponent = featureIcons[feature.title.toLowerCase().replace(/\s+/g, '')] || FaStar;
          
          return (
            <motion.div
              key={feature.title}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="feature-icon">
                <IconComponent />
              </div>
              
              <h3 className="feature-title">{feature.title}</h3>
              
              <p className="feature-description">{feature.description}</p>
              
              <ul className="feature-list">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="feature-item">
                    <FaStar className="item-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="feature-actions">
                <button className="btn btn-outline feature-btn">
                  Learn More
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FeatureHighlights; 