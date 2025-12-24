import FeatureCard from "@/app/components/FeatureCard";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="bg-gray-100 flex-grow pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Feature Cards Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Card 1 */}
              <FeatureCard
                title="Coaches"
                description="View all coaches and their availability"
                buttonText="View Coaches"
                href="/coaches"
              />

              {/* Card 2 */}
              <FeatureCard
                title="Sessions"
                description="View upcoming sessions and create new ones"
                buttonText="View Sessions"
                href="/sessions"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
