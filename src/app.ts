
import express from "express";
import clienteRoutes from "./routes/cliente.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import produtoRoutes from "./routes/produto.routes.js"
import estoqueRoutes from "./routes/estoque.routes.js"

const app = express();

app.use(express.json());

app.use(clienteRoutes);

app.use(usuarioRoutes);

app.use(produtoRoutes);

app.use(estoqueRoutes);

app.use(errorMiddleware);

export default app;
