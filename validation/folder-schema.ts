import { z } from "zod";

const folderSchema = z.object({
  name: z
    .string({ required_error: "please add a name for your folder" })
    .min(2, { message: "folder name should be equal or more-than 2" })
    .max(20, { message: "folder name can't be more than 20 letters" }),
});

export default folderSchema;
