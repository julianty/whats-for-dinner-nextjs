"use client";

import React from "react";
import { Button, Text } from "@radix-ui/themes";

function SessionRandomizer({
  choices,
}: {
  choices: { [key: string]: string };
}) {
  const [choice, setChoice] = React.useState<string | undefined>();
  const handleClick = () => {
    const values = Object.values(choices);
    if (values.length > 0) {
      const randomValue = values[Math.floor(Math.random() * values.length)];
      setChoice(randomValue);
    }
  };
  return (
    <>
      <Text>
        Looks like you have {Object.values(choices).length} choices: <br />
      </Text>
      <ul>
        {Object.entries(choices).map(([key, label]) => {
          return <li key={key}>{label}</li>;
        })}
      </ul>
      <Button onClick={handleClick}>Choose one at random!</Button>
      <Text className={choice == undefined ? "hidden" : ""}>{choice}</Text>
    </>
  );
}

export default SessionRandomizer;
