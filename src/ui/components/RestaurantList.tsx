import React from "react";
import type { Restaurant } from "../../../generated/prisma";
import RestaurantCard from "./RestaurantCard";
import { Flex } from "@radix-ui/themes";
import RestaurantFilterMenu from "./RestaurantFilterMenu";

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurants: Restaurant[];
  removedRestaurants: Restaurant[];
  searchQuery: string;
  onAdd: (restaurant: Restaurant) => void;
  onRemove: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  selectedRestaurants,
  removedRestaurants,
  searchQuery,
  onAdd,
  onRemove,
}) => {
  // Filter states
  const [vegetarianOnly, setVegetarianOnly] = React.useState(false);
  const [priceFilter, setPriceFilter] = React.useState<
    "ALL" | "ONE" | "TWO" | "THREE"
  >("ALL");
  const [minRating, setMinRating] = React.useState(1);

  // Filter Restaurants
  const filteredRestaurants = restaurants
    .filter(
      (restaurant) =>
        !selectedRestaurants.some((r) => r.id === restaurant.id) &&
        !removedRestaurants.some((r) => r.id === restaurant.id)
    )
    .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(
      (r) =>
        !vegetarianOnly ||
        r.tags.some((tag) => tag === "VEGAN" || tag === "VEGETARIAN")
    )
    .filter((r) => priceFilter === "ALL" || r.priceRating === priceFilter)
    .filter((r) => r.userRating >= minRating);
  return (
    <Flex direction={"column"} gap={"2"}>
      <RestaurantFilterMenu
        vegetarianOnly={vegetarianOnly}
        setVegetarianOnly={setVegetarianOnly}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        minRating={minRating}
        setMinRating={setMinRating}
      />

      <Flex
        direction={"column"}
        gap={"2"}
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            {...restaurant}
            key={restaurant.id}
            variant="simple"
            onAddClick={() => onAdd(restaurant)}
            onRemoveClick={() => onRemove(restaurant)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default RestaurantList;
