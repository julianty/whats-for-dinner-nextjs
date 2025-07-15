import React from "react";
import type { Restaurant } from "../../../generated/prisma";
import { Box, Button, Card, Flex, Strong, Text } from "@radix-ui/themes";
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
    <Flex direction={"column"} gap="3">
      <Text>Here&apos;s what you&apos;ve selected so far.</Text>
      <ul>
        <Flex align={"center"} gap={"1"} direction={"column"}>
          {selectedRestaurants.map((r) => (
            <SimpleCard
              key={r.id}
              heading={r.name}
              onRemove={() => onRemove(r.id)}
            />
          ))}
        </Flex>
      </ul>
    </Flex>
  </Box>
);

const SimpleCard = ({
  heading,
  onRemove,
}: {
  heading: string;
  onRemove: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Box width={"100%"}>
      <Card>
        <Flex justify={"between"} align={"center"}>
          <Text>
            <Strong>{heading}</Strong>
          </Text>
          <Button size={"2"} color="tomato" onClick={onRemove}>
            remove <Cross2Icon />
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default SelectedRestaurants;
