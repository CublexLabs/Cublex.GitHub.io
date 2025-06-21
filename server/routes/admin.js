const express = require('express');
const router = express.Router();

// Mock data for admin panel
const mockServerStats = {
  onlinePlayers: 127,
  maxPlayers: 500,
  uptime: '99.8%',
  tps: 20.0,
  memoryUsage: '2.1GB / 8GB',
  cpuUsage: '45%',
  worldSize: '15.2GB',
  activeWorlds: 3
};

const mockPlayerStats = [
  {
    id: 1,
    username: 'PlayerOne',
    playtime: '127h 32m',
    lastSeen: '2 minutes ago',
    rank: 'VIP',
    level: 45,
    balance: 1250
  },
  {
    id: 2,
    username: 'MinerPro',
    playtime: '89h 15m',
    lastSeen: '1 hour ago',
    rank: 'Member',
    level: 32,
    balance: 750
  },
  {
    id: 3,
    username: 'BuilderElite',
    playtime: '256h 48m',
    lastSeen: 'Online',
    rank: 'Elite',
    level: 78,
    balance: 3200
  }
];

const mockServerLogs = [
  {
    id: 1,
    timestamp: new Date(),
    level: 'INFO',
    message: 'Server started successfully',
    player: null
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 60000),
    level: 'INFO',
    message: 'Player PlayerOne joined the server',
    player: 'PlayerOne'
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 120000),
    level: 'WARN',
    message: 'High memory usage detected',
    player: null
  }
];

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// Get server statistics
router.get('/stats', requireAdmin, (req, res) => {
  res.json({
    server: mockServerStats,
    players: mockPlayerStats,
    logs: mockServerLogs.slice(0, 10) // Last 10 logs
  });
});

// Get detailed player information
router.get('/players', requireAdmin, (req, res) => {
  res.json({
    players: mockPlayerStats,
    total: mockPlayerStats.length,
    online: mockPlayerStats.filter(p => p.lastSeen === 'Online').length
  });
});

// Get server logs
router.get('/logs', requireAdmin, (req, res) => {
  const { limit = 50, level } = req.query;
  
  let filteredLogs = mockServerLogs;
  
  if (level) {
    filteredLogs = filteredLogs.filter(log => log.level === level.toUpperCase());
  }
  
  res.json({
    logs: filteredLogs.slice(0, parseInt(limit)),
    total: filteredLogs.length
  });
});

// Ban player
router.post('/ban', requireAdmin, (req, res) => {
  const { username, reason, duration } = req.body;
  
  // Mock ban operation
  console.log(`Banning player ${username} for ${duration} with reason: ${reason}`);
  
  res.json({
    message: `Player ${username} has been banned for ${duration}`,
    ban: {
      username,
      reason,
      duration,
      bannedBy: req.session.user.username,
      bannedAt: new Date()
    }
  });
});

// Unban player
router.post('/unban', requireAdmin, (req, res) => {
  const { username } = req.body;
  
  // Mock unban operation
  console.log(`Unbanning player ${username}`);
  
  res.json({
    message: `Player ${username} has been unbanned`,
    unban: {
      username,
      unbannedBy: req.session.user.username,
      unbannedAt: new Date()
    }
  });
});

// Kick player
router.post('/kick', requireAdmin, (req, res) => {
  const { username, reason } = req.body;
  
  // Mock kick operation
  console.log(`Kicking player ${username} with reason: ${reason}`);
  
  res.json({
    message: `Player ${username} has been kicked`,
    kick: {
      username,
      reason,
      kickedBy: req.session.user.username,
      kickedAt: new Date()
    }
  });
});

// Send server command
router.post('/command', requireAdmin, (req, res) => {
  const { command } = req.body;
  
  // Mock command execution
  console.log(`Executing server command: ${command}`);
  
  res.json({
    message: 'Command executed successfully',
    command: {
      command,
      executedBy: req.session.user.username,
      executedAt: new Date(),
      result: 'Command completed successfully'
    }
  });
});

// Get server configuration
router.get('/config', requireAdmin, (req, res) => {
  res.json({
    server: {
      name: 'Cublex',
      version: '1.21.6',
      port: 25565,
      maxPlayers: 500,
      whitelist: false,
      difficulty: 'normal',
      gamemode: 'survival',
      pvp: true,
      spawnProtection: 16
    },
    worlds: [
      {
        name: 'world',
        type: 'overworld',
        seed: 'cublex2024',
        size: '15.2GB'
      },
      {
        name: 'world_nether',
        type: 'nether',
        seed: 'cublex2024',
        size: '2.1GB'
      },
      {
        name: 'world_the_end',
        type: 'end',
        seed: 'cublex2024',
        size: '0.8GB'
      }
    ]
  });
});

// Update server configuration
router.put('/config', requireAdmin, (req, res) => {
  const { config } = req.body;
  
  // Mock config update
  console.log('Updating server configuration:', config);
  
  res.json({
    message: 'Server configuration updated successfully',
    updatedAt: new Date(),
    updatedBy: req.session.user.username
  });
});

// Get analytics data
router.get('/analytics', requireAdmin, (req, res) => {
  const { period = '24h' } = req.query;
  
  // Mock analytics data
  const analytics = {
    period,
    playerCount: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      data: [45, 32, 78, 156, 234, 189]
    },
    serverPerformance: {
      tps: [20.0, 19.8, 20.0, 19.9, 20.0, 19.7],
      memory: [65, 68, 72, 75, 78, 82],
      cpu: [35, 38, 42, 45, 48, 52]
    },
    topPlayers: [
      { username: 'BuilderElite', playtime: '256h 48m', level: 78 },
      { username: 'PlayerOne', playtime: '127h 32m', level: 45 },
      { username: 'MinerPro', playtime: '89h 15m', level: 32 }
    ]
  };
  
  res.json(analytics);
});

module.exports = router; 