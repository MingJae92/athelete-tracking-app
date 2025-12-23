import NavBar from "@/app/components/Navbar";

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-6xl mx-auto px-8">
        <NavBar/>
        <h1 className="text-4xl font-light text-gray-700 mb-6">Coaches</h1>
        <p>View all coaches and their availability</p>
      </div>
    </div>
  );
}