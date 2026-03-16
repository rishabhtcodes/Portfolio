# 🚀 Modern Developer Portfolio

A premium, fully-responsive developer portfolio built with cutting-edge technologies. Showcase your skills, projects, and achievements with smooth animations and a sleek glassmorphism design.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0.0--beta-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism UI with dark theme and gradient accents
- ⚡ **Lightning Fast** - Built with Vite for instant HMR and optimized builds
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- 🎬 **Smooth Animations** - Scroll-triggered reveals powered by Framer Motion
- 🎯 **SEO Ready** - Structured content and semantic HTML
- 🔧 **Easy to Customize** - Centralized data source for all content
- 🚀 **Production Ready** - Optimized assets with gzip compression

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **Vite** | 8.0.0-beta.13 | Build tool & dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS styling |
| **Framer Motion** | 12.37.0 | Animation library |
| **Lucide React** | 0.468.0 | Icon library |
| **PostCSS** | 8.4.49 | CSS transformation |
| **Autoprefixer** | 10.4.20 | CSS vendor prefixes |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Portfolio

# Install dependencies
npm install
```

### Development Server

```bash
# Start local development server with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Navbar.jsx          # Fixed sticky navigation with mobile menu
│   ├── Hero.jsx            # Full-screen landing section
│   ├── About.jsx           # Profile and introduction
│   ├── Resume.jsx          # Resume highlights with download
│   ├── Skills.jsx          # Technology stack showcase
│   ├── Projects.jsx        # Portfolio projects grid
│   ├── Certificates.jsx    # Professional credentials
│   ├── Achievements.jsx    # Recognition and milestones
│   ├── Contact.jsx         # Contact form with validation
│   ├── Footer.jsx          # Footer with social links
│   ├── CustomCursor.jsx    # Custom cursor effects
│   ├── GithubStats.jsx     # GitHub statistics widget
│   ├── ScrollToTop.jsx     # Scroll to top button
│   ├── Blog.jsx            # Blog section
│   ├── CodingProfiles.jsx  # Coding platform profiles
│   └── Testimonials.jsx    # Client testimonials
├── pages/
│   └── Home.jsx            # Main page composition
├── data/
│   └── portfolioData.js    # Centralized content data source
├── context/
│   └── ThemeContext.jsx    # Theme provider (dark/light mode)
├── assets/                 # Static images and media
├── App.jsx                 # Root component
├── index.css              # Global styles and Tailwind directives
└── main.jsx               # Application entry point

tailwind.config.js          # Tailwind customization
postcss.config.js           # PostCSS configuration
vite.config.js              # Vite configuration
```

---

## 🎨 Customization Guide

### Update Portfolio Content

Edit `src/data/portfolioData.js` to customize:

```javascript
export const profile = {
  name: "Your Name",
  title: "Your Title",
  introduction: "Your bio...",
  // ... more fields
};

export const projects = [
  {
    title: "Project Name",
    description: "Project description...",
    github: "https://github.com/...",
    demo: "https://demo.com",
    // ... more fields
  },
  // ... more projects
];
```

### Customize Colors & Theme

Modify `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      slate: { 950: '#020617' },
      // Customize accent colors
    },
  },
}
```

### Add Components

1. Create new file in `src/components/`
2. Import and add to `src/pages/Home.jsx`
3. Update navigation links in `portfolioData.js`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

Vercel offers the easiest deployment for Vite projects with automatic optimizations.

**Steps:**

1. Push your repository to GitHub
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git push origin main
   ```

2. Import into Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository
   - Vercel auto-detects Vite settings

3. Configure deployment:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click **Deploy**

4. Every push to `main` triggers automatic deployment

**Environment Variables** (if needed):
- Add in Vercel Project Settings → Environment Variables

### Alternative Deployment Options

- **Netlify**: Drag & drop `dist/` folder or connect GitHub
- **GitHub Pages**: Build and deploy via GitHub Actions
- **Self-hosted**: Deploy `dist/` folder to any static hosting

---

## 📊 Build Optimization

Current build metrics:

- **HTML**: 1.29 kB (gzip: 0.59 kB)
- **CSS**: 23.11 kB (gzip: 4.86 kB)
- **JavaScript**: 347.46 kB (gzip: 109.07 kB)
- **Build Time**: ~836ms with 1977 modules

---

## 🛠️ Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📝 Content Sections

Your portfolio includes the following sections:

- **Hero** - Eye-catching landing section with CTA buttons
- **About Me** - Profile introduction with key highlights
- **Resume** - Career achievements with downloadable resume
- **Skills** - Technology stack with descriptions
- **Projects** - Portfolio showcase with live demos and code
- **Certificates** - Professional credentials and badges
- **Achievements** - Recognition and milestone cards
- **Contact** - Contact form with social links

---

## 🤝 Support & Contribution

Found a bug or have suggestions? Feel free to:

- Open an [Issue](https://github.com/rishabhtcodes/Portfolio/issues)
- Submit a [Pull Request](https://github.com/rishabhtcodes/Portfolio/pulls)
- Start a [Discussion](https://github.com/rishabhtcodes/Portfolio/discussions)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Next Steps

1. ✅ Customize `portfolioData.js` with your content
2. ✅ Add your project images to `src/assets/`
3. ✅ Update social links and contact information
4. ✅ Add your resume PDF to `public/`
5. ✅ Deploy to Vercel

---

**Built with ❤️ by your name • [Powered by React + Vite](https://vitejs.dev)**
