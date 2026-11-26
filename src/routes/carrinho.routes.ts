import { Router } from "express";
import authMiddleware from "../middlewares/authCliente.middleware.js";
import {
    adicionarItemCarrinho,
    listarItensCarrinho,
    removerItemCarrinho,
    atualizarQuantidadeItemCarrinho
} from "../controllers/itemCarrinho.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/itens", adicionarItemCarrinho);
router.get("/itens", listarItensCarrinho);
router.patch("/itens/:produtoId", atualizarQuantidadeItemCarrinho);
router.delete("/itens/:produtoId", removerItemCarrinho);

export default router;