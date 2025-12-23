import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="bg-gray-100 flex-grow">
        <Hero />

        {/* Feature Cards Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                title="Coaches"
                description="View all coaches and their availability"
                buttonText="View Coaches"
                href="/coaches"
              />
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

      <Footer />
    </div>
  );
}