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

app.get("/posts/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param("id");
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return c.json({ post });
  } catch (error) {
    console.error("Failed to get post: ", error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to get post",
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

app.get("/posts", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const posts = await prisma.post.findMany();
    return c.json({ posts });
  } catch (error) {
    console.error("Failed to retrieve posts", error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to retrieve posts",
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

const CreatePostRequestSchema = v.object({
  title: v.string(),
  content: v.optional(v.string()),
});

app.post(
  "/posts",
  vValidator(
    "json",
    CreatePostRequestSchema,
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
        const createdPost = await prisma.post.create({
          data: output,
        });
        return c.json({ id: createdPost.id });
      } catch (error) {
        console.error("Failed to create post: ", error);
        return c.json(
          {
            type: "http://localhost:8787/problem/internal-server-error",
            title: "Internal Server Error",
            detail: "Failed to create post",
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

const UpdatePostRequestSchema = v.object({
  title: v.optional(v.string()),
  content: v.optional(v.string()),
  published: v.optional(v.boolean()),
});

app.patch(
  "/posts/:id",
  vValidator(
    "json",
    UpdatePostRequestSchema,
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
        const updatedPost = await prisma.post.update({
          where: { id },
          data: output,
        });
        return c.json({ post: updatedPost });
      } catch (error) {
        console.error("Failed to update post: ", error);
        return c.json(
          {
            type: "http://localhost:8787/problem/internal-server-error",
            title: "Internal Server Error",
            detail: "Failed to update post",
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

app.delete("/posts/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = c.req.param("id");
  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return c.json({ post: deletedPost });
  } catch (error) {
    console.error("Failed to delete post: ", error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to delete post",
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
