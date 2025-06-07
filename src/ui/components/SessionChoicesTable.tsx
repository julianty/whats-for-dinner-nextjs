"use client";
import React from "react";
import { Table } from "@radix-ui/themes";
import { green } from "@radix-ui/colors";
interface SessionChoicesTableProps {
  sessionId: string;
  refreshKey?: number;
}

interface ApiSession {
  sessionId: string;
  users: Array<{ id: string; name: string }>;
  restaurants: Array<{ id: string; name: string }>;
  customEntries: string[];
  choices: Array<{
    userId?: string;
    guestName?: string;
    restaurantId?: string;
    customEntry?: string;
    choice: boolean;
  }>;
}

const SessionChoicesTable: React.FC<SessionChoicesTableProps> = ({
  sessionId,
  refreshKey,
}) => {
  const [session, setSession] = React.useState<ApiSession | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setError(null);
    fetch(`/api/session?sessionId=${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch session data");
        return res.json();
      })
      .then((data: ApiSession) => {
        setLoading(false);
        setSession(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [sessionId, refreshKey]);
  if (loading) return <div>Loading results...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!session) return <div>Session not found</div>;

  const users = session.users;
  const guestNames: string[] = Array.from(
    new Set(session.choices.map((c) => c.guestName).filter(Boolean) as string[])
  );
  const columns: string[] = [...users.map((u) => u.name), ...guestNames, "&"];

  const restaurantRows = session.restaurants.map((r) => ({
    key: r.id,
    label: r.name,
    isCustom: false,
  }));
  const customRows = (session.customEntries || []).map((entry: string) => ({
    key: entry,
    label: entry,
    isCustom: true,
  }));
  const rows = [...restaurantRows, ...customRows];

  // Build a lookup for choices: rowKey x colKey => choice
  const choiceMap = new Map<string, boolean>();
  for (const c of session.choices) {
    const rowKey = c.restaurantId || c.customEntry;
    const colKey = c.userId || c.guestName;
    if (rowKey && colKey) {
      choiceMap.set(rowKey + "::" + colKey, c.choice);
    }
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Entry</Table.ColumnHeaderCell>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col}>{col}</Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => {
          // Get the values for the first two columns (excluding "&")
          const colKeys = columns.slice(0, -1); // all except "&"
          const values = colKeys.map((col) =>
            choiceMap.get(row.key + "::" + col)
          );

          // Compute the AND for the first two columns (adjust if you want more)
          let andValue: boolean | undefined = undefined;
          if (values.length >= 2) {
            if (values[0] !== undefined && values[1] !== undefined) {
              andValue = Boolean(values[0] && values[1]);
            }
          }

          return (
            <Table.Row
              key={row.key}
              style={{ backgroundColor: andValue ? green.green12 : "" }}
            >
              <Table.RowHeaderCell>{row.label}</Table.RowHeaderCell>
              {colKeys.map((col, idx) => {
                const value = values[idx];
                return (
                  <Table.Cell key={col}>
                    {value === true ? "✅" : value === false ? "❌" : ""}
                  </Table.Cell>
                );
              })}
              <Table.Cell key="and">
                {andValue === undefined ? "" : andValue ? "✅" : "❌"}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default SessionChoicesTable;
