import { getPrisma } from "@repo/db";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use(
  "*",
  cors({
    origin: ["http://localhost:8081", "exp://localhost:19000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["*"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const users = await prisma.user.findMany();
    return c.json({ users });
  } catch (error) {
    console.error(error);
    return c.json(
      {
        type: "http://localhost:8787/problem/internal-server-error",
        title: "Internal Server Error",
        detail: "Failed to retrieve users",
        instance: c.req.path,
      },
      500,
      {
        "Content-Type": "application/problem+json",
        "Content-Language": "en",
      }
    );
  }
});

export default app;
