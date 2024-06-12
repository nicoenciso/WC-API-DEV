import usersRouter from "./users.js";
import postsRouter from "./posts.js";
import commentsRouter from "./comments.js";
import clerkWebhookRouter from "./clerkWebhook.js";
import { Router } from "express";
import express from "express";

const apiRouter = Router();

// Definición de rutas
const Routes = (app) => {
  // Aplicación de parseo de JSON
  apiRouter.use(express.json());

  // Ruta manejo de usuarios
  apiRouter.use("/users", usersRouter);

  // Ruta manejo de posts
  apiRouter.use("/posts", postsRouter);

  // Ruta manejo de comentarios
  apiRouter.use("/comments", commentsRouter);

  // Ruta Clerk Webhook
  app.use("/api/v1/webhooks", clerkWebhookRouter);

  // Ruta de versionamiento
  app.use("/api/v1", apiRouter);
};

export default Routes;
