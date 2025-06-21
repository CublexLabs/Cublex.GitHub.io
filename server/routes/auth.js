const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user database (replace with actual database)
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@cublex.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin',
    minecraftUsername: 'CublexAdmin',
    joinDate: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 2,
    username: 'player1',
    email: 'player1@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'user',
    minecraftUsername: 'PlayerOne',
    joinDate: new Date('2024-02-15'),
    lastLogin: new Date()
  }
];

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, minecraftUsername } = req.body;

    // Check if user already exists
    const existingUser = mockUsers.find(user => 
      user.username === username || user.email === email
    );

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      username,
      email,
      password: hashedPassword,
      role: 'user',
      minecraftUsername,
      joinDate: new Date(),
      lastLogin: new Date()
    };

    mockUsers.push(newUser);

    // Create session
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      minecraftUsername: newUser.minecraftUsername
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        minecraftUsername: newUser.minecraftUsername
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = mockUsers.find(u => u.username === username || u.email === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();

    // Create session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      minecraftUsername: user.minecraftUsername
    };

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        minecraftUsername: user.minecraftUsername
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.session.user });
});

// Check authentication status
router.get('/status', (req, res) => {
  res.json({ 
    authenticated: !!req.session.user,
    user: req.session.user || null
  });
});

module.exports = router; 