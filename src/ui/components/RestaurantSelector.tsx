"use client";
import React, { useState, FormEvent } from "react";
import type { Restaurant } from "../../../generated/prisma";
import RestaurantCard from "./restaurantCard";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Separator,
  Text,
  TextField,
  ThickChevronRightIcon,
} from "@radix-ui/themes";
import { createSessionAction } from "@/lib/actions";
import { Cross2Icon } from "@radix-ui/react-icons";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleRemoveFromSelected = (id: string) => {
    setSelectedRestaurants((prev) => prev.filter((r) => r.id != id));
  };

  const handleRestaurantEntryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box>
      <Text>
        Let&apos;s get started by selecting a restaurant from the list below.
        You can add your own restaurants by clicking the &quot;Add
        Restaurant&quot; button.
      </Text>
      <Separator my={"4"} size={"4"} />
      <Flex gap="3" direction={"column"} align={"center"}>
        <Flex direction={"column"} align={"center"} gap={"3"}>
          <Text>
            Start typing to search for a restaurant. If you can&apos;t find it,
            you can add it as a custom entry!
          </Text>
          <form onSubmit={handleCustomOptionSubmit}>
            <Flex gap="2">
              <TextField.Root
                placeholder="Your favorite restaurant/food"
                name="userEntry"
                style={{ minWidth: "350px" }}
                onChange={handleRestaurantEntryChange}
              >
                <TextField.Slot>
                  <ThickChevronRightIcon />
                </TextField.Slot>
              </TextField.Root>
              <Button type="submit">Add Option</Button>
            </Flex>
          </form>
        </Flex>
        {restaurants
          .filter((restaurant) => {
            return (
              !selectedRestaurants.some((r) => r.id === restaurant.id) &&
              !removedRestaurants.some((r) => r.id === restaurant.id)
            );
          })
          .filter((r) =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5)
          .map((restaurant) => (
            <RestaurantCard
              {...restaurant}
              key={restaurant.id}
              variant="simple"
              onAddClick={() => addRestaurant(restaurant)}
              onRemoveClick={() => removeRestaurant(restaurant)}
            />
          ))}
      </Flex>
      <Separator my={"4"} size={"4"} />
      {selectedRestaurants.length > 0 && (
        <Box my={"4"}>
          <Text>
            Here&apos;s what you&apos;ve selected so far. <br /> If it looks
            good, you can hit the start session button to start!
          </Text>
          <ul>
            {selectedRestaurants.map((r) => (
              <Flex key={r.id} align={"center"} gap={"3"}>
                <IconButton
                  variant="ghost"
                  color="red"
                  onClick={() => handleRemoveFromSelected(r.id)}
                >
                  <Cross2Icon />
                </IconButton>
                <li>{r.name}</li>
              </Flex>
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
    </Box>
  );
}
