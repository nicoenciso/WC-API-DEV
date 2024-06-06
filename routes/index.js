import usersRouter from "./users.js";
import clerkWebhookRouter from "./clerkWebhook.js";
import { Router } from "express";

const apiRouter = Router();

//Definición de rutas
const Routes = (app) => {
  //Ruta manejo de usuarios
  apiRouter.use("/users", usersRouter);

  //Ruta Clerk Webhook
  apiRouter.use("/webhooks", clerkWebhookRouter);

  //Ruta de versionamiento
  app.use("/api/v1", apiRouter);
};

export default Routes;
