# React Portfolio

A modern, high-performance portfolio converted to **React 19 + Vite**, preserving the sleek dark luxury aesthetic with modular, reusable components and dynamic state.

## 🚀 Getting Started

To run the development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── portfolio.html           # Original HTML portfolio (preserved for reference)
├── index.html               # Main entry HTML with Google Fonts & SEO tags
├── vite.config.js           # Vite configuration with React plugin
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # App layout with IntersectionObserver & components
│   ├── index.css            # Complete design system & luxury dark styling
│   ├── data/
│   │   └── portfolioData.js # Centralized configuration for all portfolio content
│   └── components/
│       ├── CustomCursor.jsx # Smooth lerping dual-ring custom cursor
│       ├── Loader.jsx       # Initial animated counter & progress bar
│       ├── Navbar.jsx       # Fixed blur navbar with scroll spy & smooth scrolling
│       ├── Hero.jsx         # Hero banner with floating orbs & text reveal
│       ├── Marquee.jsx      # Reusable infinite marquee ribbon
│       ├── About.jsx        # Bio, animated target statistics, avatar badge
│       ├── Skills.jsx       # Interactive skills with scroll-triggered progress bars
│       ├── Works.jsx        # Selected projects grid with SVG geometry patterns
│       ├── Process.jsx      # 4-stage process workflow cards
│       ├── Testimonials.jsx # Client testimonials carousel slider
│       ├── Resume.jsx       # Interactive CV card with scanline & download button
│       ├── Contact.jsx      # Contact info, social links, and working message form
│       └── Footer.jsx       # Footer copyright & branding
```

---

## ⚙️ Customization

All your portfolio texts, statistics, skills, projects, testimonials, and contact links are neatly organized in:
👉 [`src/data/portfolioData.js`](file:///media/ravindu/Data2/projects/portpolio/src/data/portfolioData.js)

You can easily update your information without touching the component code!
