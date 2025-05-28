import { Box, Button, Card, Flex } from "@radix-ui/themes";
import type { Restaurant } from "../../../generated/prisma";
import Image from "next/image";
import React, { useState } from "react";

type RestaurantCardProps = Restaurant & {
  onImageClick?: () => void;
  variant: "vertical" | "horizontal" | "default";
};

function RestaurantCard({
  name,
  description,
  imageUrl,
  onImageClick,
  variant = "horizontal",
}: RestaurantCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  if (variant == "horizontal" || "default") {
    return (
      <Box className="w-full">
        <Card
          size={"2"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer" }}
        >
          <Flex gap={"4"}>
            <Box
              className="relative w-[100px] h-[100px]"
              onClick={onImageClick}
            >
              <Image
                src={imageUrl || ""}
                alt="In-N-Out" // TODO: Change this to read in the alt text from data
                width={100}
                height={100}
                className="rounded"
              />
              {isHovered && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center rounded text-white">
                  + add to list
                </div>
              )}
            </Box>
            <Box>
              <h3
                className="text-base whitespace-nowrap w-full truncate"
                title={name}
              >
                {name}
              </h3>
              <p className="overflow-hidden text-ellipsis mb-0 line-clamp-2">
                {description}
              </p>
              {description && (
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => setShowDescription((v) => !v)}
                >
                  {showDescription ? "Hide" : "Read more"}
                </Button>
              )}
            </Box>
          </Flex>
        </Card>
      </Box>
    );
  }
  if (variant == "vertical") {
    return (
      <Box width={"200px"}>
        <Card
          size={"2"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "pointer" }}
        >
          <Flex direction="column" gap={"4"}>
            <Box
              className="relative w-[150px] h-[150px] mx-auto"
              onClick={onImageClick}
            >
              <Image
                src={imageUrl || ""}
                alt="In-N-Out" // TODO: Change this to read in the alt text from data
                width={150}
                height={150}
                className="rounded"
              />
              {isHovered && (
                <Box className="absolute inset-0 bg-black/75 flex items-center justify-center rounded text-white">
                  add to list
                </Box>
              )}
            </Box>
            <Box>
              <h3
                className="text-base whitespace-nowrap w-full truncate"
                title={name}
              >
                {name}
              </h3>
              <p className="overflow-hidden text-ellipsis mb-0 line-clamp-1">
                {description}
              </p>
              {description && (
                <Button
                  variant="ghost"
                  size="1"
                  onClick={() => setShowDescription((v) => !v)}
                >
                  {showDescription ? "Hide" : "Read more"}
                </Button>
              )}
            </Box>
          </Flex>
        </Card>
      </Box>
    );
  }
}

export default RestaurantCard;
