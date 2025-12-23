'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { getSlotsByCoach } from '@/app/lib/store';

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
  const [coachesWithSlots, setCoachesWithSlots] = useState<Coach[]>([]);

  useEffect(() => {
    // Map each coach to their next available slot
    const mapped = coaches.map((coach) => {
      const slots = getSlotsByCoach(coach.id)
        .filter((s) => s.status === 'available')
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

      return {
        ...coach,
        nextAvailableSlot: slots.length > 0 ? slots[0].start : undefined,
      };
    });

    setCoachesWithSlots(mapped);
  }, [coaches]);

  const filteredCoaches = useMemo(() => {
    return coachesWithSlots.filter((coach) =>
      coach.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [coachesWithSlots, search]);

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-700">Coaches</h2>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by coach name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 mb-6 focus:outline-none focus:border-gray-400 text-gray-700 font-light rounded"
      />

      {/* Empty state */}
      {filteredCoaches.length === 0 && (
        <p className="text-gray-600 font-light">No coaches found</p>
      )}

      {/* Coach List */}
      <div className="space-y-4">
        {filteredCoaches.map((coach) => (
          <Link
            key={coach.id}
            href={`/coaches/${coach.id}`}
            className="block border p-4 rounded transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <h3 className="text-lg font-light text-gray-700 mb-1">{coach.name}</h3>
            <p className="text-sm text-gray-600 font-light">{coach.speciality}</p>
            <p className="text-sm text-gray-600 font-light">Sport: {coach.sport}</p>
            {coach.nextAvailableSlot && (
              <p className="text-sm text-gray-600 font-light mt-2">
                Next slot: {new Date(coach.nextAvailableSlot).toLocaleString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
