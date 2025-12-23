import { NextRequest, NextResponse } from "next/server";
import { getSessions, createSession } from "@/app/lib/store";

// GET /api/sessions
export async function GET() {
  try {
    const sessions = await getSessions(); // ensure it's awaited if async
    return NextResponse.json(sessions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/sessions
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await createSession(body); // ensure createSession is async if needed
    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
