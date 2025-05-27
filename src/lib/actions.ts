"use server";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

// Create a new user
export async function createUser(name: string) {
  return prisma.user.create({ data: { name } });
}

// Get a user by ID
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

// Update a user's name
export async function updateUser(id: string, name: string) {
  return prisma.user.update({ where: { id }, data: { name } });
}

// Delete a user
export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}

// Create a new session (optionally with users and restaurants)
export async function createSession({
  access_with_link = true,
  userIds = [],
  restaurantIds = [],
}: {
  access_with_link?: boolean;
  userIds?: string[];
  restaurantIds?: string[];
}) {
  return prisma.session.create({
    data: {
      access_with_link,
      users: {
        create: userIds.map((userId) => ({
          user: { connect: { id: userId } },
        })),
      },
      restaurants: {
        connect: restaurantIds.map((id) => ({ id })),
      },
    },
    include: { users: true, restaurants: true },
  });
}

// Get a session by ID
export async function getSessionById(id: string) {
  return prisma.session.findUnique({
    where: { id },
    include: { users: { include: { user: true } }, restaurants: true },
  });
}

// Update a session (change access_with_link, users, or restaurants)
export async function updateSession(
  id: string,
  {
    access_with_link,
    userIds,
    restaurantIds,
  }: {
    access_with_link?: boolean;
    userIds?: string[];
    restaurantIds?: string[];
  }
) {
  return prisma.session.update({
    where: { id },
    data: {
      ...(access_with_link !== undefined ? { access_with_link } : {}),
      ...(userIds
        ? {
            users: {
              set: [],
              create: userIds.map((userId) => ({
                user: { connect: { id: userId } },
              })),
            },
          }
        : {}),
      ...(restaurantIds
        ? {
            restaurants: {
              set: restaurantIds.map((id) => ({ id })),
            },
          }
        : {}),
    },
    include: { users: true, restaurants: true },
  });
}

// Delete a session
export async function deleteSession(id: string) {
  return prisma.session.delete({ where: { id } });
}

// Server action for creating a session and redirecting
export async function createSessionAction(formData: FormData): Promise<void> {
  const restaurantIds = formData.getAll("restaurantIds").map(String);
  const session = await createSession({ restaurantIds });
  if (session && session.id) {
    redirect(`/sessions/${session.id}`);
  }
}
