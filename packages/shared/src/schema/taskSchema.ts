import * as v from "valibot";

export const CreateTaskRequestSchema = v.object({
  title: v.string(),
  content: v.optional(v.string()),
});

export type CreateTaskRequest = v.InferOutput<typeof CreateTaskRequestSchema>;

export const UpdateTaskRequestSchema = v.object({
  title: v.optional(v.string()),
  content: v.optional(v.string()),
  published: v.optional(v.boolean()),
});

export type UpdateTaskRequest = v.InferOutput<typeof UpdateTaskRequestSchema>;
