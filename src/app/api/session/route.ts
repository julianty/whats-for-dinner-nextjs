import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type {
  SessionUser,
  Restaurant,
  SessionChoice,
} from "@/../generated/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      users: { include: { user: true } },
      restaurants: true,
      choices: true,
    },
  });

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const users = (session.users ?? []).map(
    (su: SessionUser & { user: { id: string; name: string } }) => ({
      id: su.user.id,
      name: su.user.name,
    })
  );
  const restaurants = (session.restaurants ?? []).map((r: Restaurant) => ({
    id: r.id,
    name: r.name,
  }));
  const choices = (session.choices ?? []).map((c: SessionChoice) => ({
    userId: c.userId,
    guestName: c.guestName,
    restaurantId: c.restaurantId,
    customEntry: c.customEntry,
    choice: c.choice,
  }));

  return NextResponse.json({
    sessionId: session.id,
    users,
    restaurants,
    customEntries: session.customEntries ?? [],
    choices,
  });
}
