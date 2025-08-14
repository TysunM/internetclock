# Internet Clock - Complete Deployment Package

This is a viral revenue-generating Internet Clock website with 6 fully functional clock modes designed for maximum user engagement and ad revenue generation.

## Features
- **Big Clock**: Large time display with timezone selection
- **Stopwatch**: Millisecond precision with split times
- **World Clock**: Multiple timezone display with orange glow
- **Focus (Pomodoro)**: 25-minute timer with break tracking
- **Alarm Clock**: Multiple alarms with custom labels
- **Timer**: Countdown timer with presets

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## Project Structure
```
internet-clock/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── client/
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── pages/
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
└── shared/
    └── schema.ts
```

## Technical Details
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Styling**: Tailwind CSS with dark theme
- **State**: React Query + localStorage persistence
- **Build**: ESBuild for production

## Ad Revenue Setup
- Top header space reserved for ads (80px height)
- Bottom footer space reserved for ads (80px height)
- Single-page layout with no scrolling for maximum engagement

## Browser Support
- Modern browsers with ES2020+ support
- Mobile-responsive design
- Touch-friendly interface

## License
MIT License