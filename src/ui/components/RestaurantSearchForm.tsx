import React, { FormEvent } from "react";
import { Flex, TextField, Button, Text } from "@radix-ui/themes";
import { ThickChevronRightIcon } from "@radix-ui/themes";

interface RestaurantSearchFormProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomOptionSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const RestaurantSearchForm: React.FC<RestaurantSearchFormProps> = ({
  searchQuery,
  onSearchChange,
  onCustomOptionSubmit,
}) => (
  <Flex direction="column" align="center" gap="3">
    <Text>
      Start typing to search for a restaurant. If you can&apos;t find it, you
      can add it as a custom entry!
    </Text>
    <form onSubmit={onCustomOptionSubmit}>
      <Flex gap="2">
        <TextField.Root
          placeholder="Your favorite restaurant/food"
          name="userEntry"
          style={{ minWidth: "350px" }}
          value={searchQuery}
          onChange={onSearchChange}
        >
          <TextField.Slot>
            <ThickChevronRightIcon />
          </TextField.Slot>
        </TextField.Root>
        <Button type="submit">Add Option</Button>
      </Flex>
    </form>
  </Flex>
);

export default RestaurantSearchForm;
