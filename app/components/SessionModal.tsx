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

  // Handle keyboard navigation (Escape to close)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6"
      onClick={onClose} // close modal when clicking overlay
      onKeyDown={handleKeyDown} // keyboard support
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1} // focusable container
    >
      <div
        className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg shadow-lg relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 id="modal-title" className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          {getCoachName(session.coachId)} - {new Date(session.createdAt).toLocaleString()}
        </h2>

        <p className="mb-4 text-sm sm:text-base break-words">
          <strong>Notes:</strong> {session.notes || "No notes provided"}
        </p>

        <h3 className="font-semibold mb-2 text-sm sm:text-base">Athletes:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
          {getAthleteDetails(session.athleteIds).map((ath, i) => (
            <li key={i} className="break-words">
              <strong>{ath.name}</strong> - {ath.sport} ({ath.squad})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
