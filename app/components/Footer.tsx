export default function Footer() {
  return (
    <footer 
      className="bg-white border-t border-gray-300 py-6 px-4 sm:px-6 md:px-8" 
      role="contentinfo" 
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm font-light text-center sm:text-left">
          © {new Date().getFullYear()} Cloudathlete. All rights reserved.
        </p>

        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-blue-400 rounded text-sm"
        >
          Skip to main content
        </a>
      </div>
    </footer>
  );
}
