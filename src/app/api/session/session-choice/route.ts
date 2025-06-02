import { upsertSessionChoice } from "@/lib/actions";
import { SessionChoicePayload } from "@/types/sessionChoice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data: SessionChoicePayload = await request.json();
  upsertSessionChoice(data);
  return NextResponse.json({ success: true });
}
