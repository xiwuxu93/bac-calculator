"use client";

import React, { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
  showCategory?: boolean;
}

/**
 * FAQ Component - A reusable, accessible FAQ component with accordion functionality
 *
 * Features:
 * - Accordion-style expand/collapse
 * - Optional single or multiple items open at once
 * - Category filtering support
 * - Keyboard accessible
 * - Smooth animations
 * - SEO-friendly with proper heading structure
 * - Supports structured data (JSON-LD) for FAQPage
 *
 * @example
 * ```tsx
 * const faqItems = [
 *   {
 *     question: "What is this tool?",
 *     answer: "This is a description of the tool...",
 *     category: "General"
 *   },
 *   // ... more items
 * ];
 *
 * <FAQ
 *   items={faqItems}
 *   title="Frequently Asked Questions"
 *   description="Find answers to common questions"
 *   defaultOpenIndex={0}
 *   allowMultiple={false}
 * />
 * ```
 */
export default function FAQ({
  items,
  title = "Frequently Asked Questions",
  description,
  defaultOpenIndex = -1,
  allowMultiple = false,
  showCategory = false,
}: FAQProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(defaultOpenIndex >= 0 ? [defaultOpenIndex] : [])
  );

  const toggleItem = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev);

      if (allowMultiple) {
        // Multiple items can be open
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
      } else {
        // Only one item can be open
        if (newSet.has(index)) {
          newSet.clear();
        } else {
          newSet.clear();
          newSet.add(index);
        }
      }

      return newSet;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  // Group items by category if needed
  const categories = showCategory && items.some(item => item.category)
    ? Array.from(new Set(items.map(item => item.category || 'General')))
    : [];

  const getItemsByCategory = (category: string) =>
    items.filter(item => (item.category || 'General') === category);

  const renderFAQItems = (itemsToRender: FAQItem[], startIndex: number = 0) => (
    <>
      {itemsToRender.map((item, idx) => {
        const index = startIndex + idx;
        const isOpen = openIndices.has(index);

        return (
          <div
            key={index}
            className="border-b border-gray-200 last:border-b-0"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between py-5 px-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-gray-900 pr-8 text-base md:text-lg">
                {item.question}
              </span>
              <svg
                className={`flex-shrink-0 w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <section className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-8 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 text-base md:text-lg">
            {description}
          </p>
        )}
      </div>

      {/* FAQ Items */}
      <div className="divide-y divide-gray-200">
        {showCategory && categories.length > 0 ? (
          // Render by category
          categories.map((category) => {
            const categoryItems = getItemsByCategory(category);
            const startIndex = items.findIndex(
              (item) => (item.category || 'General') === category
            );

            return (
              <div key={category}>
                <h3 className="px-6 py-4 bg-gray-50 font-semibold text-gray-900 text-lg">
                  {category}
                </h3>
                {renderFAQItems(categoryItems, startIndex)}
              </div>
            );
          })
        ) : (
          // Render all items
          renderFAQItems(items)
        )}
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
