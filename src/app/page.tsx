import { getAllRestaurants } from "@/lib/actions";
import RestaurantSelector from "@/ui/components/RestaurantSelector";
import { Container, Flex, Section } from "@radix-ui/themes";

export default async function Home() {
  const restaurants = await getAllRestaurants();
  return (
    <main>
      <Container size="2">
        <Section>
          <Flex direction="column" gap="3">
            <h1 className="text-4xl">Welcome to What&apos;s for Dinner!</h1>
            <p>
              This is a simple app that helps you decide what to have for
              dinner. You can add your favorite recipes and the app will
              randomly select one for you.
            </p>
          </Flex>
        </Section>
        <Section>
          <Flex direction="column" justify="center">
            <RestaurantSelector restaurants={restaurants} />
          </Flex>
        </Section>
      </Container>
    </main>
  );
}
