import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

export const getPrisma = (connectionString: string) => {
  const adapter = new PrismaPg({
    connectionString,
  });
  return new PrismaClient({ adapter });
};
