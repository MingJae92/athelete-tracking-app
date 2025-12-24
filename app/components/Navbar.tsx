'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-300 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-label="Cloudathlete Home"
          >
            Cloudathlete
          </Link>
        </div>
      </div>
    </nav>
  );
}
