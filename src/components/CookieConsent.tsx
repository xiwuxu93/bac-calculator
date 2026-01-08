'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CookieConsent() {
  const t = useTranslations('consent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('safebac-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('safebac-consent', 'accepted');
    setIsVisible(false);
    // Here you would typically trigger your GTM/AdSense consent update
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('safebac-consent', 'rejected');
    setIsVisible(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg md:p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">{t('title')}</p>
          <p className="text-sm text-gray-600">
            {t('desc')}{' '}
            <Link href="/privacy" className="text-sky-600 hover:underline">
              {t('learnMore')}
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('reject')}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
