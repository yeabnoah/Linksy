import { z } from "zod";

const LinkSchema = z.object({
  id: z
    .number({ required_error: "Link ID is required." })
    .int("Link ID must be an integer."),
  hash: z
    .string({ required_error: "Hash is required." })
    .min(1, "Hash cannot be empty."),
  userId: z.string({ required_error: "User ID is required." }),
});

export default LinkSchema;
