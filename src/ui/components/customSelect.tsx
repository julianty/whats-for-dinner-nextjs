import React from "react";
import { Select } from "@radix-ui/themes";
import RestaurantCard from "./restaurantCard";
function CustomSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select an item" />
      <Select.Content position="popper">
        <Select.Item value="1" textValue="In-N-Out Burger" className="!h-auto">
          <RestaurantCard />
        </Select.Item>
        {/* <Select.Item value="2">Item 2</Select.Item> */}
      </Select.Content>
    </Select.Root>
  );
}

export default CustomSelect;
