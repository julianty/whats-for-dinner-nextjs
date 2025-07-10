"use client";
import React from "react";
import DecisionComponent from "./DecisionComponent";
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
  Section,
  Code,
} from "@radix-ui/themes";
import { Restaurant } from "../../../generated/prisma";
import "./styles.css";
import CopyLinkButton from "./CopyLinkButton";
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
  const [fullUrl, setFullUrl] = React.useState("");
  // Check if userName exists in localStorage
  React.useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) setGuestName(userName);
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

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

  // Define the type for guest choices returned by the API
  interface GuestChoice {
    restaurantId?: string;
    customEntry?: string;
    choice: boolean;
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) {
      alert("Please enter a name before submitting!");
      return;
    }
    setAcceptingName(false);
    // Fetch guest choices for this session and guestName
    const res = await fetch(
      `/api/session/guest-choice?sessionId=${encodeURIComponent(
        sessionid
      )}&guestName=${encodeURIComponent(guestName)}`
    );
    if (res.ok) {
      const guestChoices: GuestChoice[] = await res.json();
      // Map guestChoices to { [key]: boolean } where key is restaurantId or customEntry
      const mapped: { [key: string]: boolean } = {};
      (guestChoices || []).forEach((c) => {
        const key = c.restaurantId || c.customEntry;
        if (key) mapped[key] = c.choice;
      });
      setDecisions(mapped);
    }
  };

  return (
    <>
      {acceptingName && (
        <>
          <Text size={"6"}>Welcome to this session!</Text>
          <Text>
            First off, before we start making decisions, let&apos;s confirm your
            name!
          </Text>
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
        <Section className="flex flex-col gap-4">
          <Text size={"6"}>
            Welcome, <Code>{guestName}</Code>!
          </Text>
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
        </Section>
      )}
      <Text>
        Use this button
        <CopyLinkButton link={fullUrl} />
        to copy the link and share it with whomever is helping you decide!
      </Text>

      <Accordion type="single" collapsible style={{ marginTop: "40px" }}>
        <AccordionItem value="1" disabled={!allDecided}>
          <AccordionHeader>
            <AccordionTrigger asChild className="AccordionTrigger">
              <Button variant="ghost" disabled={!allDecided}>
                Show Results
                <ChevronDownIcon className="AccordionChevron" aria-hidden />
              </Button>
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
