const express = require('express');
const router = express.Router();

// Mock server information
const serverInfo = {
  name: 'Cublex',
  version: '1.21.6',
  status: 'online',
  onlinePlayers: 127,
  maxPlayers: 500,
  uptime: '99.8%',
  ip: 'play.cublex.com',
  port: 25565,
  description: 'Experience the latest Minecraft 1.21.6 features in our vibrant community!',
  features: [
    'Tricky Trials - Trial Chambers & New Mobs',
    'Spring Update - Biome Variants & Wildflowers',
    'Chase the Skies - Rideable Ghasts & New Mechanics',
    'Custom Plugins & Mini-games',
    'Active Community & Events',
    '24/7 Support & Staff Team'
  ]
};

// Mock feature details
const features = {
  trickyTrials: {
    title: 'Tricky Trials',
    description: 'Master the challenging Trial Chambers and face off against Breeze & Bogged mobs',
    items: [
      'Trial Chambers with unique challenges',
      'Breeze mobs with wind-based attacks',
      'Bogged mobs in swamp environments',
      'Mace weapon with special enchantments',
      'Crafter block for automation',
      'Decorative copper and tuff blocks'
    ],
    image: '/images/tricky-trials.jpg'
  },
  springUpdate: {
    title: 'Spring Update',
    description: 'Explore vibrant biome variants and discover new natural wonders',
    items: [
      'Biome variants for pigs, cows, and sheep',
      'Firefly bushes for magical lighting',
      'Wildflowers and fallen trees',
      'Enhanced wolf sounds and behaviors',
      'Improved world generation',
      'New decorative blocks'
    ],
    image: '/images/spring-update.jpg'
  },
  chaseTheSkies: {
    title: 'Chase the Skies',
    description: 'Soar through the skies on rideable Ghasts and explore new dimensions',
    items: [
      'Dried Ghast → Ghastling → Happy Ghast lifecycle',
      'Rideable Ghasts with custom harnesses',
      'Craftable saddles for all mobs',
      'New lead system for mob trains',
      'Player Locator Bar HUD',
      'Improved fog, clouds, and vibrant visuals',
      'New music disc and audio settings'
    ],
    image: '/images/chase-skies.jpg'
  }
};

// Mock community stats
const communityStats = {
  totalPlayers: 15420,
  activePlayers: 127,
  discordMembers: 8920,
  twitterFollowers: 3450,
  youtubeSubscribers: 2100,
  tiktokFollowers: 1800,
  eventsThisMonth: 8,
  totalPlaytime: '2.4M hours'
};

// Mock timeline
const timeline = [
  {
    phase: 'Alpha',
    status: 'active',
    date: 'December 2024',
    description: 'Closed Alpha testing with select community members',
    features: ['Core server features', 'Basic plugins', 'Community testing']
  },
  {
    phase: 'Beta',
    status: 'upcoming',
    date: 'Q1 2025',
    description: 'Open Beta launch with expanded features',
    features: ['Public access', 'Enhanced features', 'Community events']
  },
  {
    phase: 'Launch',
    status: 'planned',
    date: 'Q2 2025',
    description: 'Full server launch with all features',
    features: ['Complete feature set', 'Premium features', 'Full community support']
  }
];

// Get server status
router.get('/status', (req, res) => {
  res.json({
    ...serverInfo,
    lastUpdated: new Date()
  });
});

// Get server features
router.get('/features', (req, res) => {
  res.json({
    features: Object.values(features),
    total: Object.keys(features).length
  });
});

// Get specific feature details
router.get('/features/:feature', (req, res) => {
  const { feature } = req.params;
  
  if (features[feature]) {
    res.json(features[feature]);
  } else {
    res.status(404).json({ error: 'Feature not found' });
  }
});

// Get community statistics
router.get('/community', (req, res) => {
  res.json({
    ...communityStats,
    lastUpdated: new Date()
  });
});

// Get server timeline
router.get('/timeline', (req, res) => {
  res.json({
    timeline,
    currentPhase: timeline.find(t => t.status === 'active') || timeline[0]
  });
});

// Get online players (mock data)
router.get('/players', (req, res) => {
  const mockPlayers = [
    { username: 'PlayerOne', rank: 'VIP', level: 45, playtime: '127h 32m' },
    { username: 'MinerPro', rank: 'Member', level: 32, playtime: '89h 15m' },
    { username: 'BuilderElite', rank: 'Elite', level: 78, playtime: '256h 48m' },
    { username: 'RedstoneWiz', rank: 'VIP', level: 56, playtime: '198h 7m' },
    { username: 'AdventureSeeker', rank: 'Member', level: 28, playtime: '67h 43m' }
  ];
  
  res.json({
    players: mockPlayers,
    total: mockPlayers.length,
    max: serverInfo.maxPlayers
  });
});

// Get server rules
router.get('/rules', (req, res) => {
  res.json({
    rules: [
      'Be respectful to all players and staff',
      'No griefing or stealing from other players',
      'No use of hacks, cheats, or exploits',
      'Keep chat family-friendly',
      'Follow staff instructions',
      'No advertising other servers',
      'Respect spawn protection areas',
      'Report bugs and issues to staff'
    ],
    consequences: [
      'First offense: Warning',
      'Second offense: Temporary mute/kick',
      'Third offense: Temporary ban',
      'Severe violations: Permanent ban'
    ]
  });
});

// Get server FAQ
router.get('/faq', (req, res) => {
  res.json({
    faq: [
      {
        question: 'How do I join the server?',
        answer: 'Use the IP address "play.cublex.com" in your Minecraft client to connect to our server.'
      },
      {
        question: 'What Minecraft version do I need?',
        answer: 'We support Minecraft Java Edition version 1.21.6. Make sure to use the latest version for the best experience.'
      },
      {
        question: 'Are there any special features?',
        answer: 'Yes! We feature the latest Minecraft 1.21.6 content including Trial Chambers, rideable Ghasts, and much more.'
      },
      {
        question: 'How do I get help?',
        answer: 'Join our Discord server at discord.gg/cublex for support, community chat, and updates.'
      },
      {
        question: 'Is the server free to play?',
        answer: 'Yes, our server is completely free to play! Premium ranks are available for additional features.'
      }
    ]
  });
});

// Get server news/updates
router.get('/news', (req, res) => {
  const news = [
    {
      id: 1,
      title: 'Server Now Running Minecraft 1.21.6!',
      date: '2024-12-15',
      content: 'We\'ve successfully updated to Minecraft 1.21.6! Experience all the new features including Trial Chambers, rideable Ghasts, and more.',
      category: 'update'
    },
    {
      id: 2,
      title: 'New Community Event: Build Competition',
      date: '2024-12-10',
      content: 'Join our monthly build competition! Theme: "Floating Islands". Prizes include VIP ranks and special items.',
      category: 'event'
    },
    {
      id: 3,
      title: 'Discord Server Milestone: 8,000+ Members!',
      date: '2024-12-05',
      content: 'Our Discord community has reached 8,000 members! Thank you to everyone who has joined our amazing community.',
      category: 'community'
    }
  ];
  
  res.json({
    news,
    total: news.length
  });
});

module.exports = router; 