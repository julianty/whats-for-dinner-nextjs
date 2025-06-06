"use client";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Badge,
  Separator,
} from "@radix-ui/themes";
import { type Restaurant } from "../../../generated/prisma";
// import Image from "next/image";
import React from "react";
import { Cross2Icon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";

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
      <Card style={{ minWidth: "500px" }}>
        <Flex justify={"between"}>
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
          <Flex gap={"2"} direction={"column"}>
            <Button radius="large" color="tomato" onClick={onRemoveClick}>
              <Cross2Icon />
              del
            </Button>
            <Button radius="large" color="grass" onClick={onAddClick}>
              <PlusIcon />
              add
            </Button>
          </Flex>
        </Flex>
      </Card>
    );
  }
}

export default RestaurantCard;
