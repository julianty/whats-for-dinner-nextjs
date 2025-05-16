"use client";

import RestaurantCard from "@/ui/components/restaurantCard";
import { Button, Container, Flex, Section } from "@radix-ui/themes";
import { restaurantMockData } from "@/data/mockData";
export default function Home() {
  return (
    <main>
      <Container size="2">
        <Section>
          <Flex direction={"column"} gap={"3"}>
            <h1 className="text-4xl">Welcome to What&apos;s for Dinner!</h1>
            <p>
              This is a simple app that helps you decide what to have for
              dinner. You can add your favorite recipes and the app will
              randomly select one for you.
            </p>
          </Flex>
        </Section>
        <Section>
          <Flex wrap="wrap" gap={"3"}>
            <p>
              Let&apos;s get started by selecting a restaurant from the list
              below. You can add your own restaurants by clicking the &quot;Add
              Restaurant&quot; button.
            </p>
            {restaurantMockData.map((restaurant) => {
              return <RestaurantCard {...restaurant} key={restaurant.id} />;
            })}
            <Button>Add Option</Button>
          </Flex>
        </Section>
      </Container>
    </main>
  );
}
