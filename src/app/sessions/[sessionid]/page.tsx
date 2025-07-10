import { prisma } from "@/lib/prisma";
import { Container, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import SessionDecisionPanel from "@/ui/components/SessionDecisionPanel";
export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionid: string }>;
}) {
  const { sessionid } = await params;
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
      <Container my={{ lg: "100px" }}>
        <Flex direction={"column"} align={{ lg: "center" }} gap={"4"}>
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
