# Simple SEO-Optimized Tool Site Template

A minimal, clean Next.js template for building tool/calculator websites. Inspired by successful tool sites like [squareanimage.com](https://squareanimage.com/) - **tool first, everything else second**.

## Philosophy: Simplicity First

This template follows a **less is more** approach:
- ✅ Only essential components
- ✅ Clean, minimal design
- ✅ Tool-first layout
- ✅ Fast loading
- ✅ SEO optimized

No bloat, no unnecessary features - just what you need to launch a professional tool site.

## Features

### Core Infrastructure
- **Next.js 14** with App Router
- **TypeScript** with strict mode
- **Tailwind CSS** + Typography plugin
- **SEO Optimized** - Metadata, structured data, sitemap
- **Analytics Ready** - Google Analytics integration
- **AdSense Ready** - Monetization support
- **Multi-language** - Easy to add more languages

### Components (4 Essential Ones)
1. **ContentPlaceholder** - Development placeholder
2. **MarkdownContent** - Documentation renderer
3. **FAQ** - Accordion FAQ with SEO
4. **CTA** - Call-to-action

That's it! Everything else you can add as needed.

## Project Structure

```
tool-template/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx         # Clean, simple homepage
│   │   │   ├── privacy/         # Privacy policy
│   │   │   ├── terms/           # Terms of service
│   │   │   └── disclaimer/      # Disclaimer
│   │   ├── layout.tsx
│   │   └── robots.ts
│   ├── components/
│   │   ├── ContentPlaceholder.tsx
│   │   ├── MarkdownContent.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── i18n.ts
│   └── messages/
│       └── en.ts
├── public/
├── .env.local
├── .env.production
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Start Building

Replace the `ContentPlaceholder` with your actual tool:

```tsx
// src/app/[locale]/page.tsx

// Replace this:
<ContentPlaceholder
  title="Your Tool Goes Here"
  description="..."
/>

// With your tool:
<YourCalculator />
```

### 4. Customize Content

**Update translations** (`src/messages/en.ts`):
```typescript
metadata: {
  title: 'Your Tool Name - Free Online Calculator',
  description: 'Brief description of your tool',
  siteName: 'Your Tool Name',
}
```

**Update FAQ items** (`src/app/[locale]/page.tsx`):
```typescript
const faqItems = [
  {
    question: "Your question?",
    answer: "Your answer..."
  },
  // ... more
];
```

### 5. Update Legal Pages

Edit these files with your actual policies:
- `src/app/[locale]/privacy/page.tsx`
- `src/app/[locale]/terms/page.tsx`
- `src/app/[locale]/disclaimer/page.tsx`

### 6. Configure Environment

**Production** (`.env.production`):
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 7. Build & Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) (recommended) or any Next.js-compatible platform.

## Page Structure

The homepage follows a clean, tool-first structure:

```tsx
<main>
  {/* Hero */}
  <h1>Tool Name</h1>
  <p>Description</p>

  {/* Tool (Above the Fold) */}
  <YourTool />

  {/* Documentation */}
  <MarkdownContent content={docs} />

  {/* FAQ */}
  <FAQ items={faqItems} />

  {/* CTA */}
  <CTA title="Ready to start?" />
</main>
```

Simple, clean, effective.

## Design Principles

### 1. Tool First
Your tool is the hero. Put it front and center, above the fold.

### 2. Minimal & Clean
- White background
- Generous spacing
- Simple typography
- No clutter

### 3. Fast & Lightweight
- 4 core components only
- No unnecessary bloat
- Optimized for speed

### 4. Mobile Responsive
Works perfectly on all devices out of the box.

## What's Included

✅ **Essential Components** - Only what you actually need
✅ **SEO Optimization** - Meta tags, structured data, sitemap
✅ **Legal Pages** - Privacy, Terms, Disclaimer templates
✅ **Analytics** - GA integration ready
✅ **AdSense** - Monetization ready
✅ **Responsive Design** - Mobile-first approach
✅ **TypeScript** - Full type safety

## What's NOT Included

These were intentionally removed for simplicity:

❌ Stats/Metrics components
❌ How It Works components
❌ Features grid components
❌ Complex layouts

**Why?** You can create these with simple Markdown or add them only if needed.

## Customization

### Colors

Change the primary color:

```tsx
// Find and replace in components
className="bg-blue-600" → className="bg-purple-600"
className="text-blue-600" → className="text-purple-600"
```

### Fonts

Update in `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
}
```

### Spacing

Adjust section spacing:

```tsx
className="mb-16" // Current (64px)
className="mb-12" // Tighter (48px)
className="mb-20" // Looser (80px)
```

## Documentation

- **COMPONENTS.md** - Component library reference
- **TOOL-SITE-ESSENTIALS.md** - Guide to building tool sites
- **USAGE.md** - Detailed usage guide

## Example Sites

This template is inspired by clean, focused tool sites:
- [squareanimage.com](https://squareanimage.com/)
- Other simple, tool-first websites

## Quick Launch Checklist

- [ ] Replace ContentPlaceholder with your tool
- [ ] Update site name and description
- [ ] Update FAQ items
- [ ] Write Privacy Policy
- [ ] Write Terms of Service
- [ ] Write Disclaimer
- [ ] Configure Google Analytics
- [ ] Test on mobile
- [ ] Deploy

## Support

- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **next-intl**: https://next-intl-docs.vercel.app/

## License

Free to use for personal and commercial projects.

---

**Template Version**: 2.0.0 (Simplified)
**Philosophy**: Tool First, Simplicity Always
**Last Updated**: 2025-11-06

**Ready to build something great!** 🚀
