import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaClock, FaCalendar, FaHourglassHalf } from 'react-icons/fa';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, icon: FaCalendar },
    { label: 'Hours', value: timeLeft.hours, icon: FaClock },
    { label: 'Minutes', value: timeLeft.minutes, icon: FaHourglassHalf },
    { label: 'Seconds', value: timeLeft.seconds, icon: FaRocket }
  ];

  return (
    <div className="countdown-timer">
      <motion.div
        className="countdown-grid"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="countdown-unit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="unit-icon">
              <unit.icon />
            </div>
            
            <div className="unit-value">
              {unit.value.toString().padStart(2, '0')}
            </div>
            
            <div className="unit-label">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        className="countdown-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <FaRocket className="message-icon" />
        <span>Get ready for the ultimate Minecraft experience!</span>
      </motion.div>
    </div>
  );
};

export default CountdownTimer; 