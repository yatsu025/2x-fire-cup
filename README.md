# 🔥 2X Fire Cup - Free Fire Championship Registration

A modern, responsive web application for registering teams for the ultimate Free Fire championship tournament. Built with Next.js 16, featuring a sleek dark theme with stunning animations and a comprehensive multi-step registration process.

![2X Fire Cup](public/logo.jpeg)

## 🌟 Overview

2X Fire Cup is an elite Free Fire tournament registration platform designed for competitive gaming enthusiasts. The application provides a seamless registration experience with real-time countdown timers, secure payment integration, and an intuitive multi-step form system.

**Tournament Date:** January 24, 2026  
**Registration Deadline:** January 23, 2026, 12:00 AM  
**Prize Pool:** ₹800

## ✨ Features

### 🎯 Core Functionality
- **Real-time Countdown Timer** - Live countdown to registration deadline
- **Multi-step Registration Form** - Guided registration process with validation
- **Payment Integration** - QR code payment system with screenshot upload
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Theme** - Immersive gaming aesthetic with orange/red gradients

### 🎮 Registration Options
- **Solo Registration** - ₹80 entry fee
- **Duo Teams** - ₹100 entry fee
- **Squad Teams** - ₹160 entry fee (4 players)

### 🎯 Game Modes
- **Bermuda Full Map** - Classic battle royale experience
- **CS Custom** - Custom scenarios and challenges

### 💳 Payment System
- Dynamic QR codes based on team size
- Secure payment screenshot upload
- File validation (JPG/PNG, 5MB max)
- Payment confirmation workflow

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Tailwind Animate** - Animation utilities

### Form Management
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Additional Libraries
- **Date-fns** - Modern JavaScript date utility library
- **Embla Carousel** - Accessible carousel component
- **Sonner** - Toast notifications
- **Vercel Analytics** - Web analytics

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 2x-fire-cup
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using pnpm
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file if needed
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   # Using npm
   npm run dev

   # Using pnpm
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
2x-fire-cup/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (Radix UI)
│   ├── countdown-timer.tsx      # Registration countdown
│   ├── registration-form.tsx    # Multi-step form
│   └── success-message.tsx      # Confirmation screen
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
│   ├── logo.jpeg               # Tournament logo
│   ├── payment*.jpeg/png       # Payment QR codes
│   └── *.svg                   # Icons and placeholders
├── styles/                      # Additional styles
├── package.json                 # Dependencies and scripts
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🧩 Components

### CountdownTimer
- Displays live countdown to registration deadline (Jan 23, 2026)
- Animated hour/minute/second boxes with gradient effects
- Responsive design with hover animations

### RegistrationForm
- **Step 1: Team Details** - Team name, contact info
- **Step 2: Player Type** - Solo/Duo/Squad selection
- **Step 3: Game Type** - Bermuda/CS mode selection
- **Step 4: Payment** - QR code display and screenshot upload
- Form validation with error messages
- Progressive disclosure (steps unlock sequentially)

### SuccessMessage
- Animated trophy celebration
- Registration confirmation details
- Tournament information display
- Option to register additional teams

## 🎮 Usage

### For Players
1. **Visit the registration page**
2. **Enter team details** - Team name and contact information
3. **Select player type** - Choose solo, duo, or squad
4. **Choose game mode** - Bermuda or CS Custom
5. **Complete payment** - Scan QR code and upload screenshot
6. **Submit registration** - Receive confirmation

### For Administrators
- Monitor registrations through form submissions
- Update payment QR codes in `/public/` directory
- Modify tournament dates in component code
- Customize styling through Tailwind classes

## 🎨 Customization

### Theme Colors
The application uses a gaming-inspired color scheme:
- Primary: Orange (#ff6b35, #ffa500)
- Secondary: Red (#dc2626, #ef4444)
- Accent: Yellow (#eab308, #facc15)

### Animations
- CSS animations for countdown timer
- Hover effects on interactive elements
- Pulse animations for visual appeal
- Smooth transitions throughout

### Payment Integration
Update payment QR codes by replacing files in `/public/`:
- `payment-80.jpeg` - Solo registration (₹80)
- `payment-100.jpeg` - Duo registration (₹100)
- `payment.png` - Squad registration (₹160)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

### Environment Variables
```env
# Add any required environment variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new components
- Follow existing naming conventions
- Test components across different screen sizes
- Maintain accessibility standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- Built with ❤️ for the Free Fire gaming community
- Special thanks to the Next.js and Tailwind CSS teams
- Icons provided by Lucide React

---

**Ready to dominate? Register now for 2X Fire Cup! 🔥**

© 2026 2X Fire Cup. All rights reserved.
