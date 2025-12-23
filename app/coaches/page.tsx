import NavBar from "@/app/components/Navbar";
import CoachList from "@/app/components/CoachList";

export default async function CoachesPage() {
  const res = await fetch("http://localhost:3000/api/coaches", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load coaches");
  }

  const coaches = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Navbar should be full-width */}
      <NavBar />

      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-4xl font-light text-gray-700 mb-2">
          Coaches
        </h1>
        <p className="text-gray-600 mb-8">
          View all coaches and their availability
        </p>

        <CoachList coaches={coaches} />
      </div>
    </div>
  );
}
