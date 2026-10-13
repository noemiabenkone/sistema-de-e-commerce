
import express from "express";
import clienteRoutes from "./routes/cliente.routes.js";

const app = express();

app.use(express.json());

app.use(clienteRoutes);

export default app;
