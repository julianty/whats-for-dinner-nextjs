"use client";
import { Box, Button, Card, Flex, Inset } from "@radix-ui/themes";
import type { Restaurant } from "../../../generated/prisma";
import Image from "next/image";
import React, { useState } from "react";

type RestaurantCardProps = Restaurant & {
  onAddClick: () => void;
  onRemoveClick: () => void;
  variant: "vertical" | "horizontal" | "default" | "simple";
};

function RestaurantCard({
  name,
  description,
  imageUrl,
  onAddClick,
  onRemoveClick,
  variant = "horizontal",
}: RestaurantCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  if (variant == "simple") {
    return (
      <Card style={{ minWidth: "500px" }}>
        <Flex justify={"between"}>
          <h3>{name}</h3>
          <Inset asChild part="right">
            <Flex
              direction={"column"}
              // gap={""}
              style={{ borderRadius: "0px" }}
            >
              <Button
                color="red"
                onClick={onRemoveClick}
                style={{
                  borderRadius: "0px",
                }}
              >
                x
              </Button>
              <Button
                color="green"
                onClick={onAddClick}
                style={{ borderRadius: "0px" }}
              >
                +
              </Button>
            </Flex>
          </Inset>
        </Flex>
      </Card>
    );
  }
  if (variant == "horizontal" || "default") {
    return (
      <Box className="w-full">
        <Card
          // size={"2"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ padding: 0, display: "flex" }}
          className="h-24 justify-between"
        >
          <Inset clip={"padding-box"} side={"left"}>
            <button
              className="bg-red-500 h-full w-[70px] cursor-pointer"
              onClick={onRemoveClick}
            >
              x
            </button>
          </Inset>

          <div className="w-[500px] h-full flex gap-2">
            <div
              className="min-w-[100px] w-[100px] h-[100px] relative"
              onClick={onAddClick}
            >
              <Image
                src={imageUrl || ""}
                alt="In-N-Out" // TODO: Change this to read in the alt text from data
                fill={true}
              />
            </div>
            <Box>
              <h3 className="whitespace-nowrap w-full truncate" title={name}>
                {name}
              </h3>
              <p className="overflow-hidden text-ellipsis mb-0 line-clamp-2 text-sm">
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
          </div>
          <Inset clip={"padding-box"} side={"right"}>
            <button
              className="bg-green-500 h-full w-[70px] cursor-pointer"
              onClick={onAddClick}
            >
              +
            </button>
          </Inset>
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
              onClick={onAddClick}
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
