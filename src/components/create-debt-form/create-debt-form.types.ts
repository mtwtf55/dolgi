import * as z from "zod";
import type { createDebtFormSchema } from "./create-debt-form.constants";

export type CreateDebtFormValues = z.input<typeof createDebtFormSchema>;
