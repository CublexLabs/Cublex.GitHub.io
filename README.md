# Cublex - Minecraft 1.21.6 Server

A vibrant, interactive landing page for "Cublex", a new Minecraft server inspired by the latest Minecraft 1.21.6 features. Built with modern web technologies and featuring an animated Happy Ghast flyover, vibrant visuals, and a responsive design.

## 🎮 Features

### Minecraft 1.21.6 Integration
- **Tricky Trials**: Trial Chambers, Breeze & Bogged mobs, Mace weapon with enchantments
- **Spring Update**: Biome variants, firefly bushes, wildflowers, fallen trees
- **Chase the Skies**: Dried Ghast → Ghastling → Happy Ghast lifecycle, rideable Ghasts with harnesses

### Website Features
- ✨ Animated Happy Ghast flyover with tentacles and expressions
- 🌟 Vibrant Minecraft-inspired design with gradients and animations
- 📱 Fully responsive design for all devices
- 🔐 User authentication system (mock implementation)
- 👑 Admin panel with server management features
- 📊 Real-time server statistics and player count
- ⏰ Countdown timer to public launch
- 🎨 Particle effects and cloud animations
- 📍 Player Locator Bar HUD motif in navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Framer Motion** for animations
- **Styled Components** for styling
- **React Icons** for icons
- **React Countdown** for countdown timer

### Backend
- **Node.js** with Express
- **TypeORM** with PostgreSQL
- **Redis** for session state
- **GraphQL** with Apollo Server
- **JWT** for authentication
- **bcryptjs** for password hashing

### Development & Testing
- **Jest** for testing
- **Prettier** for code formatting
- **ESLint** for linting
- **VS Code** configuration

### Deployment
- **AWS** with NGINX
- **Ubuntu** server
- **Docker** support (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cublex-server
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   SESSION_SECRET=your-session-secret
   
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your-password
   DB_NAME=cublex
   
   # Redis
   REDIS_URL=redis://localhost:6379
   
   # Client URL
   CLIENT_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb cublex
   
   # Start Redis server
   redis-server
   ```

5. **Start the application**
   ```bash
   # Start both server and client (from root directory)
   npm start
   
   # Or start individually:
   npm run server  # Starts backend on port 5000
   npm run client  # Starts frontend on port 3000
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - GraphQL: http://localhost:5000/graphql

## 📁 Project Structure

```
cublex-server/
├── client/                 # React frontend
│   ├── public/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── entities/         # TypeORM entities
│   ├── middleware/       # Custom middleware
│   └── index.js          # Server entry point
├── package.json
└── README.md
```

## 🎨 Design Features

### Hero Section
- Animated Happy Ghast with floating tentacles
- Cloud and fog animations
- Gradient text effects
- Server status display
- Call-to-action buttons

### Navigation
- Fixed navbar with server status
- Social media links
- User authentication dropdown
- Mobile-responsive menu

### Animations
- Parallax scrolling effects
- Particle system
- Smooth transitions
- Hover effects
- Loading animations

## 🔐 Authentication

### Mock Users
- **Admin**: username: `admin`, password: `password`
- **User**: username: `player1`, password: `password`

### Features
- User registration and login
- Session management with Redis
- Role-based access control
- Admin panel access

## 📊 Admin Panel

### Features
- Server statistics dashboard
- Player management
- Server logs viewer
- Ban/unban functionality
- Server configuration
- Analytics and charts

### Access
- Navigate to `/admin` when logged in as admin
- Full server management capabilities
- Real-time data updates

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/status` - Check auth status

### Server Information
- `GET /api/server/status` - Server status
- `GET /api/server/features` - Feature list
- `GET /api/server/community` - Community stats
- `GET /api/server/players` - Online players

### Admin (Protected)
- `GET /api/admin/stats` - Server statistics
- `GET /api/admin/players` - Player management
- `GET /api/admin/logs` - Server logs
- `POST /api/admin/ban` - Ban player
- `POST /api/admin/kick` - Kick player

## 🎯 Community Integration

### Social Media
- **Discord**: discord.gg/cublex
- **Twitter**: @CublexServer
- **YouTube**: youtube.com/CublexMC
- **TikTok**: @CublexMC

### Features
- Live Discord member count
- Social media integration
- Community statistics
- Event announcements

## 🚀 Deployment

### Production Setup
1. Set up AWS EC2 instance with Ubuntu
2. Install Node.js, PostgreSQL, Redis, and NGINX
3. Configure environment variables
4. Set up SSL certificates
5. Deploy using PM2 or Docker

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=5000
SESSION_SECRET=your-production-secret
DB_HOST=your-db-host
DB_PASSWORD=your-db-password
REDIS_URL=your-redis-url
CLIENT_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the [Hytale](https://hytale.com/) website design
- Minecraft 1.21.6 features and mechanics
- React and Node.js communities
- Framer Motion for amazing animations

## 📞 Support

- **Email**: support@cublex.com
- **Discord**: discord.gg/cublex
- **Website**: https://cublex.com

---

**Cublex** - Experience the latest Minecraft 1.21.6 features in our vibrant community! 🎮✨ 