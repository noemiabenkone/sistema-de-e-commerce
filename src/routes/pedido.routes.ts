import { Router } from "express";
import authMiddleware from "../middlewares/authCliente.middleware.js";
import {
    criarPedido,
    buscarPedidos,
    buscarPedidoPorId
} from "../controllers/pedido.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/", criarPedido);
router.get("/", buscarPedidos);
router.get("/:id", buscarPedidoPorId);

export default router;