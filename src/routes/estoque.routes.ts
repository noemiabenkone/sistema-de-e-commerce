import { Router } from "express";
import authUsuarioMiddleware from "../middlewares/authUsuario.middleware.js";
import { consultarEstoque, criarEstoque, deletarEstoque, estoqueAtualizado } from "../controllers/estoque.controller.js";
import authMiddleware from "../middlewares/authCliente.middleware.js";

const router = Router();

router.post("/produto/:id/estoque", authUsuarioMiddleware, criarEstoque);
router.get("/produto/:id/estoque", authUsuarioMiddleware, consultarEstoque);
router.get("/produto/:id/estoque", authMiddleware, estoqueAtualizado);
router.delete("/produto/:id/estoque",authUsuarioMiddleware,deletarEstoque);

export default router;