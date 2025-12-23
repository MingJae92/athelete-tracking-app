// app/components/SessionsOverview.tsx
'use client';

import { useState } from 'react';

interface Session {
  id: string;
  dateTime: string;
  coach: string;
  athletes: string;
  notes: string;
}

export default function SessionsOverview() {
  const [coachFilter, setCoachFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data - replace with actual API call
  const sessions: Session[] = [
    {
      id: '1',
      dateTime: 'Jan 6, 09:00',
      coach: 'Aisha Khan',
      athletes: '2 Athletes',
      notes: 'Strength training'
    },
    {
      id: '2',
      dateTime: 'Jan 7, 13:00',
      coach: 'Grace Okoye',
      athletes: '3 Athletes',
      notes: 'Sprint practice'
    }
  ];

  return (
    <div className="bg-white border border-gray-300 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-700">Upcoming Sessions</h2>
        <button className="p-2 hover:bg-gray-100 rounded transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          value={coachFilter}
          onChange={(e) => setCoachFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400 text-gray-700 font-light"
        >
          <option value="">Filter by Coach ▼</option>
          <option value="aisha">Aisha Khan</option>
          <option value="grace">Grace Okoye</option>
          <option value="john">John Miller</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-400 text-gray-700 font-light"
        >
          <option value="">Filter by Date ▼</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Sessions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-2 font-normal text-gray-700">Date & Time</th>
              <th className="text-left py-3 px-2 font-normal text-gray-700">Coach</th>
              <th className="text-left py-3 px-2 font-normal text-gray-700">Athletes</th>
              <th className="text-left py-3 px-2 font-normal text-gray-700">Notes</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="py-4 text-gray-600 font-light">
                  Loading...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={4} className="py-4 text-red-600 font-light">
                  Error: {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && sessions.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-gray-600 font-light">
                  No upcoming sessions
                </td>
              </tr>
            )}

            {!isLoading && !error && sessions.map((session) => (
              <tr key={session.id} className="border-b border-gray-200">
                <td className="py-3 px-2 text-gray-700 font-light">{session.dateTime}</td>
                <td className="py-3 px-2 text-gray-700 font-light">{session.coach}</td>
                <td className="py-3 px-2 text-gray-700 font-light">{session.athletes}</td>
                <td className="py-3 px-2 text-gray-700 font-light">{session.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}