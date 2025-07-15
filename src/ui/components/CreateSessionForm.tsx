import React from "react";
import type { Restaurant } from "../../../generated/prisma";
import { Flex, TextField, Button } from "@radix-ui/themes";
import { createSessionAction } from "@/lib/actions";

interface CreateSessionFormProps {
  selectedRestaurants: Restaurant[];
  onUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateSessionForm: React.FC<CreateSessionFormProps> = ({
  selectedRestaurants,
  onUserNameChange,
}) => (
  <form action={createSessionAction}>
    {selectedRestaurants
      .filter((r) => r.userCreated == false)
      .map((r) => (
        <input key={r.id} type="hidden" name="restaurantIds" value={r.id} />
      ))}
    {selectedRestaurants
      .filter((r) => r.userCreated == true)
      .map((r) => (
        <input key={r.id} type="hidden" name="userEntries" value={r.id} />
      ))}
    <Flex justify={"between"} gap="2">
      <TextField.Root
        placeholder="Enter your name"
        name="userName"
        onChange={onUserNameChange}
        required
        className="flex-1"
      >
        <TextField.Slot>{""}</TextField.Slot>
      </TextField.Root>
      <Button type="submit" className="mt-4">
        Create Session
      </Button>
    </Flex>
  </form>
);

export default CreateSessionForm;
