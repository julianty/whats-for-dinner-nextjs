-- CreateEnum
CREATE TYPE "RestaurantTag" AS ENUM ('VEGETARIAN', 'VEGAN');

-- CreateEnum
CREATE TYPE "PriceRating" AS ENUM ('ONE', 'TWO', 'THREE');

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "priceRating" "PriceRating" NOT NULL DEFAULT 'TWO',
ADD COLUMN     "tags" "RestaurantTag"[],
ADD COLUMN     "userRating" DOUBLE PRECISION NOT NULL DEFAULT -1;
