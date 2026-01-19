import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">404</h1>
      <h2 className="mb-6 text-xl font-semibold text-gray-700 md:text-2xl">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-gray-600">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go Back Home
      </Link>
    </div>
  );
}
