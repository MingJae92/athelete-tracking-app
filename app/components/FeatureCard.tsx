// components/FeatureCard.tsx
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
    <div className="bg-white border border-gray-300 p-10">
      <h2 className="text-3xl font-light text-gray-700 mb-6">{title}</h2>
      <p className="text-gray-600 mb-12 font-light">{description}</p>
      <a 
        href={href}
        className="block w-full border border-gray-400 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 transition font-light text-base text-center"
      >
        {buttonText}
      </a>
    </div>
  );
}