"use client";
import React, { useState, FormEvent } from "react";
import type { Restaurant } from "../../../generated/prisma";
import RestaurantCard from "./restaurantCard";
import {
  Button,
  Flex,
  Section,
  TextField,
  ThickChevronRightIcon,
} from "@radix-ui/themes";
import { createSessionAction } from "@/lib/actions";

interface RestaurantSelectorProps {
  restaurants: Restaurant[];
}

export default function RestaurantSelector({
  restaurants,
}: RestaurantSelectorProps) {
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>(
    []
  );
  const [removedRestaurants, setRemovedRestaurants] = useState<Restaurant[]>(
    []
  );

  const addRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurants((prev) => {
      if (prev.some((r) => r.id === restaurant.id)) return prev;
      return [...prev, restaurant];
    });
  };

  const removeRestaurant = (restaurant: Restaurant) => {
    setRemovedRestaurants((prev) => {
      if (prev.some((r) => r.id === restaurant.id)) return prev;
      return [...prev, restaurant];
    });
  };

  const handleCustomOptionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userEntry = formData.get("userEntry")?.toString();
    if (!userEntry) return;
    const userRestaurant: Restaurant = {
      id: userEntry,
      userCreated: true,
      name: userEntry,
      description: null,
      imageUrl: null,
    };
    if (selectedRestaurants.some((restaurant) => restaurant.id == userEntry)) {
      alert(`An option called ${userEntry} already exists!`);
      event.currentTarget.reset();
      return;
    }
    setSelectedRestaurants((prev) => [...prev, userRestaurant]);
    event.currentTarget.reset();
  };

  return (
    <>
      <Section>
        <Flex wrap="wrap" gap="3">
          <p>
            Let&apos;s get started by selecting a restaurant from the list
            below. You can add your own restaurants by clicking the &quot;Add
            Restaurant&quot; button.
          </p>
          {restaurants
            .filter((restaurant) => {
              return (
                !selectedRestaurants.some((r) => r.id === restaurant.id) &&
                !removedRestaurants.some((r) => r.id === restaurant.id)
              );
            })
            .slice(0, 5)
            .map((restaurant) => (
              <RestaurantCard
                {...restaurant}
                key={restaurant.id}
                // variant="horizontal"
                variant="simple"
                onAddClick={() => addRestaurant(restaurant)}
                onRemoveClick={() => removeRestaurant(restaurant)}
              />
            ))}
        </Flex>
        <form onSubmit={handleCustomOptionSubmit}>
          <p>If you want to write in your own options, you can do that here!</p>
          {/* <input type="text"></input> */}
          <TextField.Root
            placeholder="Your favorite restaurant/food"
            className="max-w-96"
            name="userEntry"
          >
            <TextField.Slot>
              <ThickChevronRightIcon />
            </TextField.Slot>
          </TextField.Root>
          <Button type="submit">Add Option</Button>
        </form>
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
              {selectedRestaurants
                .filter((r) => r.userCreated == false)
                .map((r) => (
                  <input
                    key={r.id}
                    type="hidden"
                    name="restaurantIds"
                    value={r.id}
                  />
                ))}
              {selectedRestaurants
                .filter((r) => r.userCreated == true)
                .map((r) => (
                  <input
                    key={r.id}
                    type="hidden"
                    name="userEntries"
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
    </>
  );
}
