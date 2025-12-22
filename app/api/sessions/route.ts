import { NextRequest, NextResponse } from "next/server";
import { getSessions, createSession } from "@/app/lib/store";

export async function GET() {
  return NextResponse.json(getSessions());
}   

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = createSession(body);
    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
