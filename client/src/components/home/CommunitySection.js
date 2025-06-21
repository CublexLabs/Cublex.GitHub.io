import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaDiscord, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok,
  FaCalendar,
  FaClock,
  FaStar
} from 'react-icons/fa';
import './CommunitySection.css';

const CommunitySection = ({ community, timeline }) => {
  const socialStats = [
    { icon: FaDiscord, label: 'Discord Members', value: community.discordMembers, color: '#7289DA' },
    { icon: FaTwitter, label: 'Twitter Followers', value: community.twitterFollowers, color: '#1DA1F2' },
    { icon: FaYoutube, label: 'YouTube Subscribers', value: community.youtubeSubscribers, color: '#FF0000' },
    { icon: FaTiktok, label: 'TikTok Followers', value: community.tiktokFollowers, color: '#000000' }
  ];

  const communityStats = [
    { icon: FaUsers, label: 'Total Players', value: community.totalPlayers.toLocaleString() },
    { icon: FaClock, label: 'Total Playtime', value: community.totalPlaytime },
    { icon: FaCalendar, label: 'Events This Month', value: community.eventsThisMonth },
    { icon: FaStar, label: 'Active Players', value: community.activePlayers }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="community-section">
      <motion.div
        className="community-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Community Stats */}
        <motion.div className="stats-section" variants={itemVariants}>
          <h3 className="section-title">Community Statistics</h3>
          <div className="stats-grid">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Media Stats */}
        <motion.div className="social-section" variants={itemVariants}>
          <h3 className="section-title">Follow Our Community</h3>
          <div className="social-grid">
            {socialStats.map((social, index) => (
              <motion.a
                key={social.label}
                href={`https://${social.label.toLowerCase().includes('discord') ? 'discord.gg/cublex' : 
                       social.label.toLowerCase().includes('twitter') ? 'twitter.com/CublexServer' :
                       social.label.toLowerCase().includes('youtube') ? 'youtube.com/CublexMC' :
                       'tiktok.com/@CublexMC'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                style={{ '--social-color': social.color }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="social-icon">
                  <social.icon />
                </div>
                <div className="social-value">{social.value.toLocaleString()}</div>
                <div className="social-label">{social.label}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="timeline-section" variants={itemVariants}>
          <h3 className="section-title">Development Timeline</h3>
          <div className="timeline">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className={`timeline-item ${phase.status}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line"></div>
                </div>
                
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4 className="timeline-title">{phase.phase}</h4>
                    <span className="timeline-date">{phase.date}</span>
                  </div>
                  
                  <p className="timeline-description">{phase.description}</p>
                  
                  <div className="timeline-features">
                    {phase.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="timeline-feature">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {phase.status === 'active' && (
                    <div className="status-badge active">
                      <FaStar />
                      <span>Currently Active</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommunitySection; 