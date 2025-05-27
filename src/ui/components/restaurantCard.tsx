import { Box, Button, Card, Flex } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

type RestaurantData = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  onImageClick?: () => void;
};

function RestaurantCard({
  name,
  description,
  imageUrl,
  onImageClick,
}: RestaurantData) {
  const [showDescription, setShowDescription] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
              style={{
                fontSize: "clamp(0.5rem, 2vw, 1.125rem)", // adjust as needed
                whiteSpace: "nowrap", // prevents wrapping
                width: "100%",
              }}
              title={name}
            >
              {name}
            </h3>
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: showDescription ? "none" : 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: 0,
              }}
            >
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

export default RestaurantCard;
