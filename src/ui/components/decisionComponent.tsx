"use client";
import React, { FormEvent } from "react";
import { Restaurant } from "../../../generated/prisma";
import { SessionChoicePayload } from "@/types/sessionChoice";
import { Button, Flex, TextField } from "@radix-ui/themes";
import EntryDecider from "./entryDecider";
import { useRouter } from "next/navigation";

type DecisionComponentProps = {
  restaurants: Restaurant[];
  customEntries: string[];
  sessionid: string;
};

function DecisionComponent({
  restaurants,
  customEntries,
  sessionid,
}: DecisionComponentProps) {
  const [guestName, setGuestName] = React.useState<string>("");
  const [acceptingName, setAcceptingName] = React.useState<boolean>(true);
  const totalEntries = restaurants.length + customEntries.length;
  const [decisions, setDecisions] = React.useState<{
    [key: string]: boolean | undefined;
  }>({});
  const router = useRouter();

  const allDecided =
    Object.keys(decisions).length === totalEntries &&
    Object.values(decisions).every((v) => v !== undefined);

  const handleChoice = async ({
    choice,
    restaurantId = undefined,
    customEntry = undefined,
  }: {
    choice: boolean;
    restaurantId?: string | undefined;
    customEntry?: string | undefined;
  }) => {
    const payload: SessionChoicePayload = {
      sessionId: sessionid,
      userId: undefined,
      guestName: guestName,
      restaurantId,
      customEntry,
      choice,
    };
    await fetch("/api/session/session-choice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.refresh();
  };

  const handleEntryDecision = (
    key: string,
    value: boolean,
    opts: { restaurantId?: string; customEntry?: string }
  ) => {
    setDecisions((prev) => ({ ...prev, [key]: value }));
    handleChoice({ choice: value, ...opts });
  };

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName) {
      alert("Please enter a name before submitting!");
      return;
    }
    setAcceptingName(false);
  };

  return (
    <>
      {acceptingName && (
        <p>
          If you don&apos;t see the options, make sure you first enter your
          name!
        </p>
      )}
      {
        <form>
          <Flex>
            <TextField.Root
              name="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={!acceptingName}
              placeholder="enter a name!"
              required={true}
            ></TextField.Root>

            <Button type="submit" onClick={handleNameSubmit}>
              {"Lock me in"}
            </Button>
          </Flex>
        </form>
      }
      {guestName && !acceptingName && (
        <>
          {restaurants.map((r) => (
            <EntryDecider
              key={r.id}
              name={r.name}
              decided={decisions[r.id]}
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
              decided={decisions[entry + idx]}
              onPositiveChoice={() =>
                handleEntryDecision(entry + idx, true, { customEntry: entry })
              }
              onNegativeChoice={() =>
                handleEntryDecision(entry + idx, false, { customEntry: entry })
              }
            />
          ))}
          {allDecided && <div>All decisions made!</div>}
        </>
      )}
    </>
  );
}

export default DecisionComponent;
