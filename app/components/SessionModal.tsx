"use client";

import { athletes, coaches } from "@/app/lib/store";

type Session = {
  id: string;
  coachId: string;
  slotId: string;
  athleteIds: string[];
  notes?: string;
  createdAt: string;
};

type Props = {
  session: Session;
  onClose: () => void;
};

export default function SessionModal({ session, onClose }: Props) {
  const getCoachName = (id: string) =>
    coaches.find((c) => c.id === id)?.name || "Unknown Coach";

  const getAthleteDetails = (ids: string[]) =>
    ids.map((id) => athletes.find((a) => a.id === id) || { name: "Unknown", sport: "-", squad: "-" });

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // close modal when clicking overlay
    >
      <div
        className="bg-white rounded p-6 w-full max-w-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          {getCoachName(session.coachId)} - {new Date(session.createdAt).toLocaleString()}
        </h2>
        <p className="mb-4">
          <strong>Notes:</strong> {session.notes || "No notes provided"}
        </p>
        <h3 className="font-semibold mb-2">Athletes:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {getAthleteDetails(session.athleteIds).map((ath, i) => (
            <li key={i}>
              <strong>{ath.name}</strong> - {ath.sport} ({ath.squad})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
