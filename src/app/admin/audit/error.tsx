'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Audit Logs Error</h2>
        <p className="text-neutral-600 mb-4">{error.message || 'Something went wrong loading the audit logs'}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 