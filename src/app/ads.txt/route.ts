import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const REMOTE_ADS_TXT_URL = 'https://adstxt.journeymv.com/sites/7a58edc2-df76-4bb8-9b63-292011f23f69/ads.txt';

export async function GET() {
  try {
    const response = await fetch(REMOTE_ADS_TXT_URL, {
      next: { revalidate: 86400 }, // Cache for 24 hours in Next.js Data Cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ads.txt, status: ${response.status}`);
    }

    const data = await response.text();

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching remote ads.txt:', error);
    
    // Fallback content in case the remote Mediavine server is down
    const fallbackContent = `# Ads.txt Fallback (Remote fetch failed)
managerdomain=journeymv.com
contact=sales@journeymv.com
ownerdomain=safebac.org
journeymv.com, 7a58edc2-df76-4bb8-9b63-292011f23f69, DIRECT, 1363c924529b3998
google.com, pub-1601477034266482, DIRECT, f08c47fec0942fa0
google.com, pub-7585907861569631, DIRECT, f08c47fec0942fa0
google.com, pub-1601477034266482, RESELLER, f08c47fec0942fa0
`;
    return new NextResponse(fallbackContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}
