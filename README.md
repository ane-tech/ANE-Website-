# ANE - 3D Printing & Additive Manufacturing Website

<p align="center">
  <img src="./public/logo.svg" alt="ANE Logo" width="120" />
</p>

<p align="center">
  A modern, responsive website for ANE — a 3D printing and additive manufacturing company showcasing services across healthcare, art & sculpture, education, and electronics industries.
</p>

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend UI library |
| **Vite 7** | Build tool & dev server |
| **React Router DOM 7** | Client-side routing |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Modern icon library |

---

## 📁 Project Structure

```
ANE/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images & media files
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx       # Navigation header with dropdown menus
│   │   ├── Hero.jsx         # Hero section with animations
│   │   ├── IndustrySection.jsx  # Industry showcase cards
│   │   ├── ModelList.jsx    # 3D models gallery with infinite scroll
│   │   └── Footer.jsx       # Site footer
│   ├── pages/           # Page components
│   │   ├── Home.jsx         # Homepage
│   │   ├── ModelDetail.jsx  # Individual model detail page
│   │   └── Placeholder.jsx  # Placeholder for upcoming pages
│   ├── App.jsx          # Main app with routing
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles & CSS variables
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies & scripts
└── README.md            # This file
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ane-tech/ANE-Website-.git
   cd ANE-Website-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, industries, and models gallery |
| `/model/:id` | Individual 3D model detail page |
| `/portfolio` | Portfolio showcase |
| `/about` | About ANE |
| `/contact` | Contact information |
| `/industries/healthcare` | Healthcare solutions |
| `/industries/art-sculpture` | Art & Sculpture services |
| `/industries/education` | Educational solutions |
| `/industries/electronics` | Electronics prototyping |
| `/services/prototyping` | Rapid prototyping services |
| `/services/scalable-manufacturing` | Scalable manufacturing |
| `/services/reverse-engineering` | Reverse engineering services |

---

## 🎨 Features

- ✨ **Modern UI/UX** — Glassmorphism design with smooth animations
- 🌙 **Dark Theme** — Sleek black and teal color palette
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🎬 **Framer Motion Animations** — Smooth transitions and micro-interactions
- 🔄 **Infinite Scroll Gallery** — Auto-scrolling 3D models showcase
- 🧭 **Dynamic Navigation** — Dropdown menus for industries and services
- ⚡ **Fast Performance** — Powered by Vite for instant HMR

---

## 🏗️ Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

The production build will be generated in the `dist/` directory, ready for deployment.

---

## 🚢 Deployment

The built `dist/` folder can be deployed to any static hosting service:

- **Vercel** — `vercel --prod`
- **Netlify** — Drag & drop `dist/` folder
- **GitHub Pages** — Use `gh-pages` package
- **Firebase Hosting** — `firebase deploy`

---

## 📝 License

This project is proprietary to ANE. All rights reserved.

---

## 👥 Contact

**ANE - Additive Manufacturing Solutions**

- 🌐 Website: [Coming Soon]
- 📧 Email: ane128278@gmail.com
- 🐙 GitHub: [@ane-tech](https://github.com/ane-tech)

---

<p align="center">
  Made with ❤️ by ANE Tech
</p>
