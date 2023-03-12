import cors from "@fastify/cors";
import fastify from "fastify";
import { appRoutes } from "./routes/app";
import { daysRoutes } from "./routes/days";
import { habitsRoutes } from "./routes/habits";

const app = fastify();

app.register(cors);
app.register(appRoutes);
app.register(daysRoutes, { prefix: "/days" });
app.register(habitsRoutes, { prefix: "/habits" });

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(url => console.log(`Server running at ${url}`));
