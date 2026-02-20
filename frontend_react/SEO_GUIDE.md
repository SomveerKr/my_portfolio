# SEO Configuration Guide

> This document explains every SEO element implemented in this portfolio site.
> Use it as a reference when you need to update any SEO-related content.

---

## Quick Reference: What to Update & Where

| What | File | When to Update |
|------|------|---------------|
| Page title | `public/index.html` → `<title>` tag | When you change your job title or branding |
| Meta description | `public/index.html` → `<meta name="description">` | When you want to highlight different skills |
| Keywords | `public/index.html` → `<meta name="keywords">` | When you learn new technologies |
| Social preview | `public/index.html` → `og:*` and `twitter:*` tags | When you update your title/description |
| Social preview image | `public/og-image.png` (create this!) | When you redesign the site |
| Structured data | `public/index.html` → `<script type="application/ld+json">` | When you change jobs, add skills, new social links |
| Noscript content | `public/index.html` → `<noscript>` section | When you change skills or bio content |
| Sitemap | `public/sitemap.xml` → `<lastmod>` date | Every time you deploy changes |
| Canonical URL | `public/index.html` → `<link rel="canonical">` | If you move to a custom domain |
| Alt texts | Component `.jsx` files → `alt=` attributes | When you change images |

---

## 1. Title Tag
**Location**: `public/index.html` line ~12

```html
<title>Somveer Kumar | Full Stack Developer & Legal Tech Expert</title>
```

**Rules**:
- Keep under **60 characters** (Google truncates longer titles)
- Put your **name first**, then a `|` separator, then your **key title**
- Include your most important keyword (your name)

**Example updates**:
```html
<title>Somveer Kumar | React & Next.js Developer</title>
<title>Somveer Kumar | Software Engineer & Legal Tech Expert</title>
```

---

## 2. Meta Description
**Location**: `public/index.html` line ~13-16

```html
<meta name="description" content="Somveer Kumar — Full Stack Web Developer, Software Engineer & Legal Tech Expert..." />
```

**Rules**:
- Keep under **160 characters**
- Include your name, job title, and top 3-4 skills
- Write it as a natural sentence (this shows in Google results!)
- Front-load important keywords

---

## 3. Open Graph Tags (Social Media Previews)
**Location**: `public/index.html` lines ~31-41

These control how your link looks when shared on **Facebook, LinkedIn, WhatsApp, Slack**, etc.

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://somveerkumar.netlify.app/og-image.png" />
```

**To update the preview image**:
1. Create a **1200 × 630 px** PNG image
2. Name it `og-image.png`
3. Place it in `frontend_react/public/`
4. After deploying, test at https://metatags.io

> ⚠️ **ACTION REQUIRED**: You need to create `og-image.png` and place it in `public/`. Without it, social shares won't have a preview image.

---

## 4. Twitter Card Tags
**Location**: `public/index.html` lines ~46-52

Same concept as OG tags, specifically for Twitter/X. Update the `twitter:creator` if your handle changes:
```html
<meta name="twitter:creator" content="@YourNewHandle" />
```

---

## 5. JSON-LD Structured Data (Most Important for Rich Results)
**Location**: `public/index.html` — two `<script type="application/ld+json">` blocks

### Person Schema
This tells Google who you are. Update these fields:

| Field | What It Does | Example |
|-------|-------------|---------|
| `name` | Your full name | `"Somveer Kumar"` |
| `jobTitle` | Your current title | `"Senior Software Engineer"` |
| `knowsAbout` | Array of your skills | `["React", "Python", ...]` |
| `sameAs` | Array of your profile URLs | `["https://github.com/...", ...]` |
| `email` | Contact email | `"your@email.com"` |
| `alumniOf.name` | Your school/university | `"Your University Name"` |
| `worksFor.name` | Your employer | `"Company Name"` or `"Freelance"` |

**To add a new skill**: Add a string to the `knowsAbout` array:
```json
"knowsAbout": ["React.js", "TypeScript", "NEW SKILL HERE"]
```

**To add a new social profile**: Add the URL to `sameAs`:
```json
"sameAs": ["https://github.com/...", "https://newplatform.com/your-profile"]
```

**Validate after changes**: https://search.google.com/test/rich-results

---

## 6. Sitemap
**Location**: `public/sitemap.xml`

```xml
<lastmod>2026-02-20</lastmod>
```

**Update the date** every time you deploy. Format: `YYYY-MM-DD`.

If you add new pages to your site, add new `<url>` blocks:
```xml
<url>
  <loc>https://somveerkumar.netlify.app/blog</loc>
  <lastmod>2026-03-15</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 7. Canonical URL
**Location**: `public/index.html` line ~25

```html
<link rel="canonical" href="https://somveerkumar.netlify.app/" />
```

**Update only if** you move to a custom domain:
```html
<link rel="canonical" href="https://somveerkumar.com/" />
```

Also update ALL `og:url`, `twitter:url`, and `sitemap.xml` URLs to match.

---

## 8. Noscript Fallback
**Location**: `public/index.html` — inside `<noscript>` tags

This hidden content is readable by search crawlers that don't run JavaScript. Keep it updated with your current skills and bio.

---

## 9. Alt Texts for Images
**Location**: Various `.jsx` component files

| File | Image | Current Alt Text |
|------|-------|-----------------|
| `container/Header/Header.jsx` | Profile photo | `"Somveer Kumar - Full Stack Developer and Legal Tech Expert"` |
| `container/Header/Header.jsx` | Tech circles | `"{SkillName} skill icon"` |
| `components/Navbar/Navbar.jsx` | Logo | `"Somveer Kumar - Developer Logo"` |

**Rule**: Always describe what the image shows + include your name or skill keywords where natural.

---

## 10. Netlify Configuration
**Location**: Root `netlify.toml`

Contains:
- Build settings (base directory, build command, publish directory)
- Security headers (X-Frame-Options, CSP, etc.)
- Caching rules (aggressive for static assets, no-cache for HTML)
- SPA redirect rule (all routes → index.html)

Generally **leave as-is** unless you change the build setup.

---

## Post-Deployment Checklist

After every deploy:
- [ ] Update `<lastmod>` in `sitemap.xml` to today's date
- [ ] Check site loads at https://somveerkumar.netlify.app/
- [ ] Verify `sitemap.xml` at https://somveerkumar.netlify.app/sitemap.xml
- [ ] Verify `robots.txt` at https://somveerkumar.netlify.app/robots.txt

First-time setup:
- [ ] Create `og-image.png` (1200×630px) in `public/`
- [ ] Set up [Google Search Console](https://search.google.com/search-console) and submit sitemap
- [ ] Test at [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test at [metatags.io](https://metatags.io)
- [ ] Run Chrome Lighthouse SEO audit (target: 90+)
