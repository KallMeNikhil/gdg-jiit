import { z } from "zod";

export const FormSchemaZod = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobileNo: z.number().min(100000000),
  year: z.number(),
  batch: z.string(),
  departmentInterested: z.enum(["tech", "ui/ux", "management"]),
});
