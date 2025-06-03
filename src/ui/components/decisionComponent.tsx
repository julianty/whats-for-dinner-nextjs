"use client";
import React from "react";
import { Restaurant } from "../../../generated/prisma";
import EntryDecider from "./entryDecider";

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
    <>
      {restaurants.map((r) => (
        <EntryDecider
          key={r.id}
          name={r.name}
          decision={decisions[r.id]}
          onPositiveChoice={() =>
            handleEntryDecision(r.id, true, { restaurantId: r.id })
          }
          onNegativeChoice={() =>
            handleEntryDecision(r.id, false, { restaurantId: r.id })
          }
        />
      ))}
      {customEntries.map((entry, idx) => (
        <EntryDecider
          key={entry + idx}
          name={entry}
          decision={decisions[entry + idx]}
          onPositiveChoice={() =>
            handleEntryDecision(entry + idx, true, { customEntry: entry })
          }
          onNegativeChoice={() =>
            handleEntryDecision(entry + idx, false, { customEntry: entry })
          }
        />
      ))}
    </>
  );
}

export default DecisionComponent;
