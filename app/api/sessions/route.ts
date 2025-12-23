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

    // Validation: required fields
    const { coachId, slotId, athleteIds, notes } = body;
    if (!coachId || !slotId || !athleteIds?.length) {
      return NextResponse.json(
        { error: "coachId, slotId, and at least one athlete are required" },
        { status: 400 }
      );
    }

    const session = createSession({ coachId, slotId, athleteIds, notes });
    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
