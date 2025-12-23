// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-light">
            © {new Date().getFullYear()} Cloudathlete. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}