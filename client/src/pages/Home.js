import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaPlay, 
  FaDiscord, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok,
  FaUsers,
  FaClock,
  FaStar,
  FaRocket
} from 'react-icons/fa';
import { 
  fetchServerStatus, 
  fetchServerFeatures, 
  fetchCommunityStats,
  fetchServerTimeline 
} from '../store/slices/serverSlice';
import HeroSection from '../components/home/HeroSection';
import FeatureHighlights from '../components/home/FeatureHighlights';
import CountdownTimer from '../components/home/CountdownTimer';
import CommunitySection from '../components/home/CommunitySection';
import ServerStats from '../components/home/ServerStats';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { scrollY } = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { status, features, community, timeline } = useSelector(state => state.server);
  const { isAuthenticated } = useSelector(state => state.auth);

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const featuresY = useTransform(scrollY, [200, 800], [0, -50]);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchServerStatus());
    dispatch(fetchServerFeatures());
    dispatch(fetchCommunityStats());
    dispatch(fetchServerTimeline());
    
    // Set loaded state after a short delay for animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Beta launch date (example: 3 months from now)
  const betaLaunchDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return (
    <>
      <Helmet>
        <title>Cublex - Minecraft 1.21.6 Server | Experience the Latest Features</title>
        <meta name="description" content="Join Cublex, the ultimate Minecraft 1.21.6 server featuring Trial Chambers, rideable Ghasts, and the latest updates. Experience adventure and creativity in our vibrant community!" />
        <meta name="keywords" content="minecraft server, minecraft 1.21.6, trial chambers, rideable ghasts, minecraft community" />
        <meta property="og:title" content="Cublex - Minecraft 1.21.6 Server" />
        <meta property="og:description" content="Experience the latest Minecraft 1.21.6 features in our vibrant community!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cublex.com" />
      </Helmet>

      <div className="home-page">
        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <HeroSection 
            status={status}
            isAuthenticated={isAuthenticated}
            isLoaded={isLoaded}
          />
        </motion.section>

        {/* Server Stats */}
        <section className="server-stats-section">
          <div className="container">
            <ServerStats 
              status={status}
              community={community}
            />
          </div>
        </section>

        {/* Feature Highlights */}
        <motion.section 
          className="features-section"
          style={{ y: featuresY }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="section-header"
            >
              <h2>Latest Minecraft 1.21.6 Features</h2>
              <p>Experience the newest content and mechanics in our server</p>
            </motion.div>
            
            <FeatureHighlights features={features} />
          </div>
        </motion.section>

        {/* Countdown to Beta */}
        <section className="countdown-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="countdown-container"
            >
              <div className="countdown-header">
                <h2>Beta Launch Coming Soon</h2>
                <p>Get ready to experience Cublex in all its glory!</p>
              </div>
              
              <CountdownTimer targetDate={betaLaunchDate} />
              
              <div className="countdown-actions">
                <a 
                  href="https://discord.gg/cublex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FaDiscord />
                  Join Discord for Updates
                </a>
                
                {!isAuthenticated && (
                  <a href="/register" className="btn btn-outline">
                    <FaRocket />
                    Join Beta Waitlist
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Section */}
        <section className="community-section">
          <div className="container">
            <CommunitySection 
              community={community}
              timeline={timeline}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="cta-content"
            >
              <h2>Ready to Start Your Adventure?</h2>
              <p>Join thousands of players in the ultimate Minecraft 1.21.6 experience</p>
              
              <div className="cta-buttons">
                <div className="server-info">
                  <span className="server-ip">{status.ip}</span>
                  <span className="server-version">Minecraft {status.version}</span>
                </div>
                
                <div className="action-buttons">
                  <a 
                    href="https://discord.gg/cublex" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <FaDiscord />
                    Join Discord
                  </a>
                  
                  {!isAuthenticated ? (
                    <a href="/register" className="btn btn-primary">
                      <FaRocket />
                      Join Beta
                    </a>
                  ) : (
                    <a href="/features" className="btn btn-primary">
                      <FaStar />
                      Explore Features
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Particle Effects */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home; 