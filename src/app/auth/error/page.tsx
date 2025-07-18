'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === 'AccessDenied'
              ? 'You do not have permission to sign in.'
              : error === 'Configuration'
              ? 'There is a problem with the server configuration.'
              : error === 'Verification'
              ? 'The sign in link is no longer valid.'
              : 'An error occurred during authentication.'}
          </p>
        </div>
        <div className="mt-6">
          <Link
            href="/auth/signin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff4c0c] hover:bg-[#e6450b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4c0c]"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
} 