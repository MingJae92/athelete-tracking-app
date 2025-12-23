'use client';

import { useState, useEffect } from 'react';
import { Coach as CoachType, getSlotsByCoach, getAthletes, createSession } from '@/app/lib/store';

interface TimeSlot {
  id: string;
  status: 'Available' | 'Booked';
}

interface Athlete {
  id: string;
  name: string;
}

interface CoachDetailProps {
  coach: CoachType & { slots: string[] };
}

export default function CoachDetail({ coach }: CoachDetailProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Map coach slots to availability
    const mappedSlots: TimeSlot[] = coach.slots.map((slotId) => {
      const slot = getSlotsByCoach(coach.id).find((s) => s.id === slotId);
      return {
        id: slotId,
        status: slot?.status === 'booked' ? 'Booked' : 'Available',
      };
    });
    setSlots(mappedSlots);

    // Fetch athletes
    setAthletes(getAthletes());
  }, [coach]);

  const handleAthleteToggle = (id: string) => {
    setSelectedAthletes((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleCreateSession = () => {
    setError('');
    setSuccess('');

    if (!selectedSlot) return setError('Select a slot');
    if (selectedAthletes.length === 0) return setError('Select at least one athlete');

    try {
      createSession({
        coachId: coach.id,
        slotId: selectedSlot,
        athleteIds: selectedAthletes,
        notes,
      });

      setSuccess('Session successfully created!');
      setSelectedSlot('');
      setSelectedAthletes([]);
      setNotes('');
      setSlots((prev) =>
        prev.map((s) => (s.id === selectedSlot ? { ...s, status: 'Booked' } : s))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white border border-gray-300 p-6 rounded shadow space-y-6">
      {/* Coach Profile */}
      <div>
        <h2 className="text-2xl font-semibold">{coach.name}</h2>
        <p className="text-gray-600">Speciality: {coach.speciality}</p>
        <p className="text-gray-600">Sport: {coach.sport}</p>
        <p className="text-gray-600">Timezone: {coach.timezone}</p>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-2">Availability</h3>
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.id}
              disabled={slot.status === 'Booked'}
              onClick={() => setSelectedSlot(slot.id)}
              className={`py-2 px-3 border rounded text-sm font-medium transition
                ${slot.status === 'Booked' ? 'bg-red-100 text-red-600 cursor-not-allowed' : ''}
                ${selectedSlot === slot.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {slot.id} {slot.status === 'Booked' ? '(Booked)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Create Session */}
      <div>
        <h3 className="font-semibold mb-2">Athletes</h3>
        <div className="space-y-2 mb-4">
          {athletes.map((ath) => (
            <label key={ath.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAthletes.includes(ath.id)}
                onChange={() => handleAthleteToggle(ath.id)}
                className="w-4 h-4 border-gray-300 mr-2"
              />
              {ath.name}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Notes (optional)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 mb-4 rounded focus:outline-none focus:border-gray-400"
          rows={3}
        />

        <button
          onClick={handleCreateSession}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Session
        </button>

        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
      </div>
    </div>
  );
}
