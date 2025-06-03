import React from "react";
import { Button, Flex } from "@radix-ui/themes";

interface EntryDeciderProps {
  name: string;
  decision: boolean | undefined;
  onPositiveChoice: () => void;
  onNegativeChoice: () => void;
}

const EntryDecider: React.FC<EntryDeciderProps> = ({
  name,
  decision,
  onPositiveChoice,
  onNegativeChoice,
}) => {
  return (
    <Flex align="center" gap="4" justify={"between"}>
      <div>{name}</div>
      <Flex gap={"1"}>
        <Button
          color={decision == false ? "gray" : "green"}
          onClick={onPositiveChoice}
        >
          Yes
        </Button>
        <Button
          color={decision == true ? "gray" : "red"}
          onClick={onNegativeChoice}
        >
          No
        </Button>
      </Flex>
    </Flex>
  );
};

export default EntryDecider;
