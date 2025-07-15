import { getAllRestaurants } from "@/lib/actions";
import RestaurantSelector from "@/ui/components/RestaurantSelector";
import {
  Container,
  Heading,
  Text,
  Flex,
  Section,
  Separator,
} from "@radix-ui/themes";

export default async function Home() {
  const restaurants = await getAllRestaurants();
  return (
    <main>
      <Container size={"1"} mx={"4"}>
        <Section>
          <Flex direction="column" gap="3">
            <Heading as="h1" size={"8"}>
              What&apos;s for Dinner?
            </Heading>
            <Text as="p" size={"2"}>
              This is a simple app that helps you decide what to have for
              dinner.
              <br /> You can add your favorite recipes and the app will randomly
              select one for you.
            </Text>
          </Flex>
          <Separator my={"4"} size={"4"} />
          <Flex direction="column" justify="center">
            <RestaurantSelector restaurants={restaurants} />
          </Flex>
        </Section>
      </Container>
    </main>
  );
}
