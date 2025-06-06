import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma/edge";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "@neondatabase/serverless";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   (() => {
//     const adapter = new PrismaPg({
//       connectionString: process.env.DATABASE_URL,
//     });
//     return new PrismaClient({ adapter });
//   })();

// globalForPrisma.prisma = prisma;

export const getPrisma = (datasourceUrl: string) => {
  // export const getPrisma = (connectionString: string) => {
  // const pool = new Pool({ connectionString });
  // const adapter = new PrismaPg(pool);

  // const adapter = new PrismaPg({
  //   connectionString,
  // });
  // return new PrismaClient({ adapter });
  return new PrismaClient({ datasourceUrl }).$extends(withAccelerate());
};
