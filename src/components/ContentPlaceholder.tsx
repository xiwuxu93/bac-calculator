"use client";

import React from "react";

interface ContentPlaceholderProps {
  title?: string;
  description?: string;
  height?: string;
}

/**
 * ContentPlaceholder - A reusable placeholder component for content areas
 *
 * This component can be used as a placeholder for any content that will be added later.
 * It provides a clean, centered layout with customizable title and description.
 */
export default function ContentPlaceholder({
  title = "Content Area",
  description = "This is a placeholder for your main content. Replace this component with your actual content.",
  height = "400px"
}: ContentPlaceholderProps) {
  return (
    <div
      className="w-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
      style={{ minHeight: height }}
    >
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">
          {title}
        </h3>
        <p className="text-base text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
