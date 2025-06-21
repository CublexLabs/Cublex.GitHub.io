import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaServer, 
  FaUsers, 
  FaSignal, 
  FaClock, 
  FaMap,
  FaWifi,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';
import './ServerStats.css';

const ServerStats = ({ serverInfo }) => {
  // Defensive: If serverInfo is missing, show loading
  if (!serverInfo) {
    return <div className="server-stats"><div className="stats-loading">Loading server stats...</div></div>;
  }

  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime, setUptime] = useState('0d 0h 0m');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateUptime = () => {
      // Defensive: If startTime is missing, show 'Unknown'
      if (!serverInfo.startTime) {
        setUptime('Unknown');
        return;
      }
      const startTime = new Date(serverInfo.startTime);
      const diff = currentTime - startTime;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setUptime(`${days}d ${hours}h ${minutes}m`);
    };
    calculateUptime();
  }, [currentTime, serverInfo.startTime]);

  const stats = [
    {
      icon: FaServer,
      label: 'Server Status',
      value: serverInfo.status || 'Unknown',
      color: serverInfo.status === 'Online' ? '#4CAF50' : '#F44336',
      subValue: serverInfo.version || ''
    },
    {
      icon: FaUsers,
      label: 'Players Online',
      value: serverInfo.playersOnline !== undefined && serverInfo.maxPlayers !== undefined ? `${serverInfo.playersOnline}/${serverInfo.maxPlayers}` : 'Unknown',
      color: '#2196F3',
      subValue: (serverInfo.playersOnline !== undefined && serverInfo.maxPlayers ? `${Math.round((serverInfo.playersOnline / serverInfo.maxPlayers) * 100)}% capacity` : '')
    },
    {
      icon: FaSignal,
      label: 'TPS',
      value: serverInfo.tps !== undefined ? serverInfo.tps : 'Unknown',
      color: serverInfo.tps >= 18 ? '#4CAF50' : serverInfo.tps >= 15 ? '#FF9800' : '#F44336',
      subValue: 'Ticks per second'
    },
    {
      icon: FaClock,
      label: 'Uptime',
      value: uptime,
      color: '#9C27B0',
      subValue: 'Server running time'
    },
    {
      icon: FaMap,
      label: 'World Size',
      value: serverInfo.worldSize || 'Unknown',
      color: '#795548',
      subValue: 'Total world size'
    },
    {
      icon: FaWifi,
      label: 'Latency',
      value: serverInfo.latency !== undefined ? `${serverInfo.latency}ms` : 'Unknown',
      color: serverInfo.latency < 50 ? '#4CAF50' : serverInfo.latency < 100 ? '#FF9800' : '#F44336',
      subValue: 'Average ping'
    }
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
    <div className="server-stats">
      <motion.div
        className="stats-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 className="stats-title" variants={itemVariants}>
          <FaServer className="title-icon" />
          Server Statistics
        </motion.h3>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-header">
                <div 
                  className="stat-icon"
                  style={{ color: stat.color }}
                >
                  <stat.icon />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              
              <div className="stat-subvalue">
                {stat.subValue}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="server-info" variants={itemVariants}>
          <div className="info-grid">
            <div className="info-item">
              <FaShieldAlt className="info-icon" />
              <div className="info-content">
                <h4>Server Protection</h4>
                <p>Advanced anti-cheat and grief protection</p>
              </div>
            </div>
            
            <div className="info-item">
              <FaStar className="info-icon" />
              <div className="info-content">
                <h4>Premium Experience</h4>
                <p>High-performance hardware and 24/7 support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServerStats; 