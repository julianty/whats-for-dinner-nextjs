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
  <Flex width={"100%"} direction="column" gap="3">
    <Text size={"2"}>Start typing to search for a restaurant!</Text>
    <form style={{ width: "100%" }} onSubmit={onCustomOptionSubmit}>
      <Flex gap="2">
        <TextField.Root
          placeholder="Search or add a custom entry"
          name="userEntry"
          // style={{ minWidth: "200px" }}
          style={{ width: "100%" }}
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
