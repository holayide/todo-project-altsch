import z from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .min(3, "Task name must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters")
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});
