// import { NextResponse } from "next/server";
// import { getCoaches } from "@/app/lib/store";

// export async function GET({ params }: { params: { id: string } }) {
//   // Convert coach ID to string to match params.id
//   const coach = getCoaches().find(c => c.id.toString() === params.id);

//   if (!coach) {
//     return NextResponse.json({ error: "Coach not found" }, { status: 404 });
//   }

//   return NextResponse.json(coach);
// }
