"use client";

import React from "react";
import { Button } from "@radix-ui/themes";
function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button
      style={{ margin: "5px", verticalAlign: "middle" }}
      variant="soft"
      size={"1"}
      onClick={handleClick}
    >
      {copied ? "copied!" : "Copy Link"}
    </Button>
  );
}

export default CopyLinkButton;
