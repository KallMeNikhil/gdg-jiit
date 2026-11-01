import { z } from "zod";

export const ContactSchemaZod = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("Invalid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});
