import { z } from "zod";

const TypeEnum = z.enum(
  ["twitter", "instagram", "telegram", "youtube", "link", "article", "news"],
  {
    errorMap: () => ({
      message: "Invalid type. Must be one of the predefined types.",
    }),
  }
);

const ContentSchema = z.object({
  id: z
    .number({ required_error: "Content ID is required." })
    .int("Content ID must be an integer."),
  title: z
    .string({ required_error: "Title is required." })
    .min(1, "Title cannot be empty."),
  link: z
    .string({ required_error: "Link is required." })
    .url("Invalid link format."),
  type: TypeEnum,
  tags: z
    .array(z.string(), { required_error: "Tags are required." })
    .nonempty("Tags cannot be empty."),
  userId: z.string({ required_error: "User ID is required." }),
  description: z.string().optional(),
});

// Infer the TypeScript type from the schema
export type ContentInterface = z.infer<typeof ContentSchema>;

export { ContentSchema, TypeEnum };
