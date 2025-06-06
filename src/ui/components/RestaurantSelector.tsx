"use client";
import React, { useState, FormEvent } from "react";
import { PriceRating, type Restaurant } from "../../../generated/prisma";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";

import RestaurantSearchForm from "./RestaurantSearchForm";
import RestaurantList from "./RestaurantList";
import SelectedRestaurants from "./SelectedRestaurants";
import CreateSessionForm from "./CreateSessionForm";

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
      priceRating: PriceRating.TWO,
      userRating: -1,
      tags: [],
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
        <RestaurantSearchForm
          searchQuery={searchQuery}
          onSearchChange={handleRestaurantEntryChange}
          onCustomOptionSubmit={handleCustomOptionSubmit}
        />
        <RestaurantList
          restaurants={restaurants}
          selectedRestaurants={selectedRestaurants}
          removedRestaurants={removedRestaurants}
          searchQuery={searchQuery}
          onAdd={addRestaurant}
          onRemove={removeRestaurant}
        />
      </Flex>
      <Separator my={"4"} size={"4"} />
      {selectedRestaurants.length > 0 && (
        <SelectedRestaurants
          selectedRestaurants={selectedRestaurants}
          onRemove={handleRemoveFromSelected}
        />
      )}
      {selectedRestaurants.length > 0 && (
        <CreateSessionForm
          selectedRestaurants={selectedRestaurants}
          onUserNameChange={handleUserNameChange}
        />
      )}
    </Box>
  );
}
