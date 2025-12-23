interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function FeatureCard({ 
  title, 
  description, 
  buttonText, 
  href 
}: FeatureCardProps) {
  return (
    <article 
      className="bg-white border border-gray-300 p-10"
      aria-labelledby={`feature-title-${title}`}
    >
      <h2 
        id={`feature-title-${title}`} 
        className="text-3xl font-light text-gray-700 mb-6"
      >
        {title}
      </h2>
      <p className="text-gray-600 mb-12 font-light">{description}</p>
      <a 
        href={href}
        className="block w-full border border-gray-400 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 transition font-light text-base text-center focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        role="button"
        aria-label={`${buttonText} for ${title}`} // ✅ descriptive label for screen readers
      >
        {buttonText}
      </a>
    </article>
  );
}
