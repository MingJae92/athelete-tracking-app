import coachesSeed from "./seed/coaches.json";
import athletesSeed from "./seed/atheletes.json";
import availabilitySeed from "./seed/availability.json";
import sessionsSeed from "./seed/sessions.json";

// ------------------------
// Types
// ------------------------
export interface Coach {
  id: string;
  name: string;
  speciality: string;
  sport: string;
  timezone: string;
  slots: string[]; // <-- added
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  squad: string;
}

export type SlotStatus = "available" | "booked";

export interface Slot {
  id: string;
  coachId: string;
  start: string;
  end: string;
  status: SlotStatus;
}

export interface Session {
  id: string;
  coachId: string;
  slotId: string;
  athleteIds: string[];
  notes?: string;
  createdAt: string;
}

// ------------------------
// In-memory arrays (mutable)
// ------------------------
export const coaches: Coach[] = (coachesSeed as Coach[]).map((coach) => ({
  ...coach,
  slots: availabilitySeed
    .filter((slot) => slot.coachId === coach.id)
    .map((slot) => slot.id), // assign slots to each coach
}));

export const athletes: Athlete[] = athletesSeed as Athlete[];
export const slots: Slot[] = availabilitySeed.map((s) => ({
  ...s,
  status: s.status === "available" ? "available" : "booked",
})) as Slot[];
export const sessions: Session[] = sessionsSeed as Session[];

// ------------------------
// Read functions
// ------------------------
export function getCoaches(): Coach[] {
  return coaches;
}

export function getAthletes(): Athlete[] {
  return athletes;
}

export function getSlotsByCoach(coachId: string): Slot[] {
  return slots.filter((s) => s.coachId === coachId);
}

export function getSessions(): Session[] {
  return sessions;
}

// ------------------------
// Mutation functions
// ------------------------
export function createSession(input: {
  coachId: string;
  slotId: string;
  athleteIds: string[];
  notes?: string;
}): Session {
  const slot = slots.find((s) => s.id === input.slotId);
  if (!slot) throw new Error("Slot not found");
  if (slot.status === "booked") throw new Error("Slot already booked");
  if (!input.athleteIds || input.athleteIds.length === 0)
    throw new Error("At least one athlete must be selected");

  // Mark slot as booked
  slot.status = "booked";

  const session: Session = {
    id: `session_${sessions.length + 1}`,
    coachId: input.coachId,
    slotId: input.slotId,
    athleteIds: input.athleteIds,
    notes: input.notes,
    createdAt: new Date().toISOString(),
  };

  sessions.push(session);
  return session;
}
