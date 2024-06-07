import usersRouter from "./users.js";
import postRouter from "./posts.js";
import commentRouter from "./comments.js";
import followersRouter from "./followers.js";

import { Router } from "express";

const apiRouter = Router();

// Definición de rutas
const Routes = (app) => {
  apiRouter.use("/users", usersRouter);
  apiRouter.use("/posts", postRouter);
  apiRouter.use("/comments", commentRouter);
  apiRouter.use("/followers", followersRouter);
 

  // Ruta de versionamiento
  app.use("/api/v1", apiRouter);
};

export default Routes;
