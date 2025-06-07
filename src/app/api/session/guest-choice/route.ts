import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const guestName = searchParams.get("guestName");
  if (!sessionId)
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  if (!guestName)
    return NextResponse.json({ error: "Missing guestName" }, { status: 400 });

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      users: { include: { user: true } },
      restaurants: true,
      choices: true,
    },
  });
  if (!session)
    return NextResponse.json(
      { error: "Could not find session" },
      { status: 404 }
    );

  const guestChoices = session.choices.filter((c) => c.guestName == guestName);
  return NextResponse.json(guestChoices);
}
