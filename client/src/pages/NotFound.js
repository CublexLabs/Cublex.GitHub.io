import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#4CAF50', textDecoration: 'underline' }}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound; 