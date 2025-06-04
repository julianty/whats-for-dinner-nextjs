// Number of users and restaurants to create
const NUM_USERS = 10;
const NUM_RESTAURANTS = 10;

import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";
import { customRestaurants } from "./customRestaurants";

const prisma = new PrismaClient();

async function main() {
  // Remove existing data
  await prisma.sessionChoice.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  // Create users
  const users = await Promise.all(
    Array.from({ length: NUM_USERS }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      })
    )
  );

  // Create restaurants
  const customCount = Math.min(NUM_RESTAURANTS, customRestaurants.length);
  const fakerCount = Math.max(0, NUM_RESTAURANTS - customCount);

  // First, seed from customRestaurants
  const customRestaurantCreates = customRestaurants
    .slice(0, customCount)
    .map((data) => prisma.restaurant.create({ data }));

  // Then, fill the rest with faker
  const fakerRestaurantCreates = Array.from({ length: fakerCount }).map(() => {
    // Compose name and ensure each word starts with uppercase
    const firstName = faker.person.firstName();
    const adjective = faker.food.adjective();
    const meat = faker.food.meat();
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const name = `${capitalize(firstName)}'s ${capitalize(
      adjective
    )} ${capitalize(meat)}`;
    return prisma.restaurant.create({
      data: {
        name,
        userCreated: false,
        description: `A popular ${faker.food.ethnicCategory()} restaurant known for their ${faker.food.dish()}.`,
        imageUrl: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
      },
    });
  });

  const restaurants = await Promise.all([
    ...customRestaurantCreates,
    ...fakerRestaurantCreates,
  ]);

  console.log(
    `Seeded ${users.length} users and ${restaurants.length} restaurants.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
