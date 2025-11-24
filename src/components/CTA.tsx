"use client";

import React from "react";

interface CTAProps {
  title: string;
  description?: string;
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: "default" | "gradient" | "minimal";
  size?: "sm" | "md" | "lg";
}

/**
 * CTA (Call to Action) Component - Encourage users to take action
 *
 * Features:
 * - Multiple style variants
 * - Primary and secondary buttons
 * - Customizable sizes
 * - Responsive design
 * - Gradient backgrounds
 *
 * @example
 * ```tsx
 * <CTA
 *   title="Ready to Get Started?"
 *   description="Join thousands of users using our tool"
 *   primaryButton={{
 *     text: "Start Now",
 *     href: "#calculator"
 *   }}
 *   secondaryButton={{
 *     text: "Learn More",
 *     href: "/about"
 *   }}
 *   variant="gradient"
 *   size="lg"
 * />
 * ```
 */
export default function CTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = "default",
  size = "md",
}: CTAProps) {
  const sizeClasses = {
    sm: "py-12 px-6",
    md: "py-16 px-8",
    lg: "py-20 px-12",
  }[size];

  const variantClasses = {
    default: "bg-blue-600 text-white border border-blue-700",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    minimal: "bg-gray-50 text-gray-900 border border-gray-200",
  }[variant];

  const primaryButtonClasses =
    variant === "minimal"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-white text-blue-600 hover:bg-gray-100";

  const secondaryButtonClasses =
    variant === "minimal"
      ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
      : "bg-transparent text-white border-white/30 hover:bg-white/10";

  const renderButton = (
    button: { text: string; href?: string; onClick?: () => void },
    isPrimary: boolean
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center
      px-8 py-3 rounded-lg
      font-semibold text-base
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      ${isPrimary ? primaryButtonClasses : `border-2 ${secondaryButtonClasses}`}
    `;

    if (button.href) {
      return (
        <a href={button.href} className={baseClasses}>
          {button.text}
          {isPrimary && (
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
        </a>
      );
    }

    return (
      <button onClick={button.onClick} className={baseClasses}>
        {button.text}
        {isPrimary && (
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        )}
      </button>
    );
  };

  return (
    <section
      className={`w-full rounded-lg shadow-xl overflow-hidden ${variantClasses}`}
    >
      <div className={`text-center ${sizeClasses}`}>
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryButton && renderButton(primaryButton, true)}
          {secondaryButton && renderButton(secondaryButton, false)}
        </div>
      </div>
    </section>
  );
}
