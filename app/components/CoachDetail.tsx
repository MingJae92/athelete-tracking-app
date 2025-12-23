// app/components/CoachDetail.tsx
'use client';

import { useState } from 'react';

interface TimeSlot {
  time: string;
  status: 'Available' | 'Booked';
}

interface Athlete {
  id: string;
  name: string;
}

export default function CoachDetail() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Mock data - replace with actual API call
  const coach = {
    name: 'Aisha Khan',
    specialty: 'Strength & Conditioning',
    timezone: 'PST'
  };

  const timeSlots: TimeSlot[] = [
    { time: '09:00', status: 'Available' },
    { time: '10:00', status: 'Booked' },
    { time: '14:00', status: 'Available' }
  ];

  const athletes: Athlete[] = [
    { id: '1', name: 'Maya Patel' },
    { id: '2', name: 'Lewis Grant' },
    { id: '3', name: 'Sofia Novak' }
  ];

  const handleAthleteToggle = (athleteId: string) => {
    setSelectedAthletes(prev =>
      prev.includes(athleteId)
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const handleCreateSession = () => {
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }
    if (selectedAthletes.length === 0) {
      setError('Please select at least one athlete');
      return;
    }
    // Handle session creation
    console.log({ selectedSlot, selectedAthletes, notes });
  };

  return (
    <div className="bg-white border border-gray-300 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-light text-gray-700 mb-1">{coach.name}</h2>
          <p className="text-gray-600 font-light">{coach.specialty}</p>
          <p className="text-gray-600 font-light text-sm">Timezone: {coach.timezone}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <h3 className="text-lg font-normal text-gray-700 mb-4">Availability</h3>
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <div
              key={slot.time}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <span className="text-gray-700 font-light">{slot.time}</span>
              <span className={`font-light ${slot.status === 'Available' ? 'text-gray-700' : 'text-gray-500'}`}>
                {slot.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Session */}
      <div>
        <h3 className="text-lg font-normal text-gray-700 mb-4">Create Session</h3>

        {/* Time Slot Selector */}
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:border-gray-400 text-gray-700 font-light"
        >
          <option value="">Select Slot ▼</option>
          {timeSlots
            .filter(slot => slot.status === 'Available')
            .map(slot => (
              <option key={slot.time} value={slot.time}>
                {slot.time}
              </option>
            ))}
        </select>

        {/* Athletes Checkboxes */}
        <div className="space-y-3 mb-4">
          {athletes.map((athlete) => (
            <label key={athlete.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAthletes.includes(athlete.id)}
                onChange={() => handleAthleteToggle(athlete.id)}
                className="w-4 h-4 border-gray-300 mr-3"
              />
              <span className="text-gray-700 font-light">{athlete.name}</span>
            </label>
          ))}
        </div>

        {/* Notes */}
        <textarea
          placeholder="Notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 mb-4 focus:outline-none focus:border-gray-400 font-light"
          rows={3}
        />

        {/* Create Button */}
        <button
          onClick={handleCreateSession}
          className="w-full bg-gray-600 text-white py-3 hover:bg-gray-700 transition font-light"
        >
          Create Session
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-gray-600 italic mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}