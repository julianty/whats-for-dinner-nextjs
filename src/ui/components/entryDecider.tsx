import React from "react";
import { Button, Flex } from "@radix-ui/themes";

interface EntryDeciderProps {
  name: string;
  decided: boolean | undefined;
  onPositiveChoice: () => void;
  onNegativeChoice: () => void;
}

const EntryDecider: React.FC<EntryDeciderProps> = ({
  name,
  decided,
  onPositiveChoice,
  onNegativeChoice,
}) => {
  return (
    <Flex align="center" gap="2">
      <div>{name}</div>

      <>
        <Button
          color={decided == false ? "gray" : "green"}
          onClick={onPositiveChoice}
        >
          Yes
        </Button>
        <Button
          color={decided == true ? "gray" : "red"}
          onClick={onNegativeChoice}
        >
          No
        </Button>
      </>
    </Flex>
  );
};

export default EntryDecider;
