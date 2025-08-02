# 📧 Email Assistant

A modern, AI-powered email response generator built with React and Material-UI. Transform your email communication with professional, context-aware responses.

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-blue?logo=material-ui)
![Vite](https://img.shields.io/badge/Vite-7.0.4-purple?logo=vite)

## ✨ Features

- 🤖 **AI-Powered Responses** - Generate professional email replies using advanced AI
- 🎨 **Professional UI** - Clean, modern interface built with Material-UI
- 🎭 **Tone Selection** - Choose from Professional, Friendly, Casual, or Formal tones
- 📋 **One-Click Copy** - Copy generated responses to clipboard instantly
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🔄 **Real-time Generation** - Instant response generation with loading states

## 🚀 Live Demo

[Add your live demo link here]

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **UI Library**: Material-UI (MUI) 7.2.0
- **Build Tool**: Vite 7.0.4
- **HTTP Client**: Axios 1.11.0
- **Icons**: Material-UI Icons
- **Styling**: Emotion (CSS-in-JS)

## 📋 Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:8080`

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/email-assistant.git
   cd email-assistant/frontend/email-assistant
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173`

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📖 Usage

1. **Paste Email Content** in the input field
2. **Select Tone** (Optional): Professional, Friendly, Casual, or Formal
3. **Generate Reply** - Click "Generate Professional Reply"
4. **Copy Response** - Use "Copy to Clipboard" button
5. **Clear & Repeat** - Generate new responses as needed

## 🏗️ Project Structure

```
email-assistant/
├── src/
│   ├── App.css          # Professional styling
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🔌 API Integration

**Endpoint**: `POST /api/email/generate`
```json
{
  "emailContent": "string",
  "tone": "string (optional)"
}
```

## 🎨 UI Components

- **Header**: Professional title with email icon
- **Input Section**: Email content textarea and tone selection
- **Output Section**: Generated reply display with copy functionality
- **Responsive Grid**: Two-column layout on desktop, single column on mobile

## 🎯 Key Features

### Tone Selection
- **Professional**: Formal business communication
- **Friendly**: Warm and approachable responses
- **Casual**: Relaxed and informal tone
- **Formal**: Highly structured and traditional

### Copy Functionality
- One-click copy to clipboard
- Visual feedback when copied
- Automatic reset after 2 seconds

### Error Handling
- User-friendly error messages
- Loading states during API calls
- Graceful fallbacks

## 🔒 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8080
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify dashboard
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for UI components
- [Vite](https://vitejs.dev/) for build tool
- [React](https://reactjs.org/) for framework

## 📞 Support

- [Issues](https://github.com/yourusername/email-assistant/issues)
- Contact: [your-email@example.com]

---

⭐ **Star this repository if you found it helpful!**
