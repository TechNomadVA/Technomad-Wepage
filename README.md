# TechNomad - React Application

A modern React application for TechNomad, featuring animated backgrounds, intro sequences, and a clean component-based architecture.

## Project Structure

```
├── public/
│   ├── index.html          # Main HTML template
│   └── assets/             # Static assets (images, fonts, etc.)
├── src/
│   ├── components/
│   │   ├── Intro.jsx       # Intro animation sequence
│   │   ├── NeuralBackground.jsx  # Three.js neural network background
│   │   ├── HelixBackground.jsx   # Canvas helix animation
│   │   ├── MainContent.jsx       # Main content with two cards
│   │   ├── SignupForm.jsx        # Email signup form
│   │   └── Footer.jsx            # Footer component
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

Preview the production build:
```bash
npm run preview
```

## Features

- **Intro Animation**: Summoning sequence with mandala effects and logo reveal
- **Neural Background**: Three.js powered neural network visualization
- **Helix Background**: Canvas-based animated helix particles
- **Two Card Layout**: 
  - Card 1: Email signup form
  - Card 2: Story text content
- **Fixed Footer**: Footer anchored to the bottom of the page

## Technologies

- React 18
- Vite (build tool)
- Three.js (3D graphics)
- Canvas API (2D animations)

## Notes

- Make sure your `assets` folder is in the `public` directory for images to load correctly
- The app uses React hooks (useEffect, useRef) for animations and DOM manipulation
- All animations are preserved from the original HTML version

