import React from "react";
import {
  Badge,
  Text,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
} from "@radix-ui/themes";
import { tomato, green } from "@radix-ui/colors";
import { Restaurant } from "../../../generated/prisma";
import { Cross2Icon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";

type EntryDeciderProps = {
  // name: string;
  restaurant: Restaurant;
  decision: boolean | undefined;
  onPositiveChoice: () => void;
  onNegativeChoice: () => void;
};

const EntryDecider: React.FC<EntryDeciderProps> = ({
  restaurant,
  decision,
  onPositiveChoice,
  onNegativeChoice,
}) => {
  const Rating = (() => {
    return (
      <Flex align={"center"} gap={"1"}>
        <StarFilledIcon height={"12px"} color="gold" />
        <Text size={"1"} color="gray">
          {restaurant.userRating}
        </Text>
      </Flex>
    );
  })();
  const priceRatingStr = (() => {
    let str = "";
    switch (restaurant.priceRating) {
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
  const cardColor =
    decision == true ? green.green12 : decision == false ? tomato.tomato12 : "";
  return (
    <Card
      style={{
        width: "100%",
        backgroundColor: cardColor,
      }}
    >
      <Flex justify={"between"}>
        <Flex direction={"column"} gap={"1"}>
          <Heading as="h3" size={"4"}>
            {restaurant.name}
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
            {restaurant.tags?.map((t, index) => (
              // <div key={index}>{t}</div>
              <Badge color="green" key={index}>
                {t}
              </Badge>
            ))}
          </Flex>
          <Flex gap={"3"}>
            <Text size={"2"} color="gray">
              {restaurant.description}
            </Text>
          </Flex>
        </Flex>
        <Flex gap={"2"} direction={"column"}>
          <Button
            radius="large"
            color={decision == true ? "gray" : "tomato"}
            onClick={onNegativeChoice}
          >
            <Cross2Icon />
          </Button>
          <Button
            radius="large"
            color={decision == false ? "gray" : "grass"}
            onClick={onPositiveChoice}
          >
            <PlusIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default EntryDecider;
