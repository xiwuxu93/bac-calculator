# Component Library

This template includes a minimal, clean set of reusable components designed for simple tool/calculator websites. The design philosophy is **simplicity first** - only the essential components you actually need.

## Philosophy

Inspired by clean, focused tool sites like [squareanimage.com](https://squareanimage.com/), this template emphasizes:
- Tool-first design
- Clean, minimal interface
- Fast loading
- Essential features only

## Core Components (4 Components)

### 1. ContentPlaceholder

A placeholder component for your main tool area.

**Location**: `src/components/ContentPlaceholder.tsx`

**Props**:
- `title` (string, optional): Placeholder title
- `description` (string, optional): Placeholder description
- `height` (string, optional): Minimum height (default: "400px")

**Example**:
```tsx
<ContentPlaceholder
  title="Your Calculator"
  description="Replace this with your actual tool component"
  height="500px"
/>
```

---

### 2. MarkdownContent

A Markdown renderer with optional Table of Contents - perfect for documentation and explanations.

**Location**: `src/components/MarkdownContent.tsx`

**Features**:
- GitHub Flavored Markdown support
- Optional Table of Contents
- Smooth scrolling
- Active section highlighting
- Responsive design

**Props**:
- `content` (string, required): Markdown content
- `showTOC` (boolean, optional): Show table of contents (default: true)
- `tocTitle` (string, optional): TOC title (default: "Table of Contents")

**Example**:
```tsx
const markdown = `
# How to Use

## Step 1
Enter your data...

## Step 2
Click calculate...
`;

<MarkdownContent
  content={markdown}
  showTOC={false}
/>
```

---

### 3. FAQ

An accordion-style FAQ component with automatic SEO optimization.

**Location**: `src/components/FAQ.tsx`

**Features**:
- Expand/collapse functionality
- Keyboard accessible
- Automatic FAQPage schema markup (SEO)
- Category support (optional)
- Single or multiple open modes

**Props**:
- `items` (FAQItem[], required): Array of FAQ items
- `title` (string, optional): Section title
- `description` (string, optional): Section description
- `defaultOpenIndex` (number, optional): Default open item
- `allowMultiple` (boolean, optional): Allow multiple items open
- `showCategory` (boolean, optional): Show category headers

**FAQItem Interface**:
```typescript
interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
```

**Example**:
```tsx
const faqItems = [
  {
    question: "How does this work?",
    answer: "Simply enter your data and click calculate..."
  },
  {
    question: "Is it free?",
    answer: "Yes, completely free to use."
  },
];

<FAQ
  items={faqItems}
  title="Frequently Asked Questions"
  defaultOpenIndex={0}
  allowMultiple={false}
  showCategory={false}
/>
```

---

### 4. CTA (Call to Action)

A simple call-to-action component to encourage users to try your tool.

**Location**: `src/components/CTA.tsx`

**Features**:
- Multiple style variants
- Primary button support
- Optional secondary button
- Customizable sizes
- Responsive design

**Props**:
- `title` (string, required): CTA title
- `description` (string, optional): CTA description
- `primaryButton` (object, optional): Primary button config
- `secondaryButton` (object, optional): Secondary button config
- `variant` ("default" | "gradient" | "minimal", optional): Style variant
- `size` ("sm" | "md" | "lg", optional): Component size

**Button Config**:
```typescript
{
  text: string;
  href?: string;
  onClick?: () => void;
}
```

**Example**:
```tsx
<CTA
  title="Ready to Get Started?"
  description="Try our tool now - it's free and easy"
  primaryButton={{
    text: "Use Tool Now",
    href: "#tool"
  }}
  variant="gradient"
  size="md"
/>
```

---

## Layout Components

### Header

Navigation header with logo and language switcher.

**Location**: `src/components/Header.tsx`

**Features**:
- Responsive navigation
- Language switcher (optional)
- Clean, minimal design

### Footer

Site footer with links and copyright.

**Location**: `src/components/Footer.tsx`

**Features**:
- Three-column layout
- Legal links (Privacy, Terms, Disclaimer)
- Resource links
- Copyright notice

---

## Typical Page Structure

Here's the recommended structure for a clean tool site:

```tsx
<main className="flex-1">
  <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
    {/* Hero */}
    <div className="text-center mb-8">
      <h1>Tool Name</h1>
      <p>Description</p>
    </div>

    {/* Main Tool */}
    <div id="tool" className="mb-16">
      <YourCalculator />
    </div>

    {/* Documentation */}
    <div className="mb-16">
      <MarkdownContent content={docs} showTOC={false} />
    </div>

    {/* FAQ */}
    <div className="mb-16">
      <FAQ items={faqItems} />
    </div>

    {/* CTA */}
    <CTA title="Ready to start?" />
  </div>
</main>
```

This structure follows the clean, tool-first approach seen in successful tool sites.

---

## Design Principles

### 1. Tool First
- Place the tool prominently at the top
- No distractions before the main functionality
- Clear, simple interface

### 2. Clean & Minimal
- White background
- Generous spacing
- Simple typography
- No unnecessary decorations

### 3. Mobile Responsive
- Works perfectly on all devices
- Touch-friendly interface
- Readable on small screens

### 4. Fast & Lightweight
- Minimal components = faster loading
- No bloat or unnecessary features
- Client-side rendering where needed

---

## Customization

### Colors

Modify Tailwind classes to match your brand:

```tsx
// Change from blue to your color
className="bg-blue-600" → className="bg-purple-600"
className="text-blue-600" → className="text-purple-600"
```

### Spacing

Adjust spacing between sections:

```tsx
// Current: 16 units (64px)
className="mb-16"

// Make tighter: 12 units (48px)
className="mb-12"

// Make looser: 20 units (80px)
className="mb-20"
```

### Fonts

Update in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
}
```

---

## What's NOT Included

These components were intentionally **removed** for simplicity:

- ~~Stats~~ - Often unnecessary, can add visual clutter
- ~~HowItWorks~~ - Use Markdown instead for instructions
- ~~Features~~ - Use Markdown to list benefits

If you need these, you can:
1. Use Markdown to create simple lists
2. Create custom sections as needed
3. Add only what you actually need

---

## Component Checklist

For a minimal, functional tool site:

- [x] **Tool/Calculator** - Your main functionality
- [x] **ContentPlaceholder** - During development
- [x] **MarkdownContent** - For documentation
- [x] **FAQ** - Answer common questions
- [x] **CTA** - Encourage usage
- [x] **Header** - Navigation
- [x] **Footer** - Legal links
- [x] **Legal Pages** - Privacy, Terms, Disclaimer

That's it! Everything else is optional.

---

## Best Practices

### 1. Keep It Simple
- Don't add components you don't need
- Every element should have a purpose
- Less is more

### 2. Tool-First Design
- Tool should be the hero
- Everything else supports the tool
- Make it immediately usable

### 3. Clear Content
- Short, simple explanations
- Bullet points over paragraphs
- Visual hierarchy

### 4. Mobile Testing
- Test on real devices
- Ensure tool works on mobile
- Check touch targets

---

## Examples

### Minimal Landing Page

```tsx
// Just the essentials
<main>
  <h1>Tool Name</h1>
  <p>One-line description</p>

  <YourTool />

  <FAQ items={faqItems} />
</main>
```

### With Documentation

```tsx
// Add some docs
<main>
  <h1>Tool Name</h1>
  <p>Description</p>

  <YourTool />

  <MarkdownContent content={docs} showTOC={false} />

  <FAQ items={faqItems} />

  <CTA title="Try it now" />
</main>
```

---

**Component Library Version**: 2.0.0 (Simplified)
**Philosophy**: Simplicity First
**Last Updated**: 2025-11-06
