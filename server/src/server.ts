import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();
const prisma = new PrismaClient({ log: ["query"] });

app.register(cors, { origin: ["http://localhost:5173"] });

app.get("/habits", async () => {
  const habits = await prisma.habit.findMany();

  return {
    ok: true,
    habits,
  };
});

app.listen({ port: 3333 }).then(() => console.log("Server running!"));
