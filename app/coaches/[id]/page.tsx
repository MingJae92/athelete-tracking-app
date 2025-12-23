// app/coaches/[id]/page.tsx
import CoachDetail from "@/app/components/CoachDetail";
import { getCoaches, getSlotsByCoach } from "@/app/lib/store";

interface CoachPageProps {
  params: Promise<{ id: string }>;
}

export default async function CoachPage({ params }: CoachPageProps) {
  const { id } = await params; // ✅ THIS IS THE FIX

  const coachFromStore = getCoaches().find((c) => c.id === id);

  if (!coachFromStore) {
    return <p className="text-center mt-10 text-red-600">Coach not found</p>;
  }

  const coachWithSlots = {
    ...coachFromStore,
    slots: getSlotsByCoach(coachFromStore.id).map((s) => s.id),
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-6xl mx-auto px-8">
        <CoachDetail coach={coachWithSlots} />
      </div>
    </div>
  );
}
