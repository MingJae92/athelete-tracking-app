import { NextRequest, NextResponse } from "next/server";
import { getSessions, createSession } from "@/app/lib/store";

// GET /api/sessions
export async function GET() {
  try {
    const sessions = getSessions();
    return NextResponse.json(sessions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/sessions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { coachId, slotId, athleteIds, notes } = body;

    // Server-side validation
    if (!coachId || !slotId || !Array.isArray(athleteIds) || athleteIds.length === 0) {
      return NextResponse.json(
        { error: "coachId, slotId, and at least one athlete are required" },
        { status: 400 }
      );
    }

    try {
      const session = createSession({ coachId, slotId, athleteIds, notes });
      return NextResponse.json(session);
    } catch (err: any) {
      // Catch business rule errors (slot booked, invalid selection)
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
