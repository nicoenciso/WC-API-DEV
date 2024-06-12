import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./controllers/index.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const options = {
  origin: process.env.ORIGIN || "*",
  methos: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(options));

// Ruta primaria
app.get("/api/v1", (req, res) => {
  res.send({ info: "Node.js, Express, and Postgres API" });
});

// Ejecución de rutas
Routes(app);

export default app;
