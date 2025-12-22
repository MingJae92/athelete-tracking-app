import { NextRequest, NextResponse } from "next/server";
import { getAthletes } from "@/app/lib/store";

export async function GET(req: NextRequest) {
  return NextResponse.json(getAthletes());
}
