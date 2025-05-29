import { prisma } from "@/lib/prisma";
import { Container, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface SessionPageProps {
  params: { sessionid: string };
}
export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionid } = params;
  const session = await prisma.session.findUnique({
    where: { id: sessionid },
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
      <Container>
        <Flex direction={"column"} align={"center"}>
          <h1 className="text-4xl m-4">What&apos;s for Dinner?</h1>
          <p>
            You&apos;ve just been invited to help make a decision on dinner
            plans
          </p>
          <p>Please see the options that were selected below</p>
        </Flex>
      </Container>
      <h1 className="text-2xl font-bold mb-4">Session: {session.id}</h1>
      <pre className="p-4 rounded overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
