"use client";
import React from "react";
import { Restaurant } from "../../../generated/prisma";
import EntryDecider from "@/ui/components/EntryDecider";
import { Flex } from "@radix-ui/themes";

type DecisionComponentProps = {
  restaurants: Restaurant[];
  customEntries: string[];
  decisions: { [key: string]: boolean | undefined };
  handleEntryDecision: (
    key: string,
    value: boolean,
    opts: { restaurantId?: string; customEntry?: string }
  ) => void;
};

function DecisionComponent({
  restaurants,
  customEntries,
  decisions,
  handleEntryDecision,
}: DecisionComponentProps) {
  return (
    <Flex direction={"column"} gap={"3"}>
      {restaurants.map((r) => (
        <EntryDecider
          key={r.id}
          restaurant={r}
          // name={r.name}
          decision={decisions[r.id]}
          onPositiveChoice={() =>
            handleEntryDecision(r.id, true, { restaurantId: r.id })
          }
          onNegativeChoice={() =>
            handleEntryDecision(r.id, false, { restaurantId: r.id })
          }
        />
      ))}
      {customEntries.map((entry, idx) => {
        const restaurantFromEntry: Restaurant = {
          id: entry,
          name: entry,
          userCreated: true,
          userRating: 0,
          priceRating: "TWO",
          description: "",
          imageUrl: "",
          tags: [],
        };
        return (
          <EntryDecider
            key={entry + idx}
            // name={entry}
            restaurant={restaurantFromEntry}
            decision={decisions[entry + idx]}
            onPositiveChoice={() =>
              handleEntryDecision(entry + idx, true, { customEntry: entry })
            }
            onNegativeChoice={() =>
              handleEntryDecision(entry + idx, false, { customEntry: entry })
            }
          />
        );
      })}
    </Flex>
  );
}

export default DecisionComponent;
