// prisma-test.ts
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Example query: get all restaurants (change to match your model)
  const restaurants = await prisma.restaurant.findMany();
  console.log(restaurants);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
