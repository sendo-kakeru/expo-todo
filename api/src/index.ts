import { vValidator } from "@hono/valibot-validator";
import { getPrisma } from "@repo/db";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import * as v from "valibot";

type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{
  Bindings: Env;
}>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:8081", "exp://localhost:19000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["*"],
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/tasks/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param("id");
  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });
    return c.json({ task });
  } catch (error) {
    console.error("Failed to get task: ", error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to get task",
        instance: c.req.path,
      },
      500,
      {
        "Content-Type": "application/problem+json",
        "Content-Language": "en",
      },
    );
  }
});

app.get("/tasks", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const tasks = await prisma.task.findMany();
    return c.json({ tasks });
  } catch (error) {
    console.error("Failed to retrieve tasks", error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to retrieve tasks",
        instance: c.req.path,
      },
      500,
      {
        "Content-Type": "application/problem+json",
        "Content-Language": "en",
      },
    );
  }
});

const CreateTaskRequestSchema = v.object({
  title: v.string(),
  content: v.optional(v.string()),
});

app.post(
  "/tasks",
  vValidator(
    "json",
    CreateTaskRequestSchema,
    async ({ success, output, issues }, c) => {
      if (!success) {
        return c.json(
          {
            type: "http://localhost:8787/problem/invalid",
            title: "Bad Request",
            detail: "Invalid request",
            instance: c.req.path,
            invalidParams: issues,
          },
          400,
          {
            "Content-Type": "application/problem+json",
            "Content-Language": "en",
          },
        );
      }
      const { DATABASE_URL } = env<Env>(c);
      const prisma = getPrisma(DATABASE_URL);

      try {
        const createdTask = await prisma.task.create({
          data: output,
        });
        return c.json({ id: createdTask.id });
      } catch (error) {
        console.error("Failed to create task: ", error);
        return c.json(
          {
            type: "http://localhost:8787/problem/internal-server-error",
            title: "Internal Server Error",
            detail: "Failed to create task",
            instance: c.req.path,
          },
          500,
          {
            "Content-Type": "application/problem+json",
            "Content-Language": "en",
          },
        );
      }
    },
  ),
);

const UpdateTaskRequestSchema = v.object({
  title: v.optional(v.string()),
  content: v.optional(v.string()),
  published: v.optional(v.boolean()),
});

app.patch(
  "/tasks/:id",
  vValidator(
    "json",
    UpdateTaskRequestSchema,
    async ({ success, output, issues }, c) => {
      if (!success) {
        return c.json(
          {
            type: "http://localhost:8787/problem/invalid",
            title: "Bad Request",
            detail: "Invalid request",
            instance: c.req.path,
            invalidParams: issues,
          },
          400,
          {
            "Content-Type": "application/problem+json",
            "Content-Language": "en",
          },
        );
      }
      const { DATABASE_URL } = env<Env>(c);
      const prisma = getPrisma(DATABASE_URL);
      const id = c.req.param("id");
      try {
        const updatedTask = await prisma.task.update({
          where: { id },
          data: output,
        });
        return c.json({ task: updatedTask });
      } catch (error) {
        console.error("Failed to update task: ", error);
        return c.json(
          {
            type: "http://localhost:8787/problem/internal-server-error",
            title: "Internal Server Error",
            detail: "Failed to update task",
            instance: c.req.path,
          },
          500,
          {
            "Content-Type": "application/problem+json",
            "Content-Language": "en",
          },
        );
      }
    },
  ),
);

app.delete("/tasks/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param("id");
  try {
    const deletedTask = await prisma.task.delete({
      where: { id },
    });
    return c.json({ task: deletedTask });
  } catch (error) {
    console.error("Failed to delete task: ", error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to delete task",
        instance: c.req.path,
      },
      500,
      {
        "Content-Type": "application/problem+json",
        "Content-Language": "en",
      },
    );
  }
});

export default app;
