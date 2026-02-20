# Next.js Portfolio — Documentation

This document covers the complete architecture and provides instructions for making changes to the Next.js portfolio application.

---

## Project Architecture

```
frontend_nextjs/
├── src/app/                 # Next.js App Router
│   ├── globals.css          # CSS variables, reset, sr-only
│   ├── layout.jsx           # Root layout + SEO metadata + JSON-LD
│   ├── page.jsx             # Server component (SSR data fetching)
│   ├── robots.js            # Dynamic robots.txt generation
│   └── sitemap.js           # Dynamic sitemap.xml generation
├── components/
│   ├── AppWrap.jsx          # Section wrapper HOC (copyright, social, nav dots)
│   ├── MotionWrap.jsx       # Framer-motion scroll-in animation HOC
│   ├── NavigationDots.jsx   # Side navigation dot indicators
│   ├── SocialMedia.jsx      # Side social links (Twitter, YouTube, Instagram)
│   ├── Navbar/
│   │   ├── Navbar.jsx       # Top navigation bar with mobile hamburger
│   │   └── Navbar.scss
│   └── sections/            # Main page sections
│       ├── Header.jsx + .scss
│       ├── About.jsx + .scss
│       ├── Work.jsx + .scss
│       ├── Skills.jsx + .scss
│       ├── Footer.jsx + .scss
│       └── Testimonial.jsx + .scss
├── constants/
│   └── images.js            # Image path references (/assets/...)
├── lib/
│   └── sanity.js            # Sanity CMS client + image URL builder
├── styles/
│   └── App.scss             # Global utility classes
├── public/
│   ├── assets/              # All static images (37 files)
│   └── favicon.png
├── .env.local               # NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_TOKEN
├── jsconfig.json            # Path alias: @/* → ./*
└── next.config.mjs          # Sanity CDN image domain + SCSS config
```

---

## Key Concepts

### Server vs Client Components

| Type | Location | Purpose |
|------|----------|---------|
| **Server** | `src/app/page.jsx` | Fetches ALL Sanity data at request time (SSR) |
| **Client** | `components/**/*.jsx` | Handle interactivity (animations, state, events) |

**Rule**: Any component using `useState`, `useEffect`, `framer-motion`, or browser APIs MUST have `'use client'` at the top.

### Data Flow

```
Request → page.jsx (server) → Sanity API → data as props → Client sections
```

The server component `page.jsx` fetches data, then passes it as props to client section components. This gives us SSR benefits (SEO, fast initial load) while keeping interactivity.

---

## How to Make Changes

### 1. Adding a New Section

1. Create component file: `components/sections/NewSection.jsx`
2. Create styles: `components/sections/NewSection.scss`
3. Mark as `'use client'` if it uses any interactivity
4. Wrap with HOCs if needed:
   ```jsx
   export default AppWrap(
     MotionWrap(NewSection, 'app__newsection'),
     'newsection',        // id for navigation
     'app__whitebg'       // background class
   );
   ```
5. Import in `src/app/page.jsx` and add to the JSX
6. If it needs Sanity data, add the query to `getSanityData()` in `page.jsx`

### 2. Modifying an Existing Section

Each section is a self-contained module with its own `.jsx` and `.scss`:

| Section | File | Data Props |
|---------|------|-----------|
| Header | `components/sections/Header.jsx` | None (static) |
| About | `components/sections/About.jsx` | `abouts` |
| Work | `components/sections/Work.jsx` | `works` |
| Skills | `components/sections/Skills.jsx` | `skills`, `experiences` |
| Footer | `components/sections/Footer.jsx` | None (form is client-side) |
| Testimonial | `components/sections/Testimonial.jsx` | `testimonials`, `brands` |

### 3. Enabling/Disabling the Testimonial Section

The Testimonial section is currently commented out. To enable:

```jsx
// In src/app/page.jsx, uncomment:
// import Testimonial from '@/components/sections/Testimonial';
// Add to getSanityData():
//   client.fetch('*[_type == "testimonials"]'),
//   client.fetch('*[_type == "brands"]'),
// Add to JSX:
//   <Testimonial testimonials={testimonials} brands={brands} />
```

### 4. Adding a New Sanity Data Source

1. Add the query in `src/app/page.jsx`:
   ```jsx
   async function getSanityData() {
     const [...existing, newData] = await Promise.all([
       ...existing queries,
       client.fetch('*[_type == "newType"]'),
     ]);
     return { ...existing, newData };
   }
   ```
2. Pass `newData` as prop to the target section component

### 5. Changing SEO Metadata

Edit `src/app/layout.jsx`:
- **Title/Description**: Update the `metadata` export object
- **OpenGraph/Twitter**: Update the `openGraph` and `twitter` fields
- **Structured Data**: Update `jsonLdPerson` and `jsonLdWebsite` objects
- **Robots**: Edit `src/app/robots.js`
- **Sitemap**: Edit `src/app/sitemap.js`

### 6. Adding New Static Images

1. Place the image in `public/assets/`
2. Add the reference in `constants/images.js`:
   ```js
   newImage: '/assets/newImage.png',
   ```
3. Import and use: `import images from '@/constants/images'`

### 7. Updating Social Media Links

- **Sidebar social links**: Edit `components/SocialMedia.jsx`
- **Footer mobile social links**: Edit `components/sections/Footer.jsx`
- **Navbar navigation items**: Edit `components/Navbar/Navbar.jsx`

### 8. Changing the Navigation Menu Items

Edit the arrays in:
- `components/Navbar/Navbar.jsx` — main nav links
- `components/NavigationDots.jsx` — side dot indicators

### 9. Modifying Styles

- **Global CSS variables**: `src/app/globals.css`
- **Global utility classes**: `styles/App.scss`
- **Component-specific styles**: Located next to each component (`.scss` files)

### 10. Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_TOKEN` | Sanity API token |

Update in `.env.local`. The `NEXT_PUBLIC_` prefix makes them available in both server and client code.

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## Deployment Notes

- **Vercel**: Deploy directly by connecting the `frontend_nextjs` folder
- **Netlify**: Add `@netlify/plugin-nextjs` or use the Next.js runtime adapter
- **Self-hosted**: Run `npm run build` then `npm start`

> **Important**: Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_TOKEN` as environment variables in your deployment platform.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to collect page data" | Check that `.env.local` has valid Sanity credentials |
| SCSS deprecation warnings | Already silenced in `next.config.mjs` via `sassOptions` |
| Images not loading from Sanity | Verify `cdn.sanity.io` is in `next.config.mjs` `images.remotePatterns` |
| Hydration mismatch errors | Ensure client components using browser APIs (e.g., `window`) guard with `typeof window !== 'undefined'` or use `useEffect` |
