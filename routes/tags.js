import { Router } from "express";
import { getTags } from "../handlers/tags.js";

const tagRouter = Router();

// Devuelve los tags ordenados por la cantidad de post creados con ese tag (opcionalmente con un limite de cantidad)
tagRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const tags = await getTags(limit);
    res.send(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching tags");
  }
});

export default tagRouter;
