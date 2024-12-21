import z from "zod";

const contentSchema = z.object({
  title: z
    .string({ message: "please inter the appropriate data type" })
    .min(10, { message: "title shouldn't be less than 10 characters" }),
});

export default contentSchema;
