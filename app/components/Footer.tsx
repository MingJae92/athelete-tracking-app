export default function Footer() {
  return (
    <footer 
      className="bg-white border-t border-gray-300 py-6" 
      role="contentinfo" 
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-light">
            © {new Date().getFullYear()} Cloudathlete. All rights reserved.
          </p>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            Skip to main content
          </a>
        </div>
      </div>
    </footer>
  );
}
