"use client";
import React from "react";
import DecisionComponent from "./decisionComponent";
import SessionChoicesTable from "./SessionChoicesTable";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import {
  Button,
  Text,
  ChevronDownIcon,
  Flex,
  TextField,
} from "@radix-ui/themes";
import { Restaurant } from "../../../generated/prisma";
import "./styles.css";
interface SessionDecisionPanelProps {
  restaurants: Restaurant[];
  customEntries: string[];
  sessionid: string;
}

const SessionDecisionPanel: React.FC<SessionDecisionPanelProps> = ({
  restaurants,
  customEntries,
  sessionid,
}) => {
  const [decisions, setDecisions] = React.useState<{
    [key: string]: boolean | undefined;
  }>({});
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [guestName, setGuestName] = React.useState<string>("");
  const [acceptingName, setAcceptingName] = React.useState<boolean>(true);

  // Calculate if all decisions have been made
  const totalEntries =
    (restaurants?.length || 0) + (customEntries?.length || 0);
  const allDecided =
    Object.keys(decisions).length === totalEntries &&
    Object.values(decisions).every((v) => v !== undefined);

  // Handle a choice and trigger table refresh
  const handleChoice = async ({
    choice,
    restaurantId = undefined,
    customEntry = undefined,
  }: {
    choice: boolean;
    restaurantId?: string | undefined;
    customEntry?: string | undefined;
  }) => {
    const payload = {
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
    setRefreshKey((k) => k + 1);
  };

  const handleEntryDecision = (
    key: string,
    value: boolean,
    opts: { restaurantId?: string; customEntry?: string }
  ) => {
    setDecisions((prev) => ({ ...prev, [key]: value }));
    handleChoice({ choice: value, ...opts });
  };

  const handleNameSubmit = (e: React.FormEvent) => {
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
        <>
          <p>
            First off, before we start making decisions, let&apos;s get you a
            name!
          </p>
          <form onSubmit={handleNameSubmit}>
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
              <Button type="submit">{"Lock me in"}</Button>
            </Flex>
          </form>
        </>
      )}
      {guestName && !acceptingName && (
        <section className="flex flex-col gap-4">
          <Text>
            Look over the options and make some decisions. <br /> The results
            will be visible when you finish!
          </Text>
          <DecisionComponent
            restaurants={restaurants}
            customEntries={customEntries}
            decisions={decisions}
            handleEntryDecision={handleEntryDecision}
          />
        </section>
      )}
      <Accordion type="single" collapsible style={{ marginTop: "40px" }}>
        <AccordionItem value="1" disabled={!allDecided}>
          <AccordionHeader>
            <AccordionTrigger className="AccordionTrigger">
              <Flex align={"center"} gap={"4"}>
                <Button variant="ghost" disabled={!allDecided}>
                  Show Results
                  <ChevronDownIcon className="AccordionChevron" aria-hidden />
                </Button>
              </Flex>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <SessionChoicesTable
              sessionId={sessionid}
              refreshKey={refreshKey}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SessionDecisionPanel;
