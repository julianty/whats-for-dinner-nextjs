import { MixerVerticalIcon, StarFilledIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  RadioCards,
  Slider,
  Switch,
  Text,
} from "@radix-ui/themes";
import React from "react";
// import * from '@radix-ui/themes/dialog'

interface RestaurantFilterMenuProps {
  vegetarianOnly: boolean;
  setVegetarianOnly: (v: boolean) => void;
  priceFilter: "ALL" | "ONE" | "TWO" | "THREE";
  setPriceFilter: (v: "ALL" | "ONE" | "TWO" | "THREE") => void;
  minRating: number;
  setMinRating: (v: number) => void;
}

function RestaurantFilterMenu({
  vegetarianOnly,
  setVegetarianOnly,
  priceFilter,
  setPriceFilter,
  minRating,
  setMinRating,
}: RestaurantFilterMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">
          <MixerVerticalIcon />
          Filters
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Filters</Dialog.Title>
        <Dialog.Description hidden>
          Set filters for suggested restaurants
        </Dialog.Description>
        <Flex direction="column" gap={"4"} my={"2"}>
          <Flex gap={"2"} align={"center"}>
            <Switch
              checked={vegetarianOnly}
              onCheckedChange={setVegetarianOnly}
              color="green"
            />
            <Flex align={"center"} gap={"1"}>
              <Badge color="green">VEGETARIAN</Badge>
              <Text> only</Text>
            </Flex>
          </Flex>
          <Box>
            <Text>Price Filters:</Text>
            <RadioCards.Root value={priceFilter} onValueChange={setPriceFilter}>
              <Flex gap={"1"}>
                <RadioCards.Item style={{ flex: 1 }} value="ALL">
                  any
                </RadioCards.Item>
                <RadioCards.Item style={{ flex: 1 }} value="ONE">
                  $
                </RadioCards.Item>
                <RadioCards.Item style={{ flex: 1 }} value="TWO">
                  $$
                </RadioCards.Item>
                <RadioCards.Item style={{ flex: 1 }} value="THREE">
                  $$$
                </RadioCards.Item>
              </Flex>
            </RadioCards.Root>
          </Box>
          <Flex direction={"column"}>
            <Flex gap={"1"}>
              Min Rating:
              <Flex align={"center"}>
                <StarFilledIcon height={"12px"} color="gold" />
                {minRating}
              </Flex>
            </Flex>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[minRating]}
              onValueChange={([v]) => setMinRating(v)}
              style={{ width: 160 }}
            />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default RestaurantFilterMenu;
