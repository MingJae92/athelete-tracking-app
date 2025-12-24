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
      className="bg-white border border-gray-300 p-6 sm:p-8 md:p-10 rounded shadow flex flex-col justify-between h-full"
      aria-labelledby={`feature-title-${title}`}
    >
      <h2 
        id={`feature-title-${title}`} 
        className="text-2xl sm:text-3xl font-light text-gray-700 mb-4 sm:mb-6"
      >
        {title}
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-12 font-light text-sm sm:text-base">
        {description}
      </p>
      <a 
        href={href}
        className="block w-full border border-gray-400 bg-white px-4 py-2 sm:px-6 sm:py-3 text-gray-700 hover:bg-gray-50 transition font-light text-sm sm:text-base text-center focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        role="button"
        aria-label={`${buttonText} for ${title}`}
      >
        {buttonText}
      </a>
    </article>
  );
}
