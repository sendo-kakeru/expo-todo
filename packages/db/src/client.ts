import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

export const getPrisma = (connectionString: string) => {
  const adapter = new PrismaPg({
    connectionString,
  });
  return new PrismaClient({ adapter });
};
