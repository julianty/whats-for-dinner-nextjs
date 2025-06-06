import React from "react";
import type { Restaurant } from "../../../generated/prisma";
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

interface SelectedRestaurantsProps {
  selectedRestaurants: Restaurant[];
  onRemove: (id: string) => void;
}

const SelectedRestaurants: React.FC<SelectedRestaurantsProps> = ({
  selectedRestaurants,
  onRemove,
}) => (
  <Box my={"4"}>
    <Text>
      Here&apos;s what you&apos;ve selected so far. <br /> If it looks good, you
      can hit the start session button to start!
    </Text>
    <ul>
      {selectedRestaurants.map((r) => (
        <Flex key={r.id} align={"center"} gap={"3"}>
          <IconButton
            variant="ghost"
            color="red"
            onClick={() => onRemove(r.id)}
          >
            <Cross2Icon />
          </IconButton>
          <li>{r.name}</li>
        </Flex>
      ))}
    </ul>
  </Box>
);

export default SelectedRestaurants;
