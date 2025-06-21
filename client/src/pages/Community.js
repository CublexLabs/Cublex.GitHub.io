import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaDiscord, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok,
  FaUsers,
  FaCalendar,
  FaStar,
  FaHeart
} from 'react-icons/fa';
import './Community.css';

const Community = () => {
  const socialPlatforms = [
    {
      name: 'Discord',
      icon: FaDiscord,
      description: 'Join our Discord community for real-time chat, events, and announcements',
      members: '2,500+',
      color: '#7289DA',
      link: 'https://discord.gg/cublex'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      description: 'Follow us for updates, sneak peeks, and community highlights',
      members: '1,200+',
      color: '#1DA1F2',
      link: 'https://twitter.com/CublexServer'
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      description: 'Watch gameplay videos, tutorials, and server highlights',
      members: '800+',
      color: '#FF0000',
      link: 'https://youtube.com/CublexMC'
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      description: 'Short-form content, memes, and behind-the-scenes moments',
      members: '500+',
      color: '#000000',
      link: 'https://tiktok.com/@CublexMC'
    }
  ];

  const communityStats = [
    { icon: FaUsers, label: 'Total Members', value: '5,000+' },
    { icon: FaCalendar, label: 'Events This Month', value: '12' },
    { icon: FaStar, label: 'Active Players', value: '1,200+' },
    { icon: FaHeart, label: 'Community Rating', value: '4.9/5' }
  ];

  return (
    <div className="community-page">
      <motion.div
        className="community-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Join Our Community</h1>
        <p>Connect with thousands of players and be part of something amazing</p>
      </motion.div>

      <div className="community-content">
        {/* Community Stats */}
        <motion.section
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Community Statistics</h2>
          <div className="stats-grid">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Social Platforms */}
        <motion.section
          className="social-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Connect With Us</h2>
          <div className="social-grid">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                style={{ '--platform-color': platform.color }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="platform-icon">
                  <platform.icon />
                </div>
                <div className="platform-info">
                  <h3>{platform.name}</h3>
                  <p>{platform.description}</p>
                  <div className="platform-stats">
                    <span className="member-count">{platform.members} members</span>
                  </div>
                </div>
                <div className="join-button">Join Now</div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Community Features */}
        <motion.section
          className="features-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Community Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <FaCalendar className="feature-icon" />
              <h3>Regular Events</h3>
              <p>Weekly tournaments, building competitions, and special events</p>
            </div>
            <div className="feature-item">
              <FaUsers className="feature-icon" />
              <h3>Player Groups</h3>
              <p>Join clans, teams, and specialized player communities</p>
            </div>
            <div className="feature-item">
              <FaStar className="feature-icon" />
              <h3>Rewards System</h3>
              <p>Earn points, badges, and exclusive rewards for participation</p>
            </div>
            <div className="feature-item">
              <FaHeart className="feature-icon" />
              <h3>Supportive Environment</h3>
              <p>Friendly community with helpful moderators and guides</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Community; 