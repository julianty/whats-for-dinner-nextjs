"use client";

import React, { useState } from "react";
import type { Restaurant } from "../../generated/prisma";
import RestaurantCard from "@/ui/components/restaurantCard";
import { Button, Container, Flex, Section } from "@radix-ui/themes";
import { restaurantMockData } from "@/data/mockData";
import { createSessionAction } from "@/lib/actions";

export default function Home() {
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>(
    []
  );

  const addRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurants((prev) => {
      if (prev.some((r) => r.id === restaurant.id)) return prev;
      return [...prev, restaurant];
    });
  };

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
          <Flex wrap="wrap" gap="3">
            <p>
              Let&apos;s get started by selecting a restaurant from the list
              below. You can add your own restaurants by clicking the &quot;Add
              Restaurant&quot; button.
            </p>
            {restaurantMockData
              .filter(
                (restaurant) =>
                  !selectedRestaurants.some((r) => r.id === restaurant.id)
              )
              .map((restaurant) => (
                <RestaurantCard
                  {...restaurant}
                  key={restaurant.id}
                  onImageClick={() => addRestaurant(restaurant)}
                />
              ))}
          </Flex>
          <Button>Add Option</Button>
        </Section>
        {/* Debug output */}
        <Section>
          <div className="bg-[#222] text-white p-3 rounded mt-4">
            <strong>Selected Restaurants (debug):</strong>
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(selectedRestaurants, null, 2)}
            </pre>
            {selectedRestaurants.length > 0 && (
              <form action={createSessionAction}>
                {selectedRestaurants.map((r) => (
                  <input
                    key={r.id}
                    type="hidden"
                    name="restaurantIds"
                    value={r.id}
                  />
                ))}
                <Button type="submit" className="mt-4">
                  Create Session
                </Button>
              </form>
            )}
          </div>
        </Section>
      </Container>
    </main>
  );
}
