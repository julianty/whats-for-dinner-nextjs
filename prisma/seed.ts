// Number of users and restaurants to create
const NUM_USERS = 10;
const NUM_RESTAURANTS = 10;

import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Remove existing data
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  // Create users
  const users = await Promise.all(
    Array.from({ length: NUM_USERS }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
        },
      })
    )
  );

  // Create restaurants
  const restaurants = await Promise.all(
    Array.from({ length: NUM_RESTAURANTS }).map(() => {
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
          description: `A popular ${faker.food.ethnicCategory()} restaurant known for their ${faker.food.dish()}.`,
          imageUrl: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
        },
      });
    })
  );

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
