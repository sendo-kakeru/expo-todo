import { getPrisma } from "@repo/db";
import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/user", async (c) => {
  console.log(c.env);
  const prisma = getPrisma(c.env.DATABASE_URL);
  const user = await prisma.user.create({
    data: {
      email: "text@example.com",
    },
  });
  return c.json({ user });
});

export default app;
