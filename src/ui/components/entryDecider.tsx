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
    <Flex align="center" gap="2">
      <div>{name}</div>
      <>
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
      </>
    </Flex>
  );
};

export default EntryDecider;
