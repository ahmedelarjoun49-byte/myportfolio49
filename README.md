# 🚀 Modern Full-Stack Portfolio 

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A high-performance, visually immersive portfolio built with the latest **Next.js 15 App Router**. This project features complex scroll animations, dynamic project galleries, and a mobile-first design philosophy.

**🔗 [Live Demo](https://myportfolio49.vercel.app)** | **📁 [Source Code](https://github.com/ahmedelarjoun49-byte/myportfolio49)**

---

## ✨ Key Features

* **Immersive Animations:** Utilizing `framer-motion` for scroll-triggered reveals, staggered text effects, and smooth page transitions.
* **Dynamic Theming:** Seamless dark/light mode switching powered by `next-themes`.
* **Optimized Performance:** High performance scores achieved through Next.js Image optimization and lazy loading.
* **Responsive Layout:** Tailored experiences for mobile, tablet, and ultra-wide desktops.
* **Interactive UI:** Custom-built typewriter effects, graduation-themed scroll sections, and interactive project cards.

---

## 🛠️ Tech Stack

### Core
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS

### Libraries
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Text Effects:** React Simple Typewriter
* **Deployment:** Vercel (CI/CD)

---

## 📁 Project Structure

```text
src/
├── app/              # Next.js 15 App Router (Pages & Providers)
├── components/       # Reusable UI (Hero, Experience, Skils, etc.)
├── data/             # Centralized project & experience data
├── lib/              # Utility functions (shadcn/cn, formatting)
└── public/           # Static assets (Resume, Icons, Images)# Clone the repo
git clone [https://github.com/ahmedelarjoun49-byte/myportfolio49.git](https://github.com/ahmedelarjoun49-byte/myportfolio49.git)

# Install dependencies
npm install

# Start development server
npm run dev// next.config.ts
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
