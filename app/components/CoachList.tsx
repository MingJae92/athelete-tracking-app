'use client';

import { useMemo, useState } from 'react';

export interface Coach {
  id: string;
  name: string;
  speciality: string;
  sport: string;
  timezone: string;
  nextAvailableSlot?: string;
}

interface CoachListProps {
  coaches: Coach[];
}

export default function CoachList({ coaches }: CoachListProps) {
  const [search, setSearch] = useState('');
  const [selectedCoachId, setSelectedCoachId] = useState<string | null>(null);

  const filteredCoaches = useMemo(() => {
    return coaches.filter((coach) =>
      coach.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [coaches, search]);

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by coach name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 mb-6 focus:outline-none focus:border-gray-400 text-gray-700 font-light"
      />

      {/* Empty state */}
      {filteredCoaches.length === 0 && (
        <p className="text-gray-600 font-light">No coaches found</p>
      )}

      {/* Coach List */}
      <div className="space-y-4">
        {filteredCoaches.map((coach) => {
          const isSelected = coach.id === selectedCoachId;

          return (
            <div
              key={coach.id}
              onClick={() => setSelectedCoachId(coach.id)}
              className={`border p-4 cursor-pointer transition
                ${isSelected
                  ? 'border-gray-500 bg-gray-50'
                  : 'border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <h3 className="text-lg font-light text-gray-700 mb-1">
                {coach.name}
              </h3>

              <p className="text-sm text-gray-600 font-light">
                {coach.speciality}
              </p>

              <p className="text-sm text-gray-600 font-light">
                Sport: {coach.sport}
              </p>

              {coach.nextAvailableSlot && (
                <p className="text-sm text-gray-600 font-light mt-2">
                  Next slot: {coach.nextAvailableSlot}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
