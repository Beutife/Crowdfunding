'use client';

export const dynamic = "force-dynamic";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">500 - Server Error</h1>
        <p className="text-gray-400 mb-6">Something went wrong!</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
