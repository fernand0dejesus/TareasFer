import express from "express";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";
import taskRoutes from "./src/routes/task.js";

//crear constante que es igual a la libreria que importe
const app = express();


//traemos el archivo json
const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./fernand0dejesus-TAREASAPI-1.0.0-resolved.json"), "utf-8")
)

//Que acepte datos de json
app.use(express.json());


//Definir las rutas de las funciones que tendra la pagina web
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/api/tasks", taskRoutes);

//exporto la constante para poder usar express en otros archivos
export default app;