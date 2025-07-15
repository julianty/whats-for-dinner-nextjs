import React from "react";
import type { Restaurant } from "../../../generated/prisma";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
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
    <Text>Here&apos;s what you&apos;ve selected so far.</Text>
    <ul>
      {selectedRestaurants.map((r) => (
        <Flex key={r.id} align={"center"} gap={"3"}>
          <SimpleCard heading={r.name} onRemove={() => onRemove(r.id)} />
        </Flex>
      ))}
    </ul>
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
          <Heading as={"h3"} size="4">
            {heading}
          </Heading>
          <Button size={"2"} color="tomato" onClick={onRemove}>
            remove <Cross2Icon />
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default SelectedRestaurants;
