# Linxuan Song – Personal Portfolio

A minimalist, monospace-styled personal portfolio built with **React + Vite**.

🔗 **Live:** [linxuansong1022.github.io](https://linxuansong1022.github.io/)

## Features

- 📝 **About** – Bio with avatar photo
- 📅 **Experience** – Interactive timeline with expand-on-hover details
- 💻 **Projects** – Tag-based filtering with project detail modals
- 📬 **Contact** – Social links (GitHub, LinkedIn, Email)
- 🎵 **Sounds & Colors** – Interactive p5.js + Tone.js audio-visual background
- 🌗 **Light / Dark mode** toggle
- 📱 **Fully responsive** design

## Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Framework  | React 18 + Vite             |
| Styling    | Vanilla CSS + CSS variables |
| Font       | JetBrains Mono              |
| Visuals    | p5.js (lazy-loaded)         |
| Audio      | Tone.js (lazy-loaded)       |
| Icons      | Font Awesome                |
| Deployment | GitHub Pages (gh-pages)     |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build & deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── App.jsx              # Root component with theme & animation state
├── data.js              # All personal data (edit this to customize)
├── index.css            # Global styles & CSS variables
├── main.jsx             # Entry point
├── Particle.js          # Particle class for Sounds & Colors
└── components/
    ├── About.jsx        # Bio section with avatar
    ├── Contact.jsx      # Social links
    ├── Experience.jsx   # Timeline with expand animation
    ├── Navbar.jsx       # Navigation + theme toggle
    ├── P5Background.jsx # Subtle particle background
    ├── Projects.jsx     # Project grid with tag filter & modal
    └── SoundsAndColors.jsx  # Interactive audio-visual mode
```

## Customization

Edit `src/data.js` to update all personal information, experiences, projects, and social links.

---

*Design inspired by [miccio-dk.github.io](https://miccio-dk.github.io)*
