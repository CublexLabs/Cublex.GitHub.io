const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const { createClient } = require('redis');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const { createConnection } = require('typeorm');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Redis client setup (optional for development)
let redisClient = null;
let sessionStore = null;

try {
  redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  
  redisClient.connect().then(() => {
    console.log('✅ Redis connected successfully');
  }).catch((error) => {
    console.log('⚠️  Redis not available, using memory store for sessions');
    redisClient = null;
  });
} catch (error) {
  console.log('⚠️  Redis not available, using memory store for sessions');
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Session configuration with fallback
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'cublex-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

if (redisClient) {
  const RedisStore = require('connect-redis').default;
  sessionConfig.store = new RedisStore({ client: redisClient });
} else {
  console.log('📝 Using memory store for sessions (not persistent)');
}

app.use(session(sessionConfig));

// Database connection (optional for development)
let dbConnected = false;

if (process.env.NODE_ENV === 'production') {
  // Only try to connect to PostgreSQL in production
  createConnection({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'cublex',
    entities: [path.join(__dirname, 'entities', '*.js')],
    synchronize: false, // Don't auto-sync in production
    logging: false
  }).then(() => {
    console.log('✅ Database connected successfully');
    dbConnected = true;
  }).catch(error => {
    console.error('❌ Database connection failed:', error.message);
  });
} else {
  console.log('📝 Development mode: Database connection skipped');
}

// GraphQL schema and resolvers
const typeDefs = gql`
  type Query {
    hello: String
    serverInfo: ServerInfo
  }
  
  type ServerInfo {
    name: String
    version: String
    players: Int
    maxPlayers: Int
    uptime: String
    status: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Cublex GraphQL!',
    serverInfo: () => ({
      name: 'Cublex',
      version: '1.21.6',
      players: 42,
      maxPlayers: 100,
      uptime: '2 days, 14 hours',
      status: 'online'
    })
  }
};

const createApolloServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req,
      user: req.session.user
    }),
    introspection: process.env.NODE_ENV !== 'production'
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
};

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/server', require('./routes/server'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'development-mode',
    redis: redisClient ? 'connected' : 'memory-store'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    await createApolloServer();
    app.listen(PORT, () => {
      console.log(`🚀 Cublex server running on port ${PORT}`);
      console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
      console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 React app: http://localhost:3000`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer(); 