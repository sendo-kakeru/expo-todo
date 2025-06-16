import { vValidator } from "@hono/valibot-validator";
import { Prisma, getPrisma } from "@repo/db";
import { CreateTaskRequestSchema, UpdateTaskRequestSchema } from "@repo/shared";
import { type Context, Hono } from "hono";
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
    allowMethods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["*"],
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const _taskEndpoints = app
  .get("/tasks/:id", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const id = c.req.param("id");
    try {
      const task = await prisma.task.findUnique({
        where: { id },
      });
      return c.json({ task });
    } catch (error) {
      console.error("Failed to get task: ", error);
      return handlePrismaError(c, error);
    }
  })
  .get("/tasks", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: "desc" },
      });
      return c.json({ tasks });
    } catch (error) {
      console.error("Failed to retrieve tasks", error);
      return handlePrismaError(c, error);
    }
  })
  .post("/tasks", vValidator("json", CreateTaskRequestSchema), async (c) => {
    const data = c.req.valid("json");
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
      const createdTask = await prisma.task.create({
        data,
      });
      return c.json({ task: createdTask }, 201);
    } catch (error) {
      console.error("Failed to create task: ", error);
      return handlePrismaError(c, error);
    }
  })
  .patch(
    "/tasks/:id",
    vValidator("json", UpdateTaskRequestSchema),
    async (c) => {
      const data = c.req.valid("json");
      const prisma = getPrisma(c.env.DATABASE_URL);
      const id = c.req.param("id");
      try {
        const updatedTask = await prisma.task.update({
          where: { id },
          data,
        });
        return c.json({ task: updatedTask });
      } catch (error) {
        console.error("Failed to update task: ", error);
        return handlePrismaError(c, error);
      }
    },
  )
  .delete("/tasks/:id", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const id = c.req.param("id");
    try {
      const deletedTask = await prisma.task.delete({
        where: { id },
      });
      return c.json({ taskId: deletedTask.id });
    } catch (error) {
      console.error("Failed to delete task: ", error);
      return handlePrismaError(c, error);
    }
  });

export type TaskEndpoints = typeof _taskEndpoints;

export default app;

function handlePrismaError(c: Context, error: unknown) {
  console.error("Prisma error:", error);
  if (error instanceof v.ValiError) {
    return c.json(
      {
        type: "http://localhost:8787/problem/invalid",
        title: "Bad Request",
        detail: "Invalid request",
        instance: c.req.path,
        invalidParams: error.issues,
      },
      400,
      {
        "Content-Type": "application/problem+json",
        "Content-Language": "en",
      },
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint violation
        return c.json(
          {
            type: "http://localhost:8787/problem/conflict",
            title: "Conflict",
            detail: "A record with this identifier already exists.",
            instance: c.req.path,
            prismaCode: error.code,
          },
          409,
          { "Content-Type": "application/problem+json" },
        );
      case "P2025": // Record not found
        return c.json(
          {
            type: "http://localhost:8787/problem/not-found",
            title: "Not Found",
            detail: "Record not found.",
            instance: c.req.path,
            prismaCode: error.code,
          },
          404,
          { "Content-Type": "application/problem+json" },
        );
      default:
        return c.json(
          {
            type: "http://localhost:8787/problem/internal-server-error",
            title: "Internal Server Error",
            detail: `Prisma error: ${error.message}`,
            instance: c.req.path,
            prismaCode: error.code,
          },
          500,
          { "Content-Type": "application/problem+json" },
        );
    }
  }

  return c.json(
    {
      type: "http://localhost:8787/problem/internal-server-error",
      title: "Internal Server Error",
      detail: "An unexpected error occurred.",
      instance: c.req.path,
    },
    500,
    { "Content-Type": "application/problem+json" },
  );
}
