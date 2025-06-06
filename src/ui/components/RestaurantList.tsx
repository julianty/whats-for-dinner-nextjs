import React from "react";
import type { Restaurant } from "../../../generated/prisma";
import RestaurantCard from "./RestaurantCard";

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
  return (
    <>
      {restaurants
        .filter(
          (restaurant) =>
            !selectedRestaurants.some((r) => r.id === restaurant.id) &&
            !removedRestaurants.some((r) => r.id === restaurant.id)
        )
        .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
        .map((restaurant) => (
          <RestaurantCard
            {...restaurant}
            key={restaurant.id}
            variant="simple"
            onAddClick={() => onAdd(restaurant)}
            onRemoveClick={() => onRemove(restaurant)}
          />
        ))}
    </>
  );
};

export default RestaurantList;
