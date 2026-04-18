# 🪄 Magical Library Login Page

A cinematic 3D login experience featuring a magical spellbook that opens with golden light in a cozy library setting.

## ✨ Features

### Visual Effects
- **3D Book with Curved Pages**: Real polygon mesh pages with subdivision for natural bending
- **GLSL Shaders**: Custom parchment material with cloth simulation and torn edges
- **Golden Light System**: Point light inside book that floods the scene when opened
- **Particle System**: 200+ floating dust motes and light sparks
- **Glassmorphism UI**: Frosted glass login card with warm amber tint and inner glow
- **Library Environment**: Wooden table, bookshelves, and fairy lights

### Technical Stack
- **Three.js 0.160.0**: 3D rendering engine
- **GSAP 3.12.5**: Animation timeline
- **GLSL Shaders**: Custom vertex/fragment shaders for parchment
- **CSS Backdrop Filter**: Glassmorphism effects

### Color Palette
- Deep mahogany: `#1a0e05`
- Warm amber: `#d4880a`
- Parchment cream: `#f5e6c8`
- Soft gold: `#ffb347`

## 🎬 Animation Sequence

1. **Initial State**: Dark library, closed book, single golden light hint
2. **Click Book**: User interaction triggers the magic
3. **Book Opens**: 60 curved pages open with staggered timing (2.5s)
4. **Golden Light**: Point light intensity increases from 0 to 8 (2s)
5. **Particles Activate**: Dust and sparks fade in and float upward (1.5s)
6. **Background Lightens**: Dark overlay fades from 90% to 10% opacity (2.5s)
7. **Login Card Appears**: Glassmorphism card slides in from right (0.8s)

## 📁 Files

- `login.html` - Main HTML structure
- `js/magical-book3d.js` - Three.js scene with GLSL shaders
- `js/login.js` - Animation orchestration
- `css/pages/login.css` - Glassmorphism styling

## 🎮 Usage

Simply open `login.html` in a modern browser and click on the book to start the animation.

## 📱 Responsive Design

- Desktop: Full 3D experience with all effects
- Tablet: Optimized layout, reduced particle count
- Mobile: Simplified animations, touch-friendly
- Accessibility: Respects `prefers-reduced-motion`

## 🔧 Customization

### Adjust Animation Speed
Edit GSAP timeline durations in `magical-book3d.js`:
```javascript
tl.to(this.goldenLight, {
  intensity: 8,
  duration: 2, // Change this value
  ease: "power2.inOut"
}, 0);
```

### Change Colors
Modify color palette in `login.css`:
```css
background: rgba(212, 136, 10, 0.15); /* Amber tint */
```

### Auto-play on Load
Uncomment in `login.js`:
```javascript
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!animationPlayed) {
      playFullAnimation();
    }
  }, 500);
});
```

## 🌟 Performance

- 60 FPS on modern hardware
- Shadow mapping: 2048x2048
- Particle count: 200
- Page geometry: 20x20 subdivisions
- Optimized for WebGL 2.0

---

Built with magic and Three.js ✨
