# Template Usage Guide

This guide shows you how to use the key components of this template to build your own SEO-optimized website.

## Quick Start Checklist

- [ ] Update site metadata in `src/messages/en.ts`
- [ ] Replace ContentPlaceholder with your actual content
- [ ] Update Privacy Policy page
- [ ] Update Terms of Service page
- [ ] Update Disclaimer page
- [ ] Configure environment variables
- [ ] Set up Google Analytics
- [ ] Set up Google AdSense (optional)
- [ ] Update README with your project details
- [ ] Test build locally
- [ ] Deploy to production

## Using the MarkdownContent Component

### Basic Usage

The MarkdownContent component is perfect for documentation, blog posts, or any long-form content with sections.

\`\`\`tsx
import MarkdownContent from '@/components/MarkdownContent';

const content = \`
# My Documentation

## Introduction

This is the introduction section.

## Getting Started

Here's how to get started:

1. Step one
2. Step two
3. Step three

### Prerequisites

- Node.js
- npm

## Advanced Topics

### Configuration

Details about configuration...

### Deployment

How to deploy...
\`;

export default function DocumentationPage() {
  return (
    <MarkdownContent
      content={content}
      showTOC={true}
      tocTitle="On This Page"
    />
  );
}
\`\`\`

### Loading Markdown from Files

For larger content, you can load markdown from files:

\`\`\`tsx
import MarkdownContent from '@/components/MarkdownContent';
import fs from 'fs';
import path from 'path';

export default function DocumentationPage() {
  const markdownPath = path.join(process.cwd(), 'content', 'docs.md');
  const content = fs.readFileSync(markdownPath, 'utf8');

  return (
    <MarkdownContent
      content={content}
      showTOC={true}
      tocTitle="Table of Contents"
    />
  );
}
\`\`\`

### Markdown Features Supported

- **Headings**: # H1, ## H2, ### H3, etc.
- **Bold**: **bold text**
- **Italic**: *italic text*
- **Links**: [text](url)
- **Images**: ![alt](url)
- **Lists**: Ordered and unordered
- **Code blocks**: \`\`\`language\`\`\`
- **Inline code**: \`code\`
- **Tables**: GitHub-style tables
- **Blockquotes**: > quote
- **Strikethrough**: ~~text~~
- **Task lists**: - [x] done, - [ ] todo

## Using the ContentPlaceholder Component

### Basic Placeholder

Replace this with your actual content when ready:

\`\`\`tsx
import ContentPlaceholder from '@/components/ContentPlaceholder';

<ContentPlaceholder
  title="Coming Soon"
  description="This section will contain your main content."
  height="400px"
/>
\`\`\`

### Custom Height

Adjust the height based on your layout:

\`\`\`tsx
<ContentPlaceholder
  title="Feature Section"
  description="This will be a key feature of your app."
  height="600px"
/>
\`\`\`

### Multiple Placeholders

Use multiple placeholders for different sections:

\`\`\`tsx
<div className="space-y-8">
  <ContentPlaceholder
    title="Hero Section"
    description="Your main hero content"
    height="500px"
  />

  <ContentPlaceholder
    title="Features"
    description="Your feature grid"
    height="400px"
  />

  <ContentPlaceholder
    title="Testimonials"
    description="Customer testimonials"
    height="300px"
  />
</div>
\`\`\`

## Creating New Pages

### Static Page

Create a new static page in \`src/app/[locale]/your-page/page.tsx\`:

\`\`\`tsx
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import { Locale, defaultLocale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const localePrefix = locale === defaultLocale ? '' : \`/\${locale}\`;
  const localizedUrl = \`\${SITE_URL}\${localePrefix}/your-page\`;

  return {
    title: 'Your Page Title | Your Site',
    description: 'Your page description',
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: \`\${SITE_URL}/your-page\`,
        'x-default': \`\${SITE_URL}/your-page\`,
      },
    },
  };
}

const content = \`
# Your Page Title

Your content here...
\`;

export default function YourPage({ params }: PageProps) {
  const locale = params.locale as Locale;

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 px-4 py-12">
        <MarkdownContent content={content} showTOC={true} />
      </main>
      <Footer />
    </div>
  );
}
\`\`\`

### Dynamic Page

For dynamic content, use dynamic routes with \`[slug]\`:

\`\`\`tsx
// src/app/[locale]/blog/[slug]/page.tsx
export async function generateMetadata({ params }: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  // Fetch post data based on slug
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: {
  params: { slug: string; locale: string }
}) {
  const post = await getPost(params.slug);

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={params.locale as Locale} />
      <main className="flex-1 px-4 py-12">
        <MarkdownContent
          content={post.content}
          showTOC={true}
          tocTitle="Contents"
        />
      </main>
      <Footer />
    </div>
  );
}
\`\`\`

## Internationalization

### Adding Translations

Edit \`src/messages/en.ts\`:

\`\`\`typescript
export default {
  metadata: {
    title: 'My Site - Description',
    description: 'A brief description of my site',
    siteName: 'My Site',
    keywords: 'keyword1, keyword2, keyword3',
  },
  home: {
    title: 'Welcome to My Site',
    description: 'This is the homepage',
    // Add more translations...
  },
  common: {
    readMore: 'Read More',
    goBack: 'Go Back',
    // Common translations...
  },
};
\`\`\`

### Using Translations in Components

\`\`\`tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
\`\`\`

### Server Components

\`\`\`tsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent({ params }: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
\`\`\`

## SEO Optimization

### Meta Tags

Always include comprehensive metadata:

\`\`\`tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title | Site Name',
    description: 'Clear, concise description (150-160 chars)',
    keywords: 'relevant, keywords, here',
    openGraph: {
      title: 'OG Title',
      description: 'OG Description',
      images: ['/og-image.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Twitter Title',
      description: 'Twitter Description',
      images: ['/og-image.png'],
    },
  };
}
\`\`\`

### Structured Data

Add JSON-LD structured data for better SEO:

\`\`\`tsx
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Article Headline',
  description: 'Article description',
  author: {
    '@type': 'Person',
    name: 'Author Name',
  },
  datePublished: '2025-11-06',
  dateModified: '2025-11-06',
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
\`\`\`

## Styling

### Tailwind Classes

Use Tailwind utility classes for styling:

\`\`\`tsx
<div className="max-w-7xl mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold text-gray-900 mb-4">
    Title
  </h1>
  <p className="text-lg text-gray-600">
    Description
  </p>
</div>
\`\`\`

### Custom Components

Create reusable styled components:

\`\`\`tsx
// src/components/Card.tsx
interface CardProps {
  title: string;
  description: string;
  link?: string;
}

export default function Card({ title, description, link }: CardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {link && (
        <a href={link} className="text-blue-600 hover:underline">
          Learn more →
        </a>
      )}
    </div>
  );
}
\`\`\`

## Testing

### Local Testing

\`\`\`bash
# Development mode
npm run dev

# Production build test
npm run build
npm start
\`\`\`

### Check for Issues

1. **Build errors**: \`npm run build\`
2. **Type errors**: \`npm run lint\`
3. **Broken links**: Manual testing or use a link checker
4. **SEO**: Use Google's Rich Results Test
5. **Mobile**: Test responsive design on different devices

## Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables
- [ ] Test production build locally
- [ ] Verify all links work
- [ ] Check SEO metadata
- [ ] Test on mobile devices
- [ ] Verify Analytics is working
- [ ] Check page load speed
- [ ] Test all forms and interactions
- [ ] Review Privacy Policy and Terms
- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Submit sitemap to Google Search Console

## Common Patterns

### Hero Section

\`\`\`tsx
<section className="bg-gradient-to-br from-blue-50 to-white py-20">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h1 className="text-5xl font-bold mb-6">
      Your Compelling Headline
    </h1>
    <p className="text-xl text-gray-600 mb-8">
      Your value proposition in one clear sentence
    </p>
    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
      Get Started
    </button>
  </div>
</section>
\`\`\`

### Feature Grid

\`\`\`tsx
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.title} className="text-center">
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
\`\`\`

### Call to Action

\`\`\`tsx
<section className="bg-blue-600 text-white py-16">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
    <p className="text-xl mb-8">Join thousands of satisfied users today</p>
    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
      Start Now
    </button>
  </div>
</section>
\`\`\`

## Tips & Best Practices

1. **Performance**: Use Next.js Image component for all images
2. **SEO**: Include alt text for all images
3. **Accessibility**: Use semantic HTML and ARIA labels
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Type Safety**: Always define TypeScript types for components
6. **Components**: Keep components small and focused
7. **Translations**: Always use translation keys, never hardcode text
8. **Testing**: Test on multiple browsers and devices
9. **Analytics**: Set up conversion tracking for important actions
10. **Content**: Write clear, concise, user-focused content

---

Happy building! 🚀
