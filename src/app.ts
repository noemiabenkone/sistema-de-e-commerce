
import express from "express";
import clienteRoutes from "./routes/cliente.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(clienteRoutes);

app.use(errorMiddleware);

export default app;
