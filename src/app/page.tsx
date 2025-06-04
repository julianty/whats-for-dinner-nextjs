import { getAllRestaurants } from "@/lib/actions";
import RestaurantSelector from "@/ui/components/RestaurantSelector";
import { Container, Heading, Text, Flex, Section } from "@radix-ui/themes";

export default async function Home() {
  const restaurants = await getAllRestaurants();
  return (
    <main>
      <Container size="2">
        <Section>
          <Flex direction="column" gap="3">
            <Heading className="text-4xl">
              Welcome to What&apos;s for Dinner!
            </Heading>
            <Text>
              This is a simple app that helps you decide what to have for
              dinner.
              <br /> You can add your favorite recipes and the app will randomly
              select one for you.
            </Text>
          </Flex>
          <Flex direction="column" justify="center">
            <RestaurantSelector restaurants={restaurants} />
          </Flex>
        </Section>
      </Container>
    </main>
  );
}
