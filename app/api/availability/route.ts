import { NextRequest, NextResponse } from "next/server";
import { getSlotsByCoach } from "@/app/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coachId = searchParams.get("coachId");

  if (!coachId) {
    return NextResponse.json({ error: "coachId is required" }, { status: 400 });
  }

  const slots = getSlotsByCoach(coachId);
  return NextResponse.json(slots);
}
