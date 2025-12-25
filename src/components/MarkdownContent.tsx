"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface MarkdownContentProps {
  content: string;
  showTOC?: boolean;
  tocTitle?: string;
}

function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const extractedHeadings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    extractedHeadings.push({ id, text, level });
  }
  return extractedHeadings;
}

/**
 * MarkdownContent - A comprehensive Markdown component with Table of Contents
 *
 * Features:
 * - Automatic Table of Contents generation from headings
 * - Smooth scroll to sections
 * - Active section highlighting
 * - Support for GitHub Flavored Markdown
 * - Responsive design with sticky TOC
 * - Typography-optimized styling
 *
 * @example
 * ```tsx
 * <MarkdownContent
 *   content={markdownString}
 *   showTOC={true}
 *   tocTitle="Table of Contents"
 * />
 * ```
 */
export default function MarkdownContent({
  content,
  showTOC = true,
  tocTitle = "Table of Contents",
}: MarkdownContentProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  // Track active section on scroll
  useEffect(() => {
    if (!showTOC || headings.length === 0) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 1.0,
    });

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, showTOC]);

  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Table of Contents - Sticky Sidebar */}
      {showTOC && headings.length > 0 && (
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="lg:sticky lg:top-24 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              {tocTitle}
            </h2>
            <ul className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <li key={id} style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleTOCClick(e, id)}
                    className={`
                      block py-1.5 px-2 rounded text-sm transition-all duration-200
                      hover:bg-gray-50
                      ${
                        activeId === id
                          ? " font-semibold bg-blue-50"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <article
        className={`
          flex-1 min-w-0
          prose prose-gray
          prose-headings:scroll-mt-24
          prose-headings:text-gray-900
          prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4
          prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-8
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-6
          prose-p:text-gray-700
          prose-p:leading-relaxed prose-p:mb-4
          
          prose-a:no-underline hover:prose-a:underline
          prose-code:text-sm prose-code:bg-gray-100
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-50
          prose-pre:border prose-pre:border-gray-200
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500
          prose-blockquote:bg-blue-50
          prose-blockquote:py-2 prose-blockquote:px-4
          prose-img:rounded-lg
          prose-table:border-collapse
          prose-th:bg-gray-50
          prose-td:border prose-td:border-gray-200
          prose-ul:list-disc prose-ol:list-decimal
          max-w-none
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["anchor-link"],
                },
              },
            ],
          ]}
          components={{
            // Custom heading renderer to match our extracted IDs
            h1: ({ children, ...props }) => {
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return <h1 id={id} {...props}>{children}</h1>;
            },
            h2: ({ children, ...props }) => {
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return <h2 id={id} {...props}>{children}</h2>;
            },
            h3: ({ children, ...props }) => {
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return <h3 id={id} {...props}>{children}</h3>;
            },
            h4: ({ children, ...props }) => {
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return <h4 id={id} {...props}>{children}</h4>;
            },
            h5: ({ children, ...props }) => {
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return <h5 id={id} {...props}>{children}</h5>;
            },
            h6: ({ children, ...props }) => {
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return <h6 id={id} {...props}>{children}</h6>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
