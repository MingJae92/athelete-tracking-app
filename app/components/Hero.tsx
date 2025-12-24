export default function Hero() {
  return (
    <section
      className="py-8 sm:py-12 lg:py-16 bg-gray-50"
      role="banner"
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-4 leading-snug">
          Cloudathlete – Coach Scheduling Tool
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 max-w-3xl mx-auto leading-relaxed">
          Schedule sessions with your favorite coaches and manage athlete availability easily.
        </p>
      </div>
    </section>
  );
}
