import * as v from "valibot";

export const CreateTaskRequestSchema = v.object({
  title: v.string(),
  content: v.optional(v.string()),
});

export const UpdateTaskRequestSchema = v.object({
  title: v.optional(v.string()),
  content: v.optional(v.string()),
  published: v.optional(v.boolean()),
});
