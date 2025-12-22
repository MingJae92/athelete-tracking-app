import { NextRequest, NextResponse } from "next/server";
import { getCoaches } from "@/app/lib/store";

export async function GET(req: NextRequest) {
  return NextResponse.json(getCoaches());
}
