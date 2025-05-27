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
            style={{
              position: "relative",
              width: 150,
              height: 150,
              margin: "0 auto",
            }}
            onClick={onImageClick}
          >
            <Image
              src={imageUrl || ""}
              alt="In-N-Out"
              width={150}
              height={150}
              style={{ borderRadius: 8 }}
            />
            {isHovered && (
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.75)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: 1,
                  zIndex: 2,
                  transition: "background 0.2s",
                }}
              >
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
