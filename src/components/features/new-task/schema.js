import z from "zod";

export const taskSchema = z.object({
  name: z.string().min(3, "Task name must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELLED"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});
