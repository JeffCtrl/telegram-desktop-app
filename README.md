# Telegram Desktop App

A modern, cross-platform messaging application built with Electron and React, inspired by Telegram and Messenger.

## Features

✨ **Current Features:**
- ✅ Phone/Email authentication with OTP verification
- ✅ User profile setup with photo upload
- ✅ Dark/Light theme toggle
- ✅ Multiple account support
- ✅ Responsive UI matching Telegram design

🚀 **Upcoming Features:**
- Chat messaging interface
- Real-time messaging with Socket.io/Firebase
- Voice and video calls
- Group chats and channels
- Contact management
- Settings (50+ languages, privacy, notifications, etc.)
- Message reactions with emojis
- Message editing, deletion, pinning, and forwarding
- Chat backgrounds customization
- User blocking and reporting
- And much more!

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Desktop:** Electron
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend:** Firebase (planned)
- **Real-time:** Socket.io (planned)

## Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/JeffCtrl/telegram-desktop-app.git
cd telegram-desktop-app

# Install dependencies
npm install

# Start development server
npm start
```

The app will open on `http://localhost:3000` with Electron.

## Development

### Available Scripts

```bash
# Start development with hot reload
npm start

# Build for production
npm run build

# Build electron app
npm run electron-build
```

## Project Structure

```
src/
├── components/
│   ├── LoginScreen.tsx      # Phone/Email login
│   ├── OTPScreen.tsx        # OTP verification
│   ├── ProfileSetup.tsx     # Profile creation
│   └── MainApp.tsx          # Main chat interface
├── styles/
│   └── globals.css          # Global styles
├── App.tsx                  # Main app component
└── index.tsx                # React entry point
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project as you like!

## Author

JeffCtrl

---

Happy coding! 🚀
