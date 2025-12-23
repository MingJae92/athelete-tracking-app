import NavBar from "@/app/components/Navbar";
import SessionsOverview from "@/app/components/SessionsOverview";

export default function SessionsPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-6xl mx-auto px-8">
          <NavBar/>
        <h1 className="text-4xl font-light text-gray-700 mb-6">Sessions</h1>
        <p>View and manage training sessions</p>
        <SessionsOverview/>
      </div>
    </div>
  );
}