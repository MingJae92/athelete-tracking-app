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
    <section aria-labelledby="coach-list-title" className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
        <h2 id="coach-list-title" className="text-2xl font-light text-gray-700">
          Coaches
        </h2>

        {/* Search */}
        <div className="w-full sm:w-64">
          <label htmlFor="coach-search" className="sr-only">Search coaches by name</label>
          <input
            id="coach-search"
            type="text"
            placeholder="Search by coach name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-400 text-gray-700 font-light"
          />
        </div>
      </div>

      {/* Empty state */}
      {filteredCoaches.length === 0 && (
        <p className="text-gray-600 font-light">No coaches found</p>
      )}

      {/* Coach List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoaches.map((coach) => (
          <li key={coach.id}>
            <Link
              href={`/coaches/${coach.id}`}
              className="block border p-4 rounded transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 h-full"
            >
              <h3 className="text-lg font-light text-gray-700 mb-1">{coach.name}</h3>
              <p className="text-sm text-gray-600 font-light">Speciality: {coach.speciality}</p>
              <p className="text-sm text-gray-600 font-light">Sport: {coach.sport}</p>
              {coach.nextAvailableSlot && (
                <p className="text-sm text-gray-600 font-light mt-2">
                  Next slot: {new Date(coach.nextAvailableSlot).toLocaleString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
