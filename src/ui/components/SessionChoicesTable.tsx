import React from "react";
import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import type {
  User,
  SessionChoice,
  Restaurant,
} from "../../../generated/prisma";

interface SessionChoicesTableProps {
  sessionId: string;
}

export default async function SessionChoicesTable({
  sessionId,
}: SessionChoicesTableProps) {
  // Fetch all session choices for this session, including user and restaurant info
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      choices: {
        include: {
          user: true,
          restaurant: true,
        },
      },
      users: { include: { user: true } },
      restaurants: true,
    },
  });
  if (!session) return <div>Session not found</div>;

  const users: User[] = session.users.map((su) => su.user);
  const guestNames: string[] = Array.from(
    new Set(
      session.choices
        .map((c: SessionChoice) => c.guestName)
        .filter(Boolean) as string[]
    )
  );
  const columns: string[] = [...users.map((u) => u.name), ...guestNames];

  const restaurantRows = session.restaurants.map((r: Restaurant) => ({
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
  for (const c of session.choices as SessionChoice[]) {
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
        {rows.map((row) => (
          <Table.Row key={row.key}>
            <Table.RowHeaderCell>{row.label}</Table.RowHeaderCell>
            {columns.map((col) => {
              const value = choiceMap.get(row.key + "::" + col);
              return (
                <Table.Cell key={col}>
                  {value === true ? "✅" : value === false ? "❌" : ""}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
