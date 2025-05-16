import { Box, Button, Card, Flex } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

type RestaurantData = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

function RestaurantCard({ name, description, imageUrl }: RestaurantData) {
  return (
    <Box width={"200px"}>
      <Card size={"2"}>
        <Flex direction="column" gap={"4"}>
          <Image src={imageUrl} alt="In-N-Out" width={150} height={150} />
          <Box>
            <h3 className="text-lg font-bold">{name}</h3>
            <p>{description}</p>
            <Button variant="ghost">Click to add!</Button>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}

export default RestaurantCard;
