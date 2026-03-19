import * as z from "zod";
import type { createDeptFormSchema } from "./create-dept-form.constants";

export type CreateDeptFormValues = z.input<typeof createDeptFormSchema>;
