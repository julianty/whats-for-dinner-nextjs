"use client";
import React, { useState, FormEvent } from "react";
import type { Restaurant } from "../../../generated/prisma";
import RestaurantCard from "./restaurantCard";
import {
  Box,
  Button,
  Flex,
  Text,
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

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value;
    // Save user name for retrieval on redirect
    localStorage.setItem("userName", userName);
  };

  return (
    <>
      <Text my={"4"}>
        Let&apos;s get started by selecting a restaurant from the list below.
        You can add your own restaurants by clicking the &quot;Add
        Restaurant&quot; button.
      </Text>
      <Flex
        gap="3"
        direction={"column"}
        justify={"center"}
        maxWidth={"500px"}
        my={"8"}
      >
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
        <Text>
          If you want to write in your own options, you can do that here!
        </Text>
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
      {selectedRestaurants.length > 0 && (
        <Box my={"4"}>
          <Text>
            Here&apos;s what you&apos;ve selected so far, if it looks good, you
            can hit the start session button to start!
          </Text>
          <ul>
            {selectedRestaurants.map((r) => (
              <li key={r.id}>{r.name}</li>
            ))}
          </ul>
        </Box>
      )}
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
              <input key={r.id} type="hidden" name="userEntries" value={r.id} />
            ))}
          <Flex>
            <TextField.Root
              placeholder="Enter your name"
              name="userName"
              onChange={handleUserNameChange}
              required
            >
              <TextField.Slot>{""}</TextField.Slot>
            </TextField.Root>
            <Button type="submit" className="mt-4">
              Create Session
            </Button>
          </Flex>
        </form>
      )}
    </>
  );
}
