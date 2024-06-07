import app from "./app.js";
import runDbMigrations from "./db/migrations/index.js";

//Lanzamiento asíncrono del servidor
async function start() {
  await runDbMigrations();

  const port = 3000;
  app.listen(port, () => {
    console.log(`App running on port ${port}.🚀`);
  });
}

start();
