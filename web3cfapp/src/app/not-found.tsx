'use client';

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-gray-400">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

