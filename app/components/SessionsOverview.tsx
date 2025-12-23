"use client";

import { useEffect, useState } from "react";
import { coaches, athletes } from "@/app/lib/store";

type Session = {
  id: string;
  coachId: string;
  slotId: string;
  athleteIds: string[];
  notes?: string;
  createdAt: string;
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterCoach, setFilterCoach] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch("/api/sessions");
        const data = await res.json();
        const sorted = data.sort(
          (a: Session, b: Session) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setSessions(sorted);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const getCoachName = (id: string) =>
    coaches.find((c) => c.id === id)?.name || "Unknown Coach";

  const getAthleteNames = (ids: string[]) =>
    ids
      .map((id) => athletes.find((a) => a.id === id)?.name || "Unknown")
      .join(", ");

  const getAthleteDetails = (ids: string[]) =>
    ids.map((id) => athletes.find((a) => a.id === id) || { name: "Unknown", sport: "-", squad: "-" });

  const filteredSessions = sessions.filter((s) => {
    const matchesCoach = filterCoach
      ? getCoachName(s.coachId).toLowerCase().includes(filterCoach.toLowerCase())
      : true;
    const matchesDate = filterDate
      ? s.createdAt.startsWith(filterDate)
      : true;
    return matchesCoach && matchesDate;
  });

  if (loading) return <p className="text-center mt-10">Loading sessions...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Sessions</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by coach"
          value={filterCoach}
          onChange={(e) => setFilterCoach(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => {
          const isToday =
            new Date(session.createdAt).toDateString() === new Date().toDateString();
          return (
            <div
              key={session.id}
              className={`border rounded p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
                isToday ? "bg-yellow-50" : "bg-white"
              }`}
              onClick={() => setSelectedSession(session)}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  {new Date(session.createdAt).toLocaleString()}
                </span>
                <span className="italic">{getCoachName(session.coachId)}</span>
              </div>
              <div className="mb-2">
                <strong>Athletes ({session.athleteIds.length}):</strong>{" "}
                {getAthleteNames(session.athleteIds)}
              </div>
              {session.notes && (
                <div className="text-gray-600">
                  <strong>Notes:</strong> {session.notes}
                </div>
              )}
            </div>
          );
        })}
        {filteredSessions.length === 0 && (
          <p className="text-gray-500">No sessions found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedSession(null)} // close modal when clicking overlay
        >
          <div
            className="bg-white rounded p-6 w-full max-w-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedSession(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              {getCoachName(selectedSession.coachId)} -{" "}
              {new Date(selectedSession.createdAt).toLocaleString()}
            </h2>
            <p className="mb-4">
              <strong>Notes:</strong> {selectedSession.notes || "No notes provided"}
            </p>
            <h3 className="font-semibold mb-2">Athletes:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {getAthleteDetails(selectedSession.athleteIds).map((ath, i) => (
                <li key={i}>
                  <strong>{ath.name}</strong> - {ath.sport} ({ath.squad})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
