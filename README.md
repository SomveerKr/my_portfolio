# 🚀 Somveer Kumar — Portfolio

**Live:** [somveerkumar.vercel.app](https://somveerkumar.vercel.app)

A personal developer portfolio showcasing my projects, skills, work experience, and testimonials — built with a **headless CMS architecture** using **Sanity** as the backend. Originally built with **React (CRA)**, this project is currently being **upgraded to Next.js 16** for improved performance, SEO, and server-side rendering.

---

## 📸 Sections

| Section         | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **Header**      | Hero section with an animated intro, profile image, and a call-to-action    |
| **About**       | Overview cards describing who I am and what I do                            |
| **Work**        | Filterable project gallery with tags, links to GitHub repos & live demos    |
| **Skills**      | Technical skills with icons and work experience timeline                    |
| **Testimonials**| Client/colleague feedback cards with pagination                            |
| **Footer**      | Contact form (powered by Sanity) and social media links                    |

---

## 🏗️ Architecture

This is a **monorepo** containing three main packages:

```
my_portfolio/
├── frontend_react/      # Original React (CRA) frontend
├── frontend_nextjs/     # ✨ New Next.js 16 frontend (migration in progress)
├── backend_sanity/      # Sanity Studio v3 — headless CMS
├── netlify.toml         # Netlify deployment config
└── README.md
```

### Backend — Sanity Studio (`backend_sanity/`)

A **Sanity v3** headless CMS that manages all dynamic content through custom schemas:

| Schema           | Purpose                                          |
|------------------|--------------------------------------------------|
| `abouts`         | About section cards (title, description, image)  |
| `works`          | Portfolio projects (title, tags, links, images)   |
| `skills`         | Technical skills with icons                       |
| `experiences`    | Work experience entries (year, company, role)     |
| `workExperience` | Grouped work experience with nested job entries   |
| `testimonials`   | Feedback/reviews (name, company, feedback)        |
| `brands`         | Brand logos for the brands section                |
| `contact`        | Contact form submissions                          |

### Frontend — React (`frontend_react/`)

The **original** frontend, built with:

- **React 18** via Create React App (CRA)
- **Framer Motion** for smooth scroll-triggered animations
- **SCSS** modules for component-scoped styling
- **@sanity/client** for querying the Sanity API on the client side
- **react-icons** for scalable vector icons
- **react-tooltip** for hover tooltips
- **react-paginate** for paginated content (testimonials)

Content is fetched entirely **client-side** — the browser makes API calls to Sanity's CDN at runtime. This results in slower initial loads and limited SEO since search engine crawlers see an empty HTML shell.

### Frontend — Next.js (`frontend_nextjs/`) ✨

The **new** frontend, currently being migrated to:

- **Next.js 16** with the **App Router** (`app/` directory)
- **React 19** with Server Components
- **Server-Side Rendering (SSR)** — all Sanity data is fetched on the server before the page is sent to the browser
- **@sanity/client v7** with `createClient` (named export, no deprecated default)
- **Framer Motion** for animations (client components where needed)
- **SCSS** for styling (same design system, ported over)
- **Next.js Metadata API** for SEO (Open Graph, Twitter Cards, JSON-LD structured data)
- **Programmatic `robots.js` and `sitemap.js`** for search engine optimization

---

## 🔄 React → Next.js Migration

### Why Migrate?

| Problem (React CRA)                     | Solution (Next.js 16)                         |
|------------------------------------------|-----------------------------------------------|
| Client-side only — poor SEO             | Server-Side Rendering (SSR) out of the box    |
| Empty HTML shell for crawlers           | Pre-rendered HTML with full content            |
| No built-in metadata/OG tag support     | Next.js Metadata API for SEO                  |
| Manual routing with react-router        | File-system based App Router                  |
| No image optimization                   | `next/image` with automatic optimization       |
| CRA is maintenance mode / deprecated    | Next.js is actively maintained & industry standard |

### What Changed

#### 1. Project Structure

```diff
  React (CRA)                     Next.js 16
- src/App.js                     + src/app/layout.jsx      (Root layout)
- src/index.js                   + src/app/page.jsx        (Home page)
- src/container/Header/           + components/sections/Header.jsx
- src/container/About/            + components/sections/About.jsx
- src/container/Work/             + components/sections/Work.jsx
- src/container/Skills/           + components/sections/Skills.jsx
- src/container/Testimonial/      + components/sections/Testimonial.jsx
- src/container/Footer/           + components/sections/Footer.jsx
- src/components/Navbar/          + components/Navbar/
- src/wrapper/AppWrap.js          + components/AppWrap.jsx
- src/wrapper/MotionWrap.js       + components/MotionWrap.jsx
- src/client.js                   + lib/sanity.js
```

#### 2. Data Fetching — Client-side → Server-side

**Before (React):** Each component fetched its own data inside `useEffect`:

```jsx
// React — client-side fetch inside every component
const [works, setWorks] = useState([]);

useEffect(() => {
  const query = '*[_type == "works"]';
  client.fetch(query).then((data) => setWorks(data));
}, []);
```

**After (Next.js):** A single server-side function fetches all data at the page level and passes it down as props:

```jsx
// Next.js — server-side fetch in page.jsx
async function getSanityData() {
  const [abouts, works, skills, experiences, testimonials] = await Promise.all([
    client.fetch('*[_type == "abouts"]'),
    client.fetch('*[_type == "works"]'),
    client.fetch('*[_type == "skills"]'),
    client.fetch('*[_type == "experiences"]'),
    client.fetch('*[_type == "testimonials"]'),
  ]);
  return { abouts, works, skills, experiences, testimonials };
}

export default async function Home() {
  const { abouts, works, skills, experiences, testimonials } = await getSanityData();
  return (
    <main>
      <Header />
      <About abouts={abouts} />
      <Work works={works} />
      {/* ... */}
    </main>
  );
}
```

#### 3. SEO Enhancements

The Next.js version includes comprehensive SEO that wasn't possible with the CRA version:

- **Metadata API** in `layout.jsx` — title, description, keywords, Open Graph, Twitter Cards
- **JSON-LD Structured Data** — `Person` and `WebSite` schemas for rich search results
- **Programmatic `robots.js`** — controls crawler behavior
- **Programmatic `sitemap.js`** — auto-generated sitemap for search engines
- **Noscript fallback** — ensures content is accessible even without JavaScript
- **Canonical URLs** and `metadataBase` for proper link resolution

#### 4. Sanity Client Update

```diff
- import sanityClient from '@sanity/client';          // Deprecated default export
+ import { createClient } from '@sanity/client';      // Named export (v7)

- export const client = sanityClient({...});
+ export const client = createClient({...});

- import imageUrlBuilder from '@sanity/image-url';
+ import { createImageUrlBuilder } from '@sanity/image-url';
```

#### 5. Component Architecture

| Aspect            | React (CRA)                        | Next.js 16                          |
|-------------------|------------------------------------|-------------------------------------|
| Components        | All client-side                    | Server Components by default        |
| State/Effects     | `useState` + `useEffect` everywhere| Only in `'use client'` components   |
| Routing           | SPA with hash navigation           | File-system App Router              |
| Wrapper HOCs      | `AppWrap` + `MotionWrap` HOCs      | Simplified wrapper components       |
| Layout            | `App.js` with all sections inline  | `layout.jsx` (shell) + `page.jsx`  |

---

## 🛠️ Tech Stack

| Layer      | Technology                                                    |
|------------|---------------------------------------------------------------|
| Framework  | Next.js 16 (App Router) / React 19                           |
| Styling    | SCSS (Sass)                                                   |
| Animations | Framer Motion                                                 |
| CMS        | Sanity v3 (Headless)                                          |
| Icons      | react-icons                                                   |
| Deployment | Netlify                                                       |
| SEO        | Next.js Metadata API, JSON-LD, Sitemap, Robots                |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A [Sanity.io](https://www.sanity.io/) project (free tier available)

### 1. Clone the Repository

```bash
git clone https://github.com/SomveerKr/my_portfolio.git
cd my_portfolio
```

### 2. Setup Sanity Backend

```bash
cd backend_sanity
npm install
npm run dev
```

This launches Sanity Studio at `http://localhost:3333` where you can manage all portfolio content.

### 3. Setup Next.js Frontend (Recommended)

```bash
cd frontend_nextjs
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_TOKEN=your_sanity_token
```

Run the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Setup React Frontend (Legacy)

```bash
cd frontend_react
npm install
```

Create a `.env` file:

```env
REACT_APP_SANITY_PROJECT_ID=your_sanity_project_id
REACT_APP_SANITY_TOKEN=your_sanity_token
```

```bash
npm start
```

---

## 📂 Environment Variables

| Variable                          | Used In   | Description                     |
|-----------------------------------|-----------|---------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | Next.js   | Sanity project ID               |
| `NEXT_PUBLIC_SANITY_TOKEN`        | Next.js   | Sanity API token (read access)  |
| `REACT_APP_SANITY_PROJECT_ID`     | React     | Sanity project ID               |
| `REACT_APP_SANITY_TOKEN`          | React     | Sanity API token (read access)  |

---

## 🚢 Deployment

The project is deployed on **Netlify**. The `netlify.toml` configures:

- **Build base:** `frontend_react` (will be switched to `frontend_nextjs` once migration is complete)
- **Security headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Cache control:** Aggressive caching for static assets, no-cache for HTML
- **SPA redirects:** All routes redirect to `index.html` for client-side routing

---

## 🗺️ Roadmap

- [x] Build original React portfolio with Sanity CMS
- [x] Implement SEO optimizations (meta tags, sitemap, robots.txt)
- [x] Migrate to Next.js 16 with App Router
- [x] Implement server-side rendering for all Sanity data
- [x] Add JSON-LD structured data for rich search results
- [x] Update Sanity client to v7 (named exports)
- [ ] Switch Netlify deployment from React to Next.js
- [ ] Add ISR (Incremental Static Regeneration) for faster page loads
- [ ] Add page transitions and route-level animations
- [ ] Integrate blog section (Hashnode or Sanity-powered)

---

## 📄 License

This project is private and not licensed for redistribution.

---

## 📬 Contact

**Somveer Kumar** — Full Stack Developer & Legal Tech Expert

- 🌐 [Portfolio](https://somveerkumar.netlify.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/somveerkumar/)
- 🐙 [GitHub](https://github.com/SomveerKr)
- 🐦 [Twitter / X](https://twitter.com/Code_Veer)
- 📸 [Instagram](https://www.instagram.com/code.veer/)
- 🎥 [YouTube](https://www.youtube.com/@CodeVeer)
- 📧 [work.somveerk@gmail.com](mailto:work.somveerk@gmail.com)
