'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-300 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-light text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Cloudathlete Home"
          >
            Cloudathlete
          </Link>
        </div>
      </div>
    </nav>
  );
}
