import { prisma } from "@/lib/prisma";
import { Container, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import SessionDecisionPanel from "@/ui/components/SessionDecisionPanel";

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

  const restaurants = session.restaurants ?? null;
  const customEntries = session.customEntries ?? null;

  return (
    <main className="p-8">
      <Container my={"200px"}>
        <Flex direction={"column"} align={"center"} gap={"4"}>
          <h1>Welcome! You made it to this session.</h1>
          <SessionDecisionPanel
            restaurants={restaurants}
            customEntries={customEntries}
            sessionid={sessionid}
          />
        </Flex>
      </Container>
    </main>
  );
}
