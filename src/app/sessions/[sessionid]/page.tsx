import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface SessionPageProps {
  params: { sessionid: string };
}

export default async function SessionPage({ params }: SessionPageProps) {
  const session = await prisma.session.findUnique({
    where: { id: params.sessionid },
    include: {
      users: true,
      restaurants: true,
    },
  });

  if (!session) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session: {session.id}</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
