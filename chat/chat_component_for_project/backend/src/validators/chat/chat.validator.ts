import { z } from "zod";

const sendMessageSchema = z.object({
  message: z.string(),
});

export type SendMessageType = z.infer<typeof sendMessageSchema>;

export function SendMessageValidator(data: any) {
  try {
    return sendMessageSchema.safeParse(data);
  } catch (error) {
    throw new Error("Message is empty");
  }
}
