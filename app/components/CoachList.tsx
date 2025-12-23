'use client';

interface Coach {
  id: string;
  name: string;
  specialty: string;
  secondary?: string;
  nextSlot?: string;
}

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Aisha Khan',
    specialty: 'Strength & Conditioning',
    secondary: 'Running',
    nextSlot: 'Jan 6, 09:00',
  },
  {
    id: '2',
    name: 'John Miller',
    specialty: 'Swimming Coach',
    nextSlot: 'Jan 7, 11:00',
  },
  {
    id: '3',
    name: 'Grace Okoye',
    specialty: 'Sprint Specialist',
  },
];

export default function CoachList() {
  return (
    <div className="bg-white border border-gray-300 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-700">Coaches</h2>
        <button className="p-2 hover:bg-gray-100 rounded transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search coaches..."
        className="w-full border border-gray-300 px-4 py-2 mb-6 focus:outline-none focus:border-gray-400 text-gray-700 font-light"
      />

      {/* Coach Cards */}
      <div className="space-y-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-light text-gray-700 mb-1">
              {coach.name}
            </h3>

            <p className="text-gray-600 font-light text-sm">
              {coach.specialty}
            </p>

            {coach.secondary && (
              <p className="text-gray-600 font-light text-sm">
                {coach.secondary}
              </p>
            )}

            {coach.nextSlot && (
              <p className="text-sm text-gray-600 font-light mt-2">
                Next slot: {coach.nextSlot}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* States */}
      <div className="mt-8 text-sm text-gray-600 font-light space-y-2">
        <p>Loading...</p>
        <p>No coaches found</p>
        <p className="italic">Error: Failed to load coaches</p>
      </div>
    </div>
  );
}
