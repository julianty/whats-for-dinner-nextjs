export type SessionChoicePayload = {
  sessionId: string;
  userId?: string;
  guestName?: string;
  restaurantId?: string;
  customEntry?: string;
  choice: boolean;
};
