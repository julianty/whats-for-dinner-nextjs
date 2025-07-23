"use client";
import {
  Card,
  Flex,
  Heading,
  Text,
  Badge,
  Separator,
  Box,
  IconButton,
} from "@radix-ui/themes";
import { type Restaurant } from "../../../generated/prisma";
// import Image from "next/image";
import React from "react";
import { CheckIcon, Cross2Icon, StarFilledIcon } from "@radix-ui/react-icons";

type RestaurantCardProps = Restaurant & {
  onAddClick: () => void;
  onRemoveClick: () => void;
  variant: "vertical" | "horizontal" | "default" | "simple";
};

function RestaurantCard({
  name,
  tags,
  description,
  // imageUrl,
  priceRating,
  userRating,
  onAddClick,
  onRemoveClick,
  variant = "horizontal",
}: RestaurantCardProps) {
  const Rating = (() => {
    return (
      <Flex align={"center"} gap={"1"}>
        <StarFilledIcon height={"12px"} color="gold" />
        <Text size={"1"} color="gray">
          {userRating}
        </Text>
      </Flex>
    );
  })();
  const priceRatingStr = (() => {
    let str = "";
    switch (priceRating) {
      case "ONE":
        str = "$";
        break;
      case "TWO":
        str = "$$";
        break;
      case "THREE":
        str = "$$$";
        break;
    }
    return str;
  })();
  if (variant == "simple") {
    return (
      <Box width={"100%"}>
        <Card size={"2"} style={{ width: "100%" }}>
          <Flex justify={"between"} gap={"2"}>
            <Flex direction={"column"} gap={"1"}>
              <Heading as="h3" size={"4"}>
                {name}
              </Heading>
              <Flex gap={"4"} align={"center"}>
                {Rating}
                <Separator orientation={"vertical"} />
                {
                  <Text size={"1"} color="amber">
                    {priceRatingStr}
                  </Text>
                }
                <Separator orientation={"vertical"} />
                {tags?.map((t, index) => (
                  // <div key={index}>{t}</div>
                  <Badge color="green" key={index}>
                    {t}
                  </Badge>
                ))}
              </Flex>
              <Flex gap={"3"}>
                <Text size={"2"} color="gray">
                  {description}
                </Text>
              </Flex>
            </Flex>
            <Flex justify={"between"} gap={"2"} direction={"column"}>
              <IconButton color="red" onClick={onRemoveClick}>
                <Cross2Icon />
              </IconButton>
              <IconButton color="green" onClick={onAddClick}>
                <CheckIcon />
              </IconButton>
              {/* <Button radius="large" color="tomato" onClick={onRemoveClick}>
                Hide <Cross2Icon />
              </Button>
              <Button radius="large" color="grass" onClick={onAddClick}>
                Add <PlusIcon />
              </Button> */}
            </Flex>
          </Flex>
        </Card>
      </Box>
    );
  }
}

export default RestaurantCard;
