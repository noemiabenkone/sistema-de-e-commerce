
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    atualizarCliente,
    buscarMeuPerfil,
    criarCliente,
    deletarCliente,
    loginCliente,
} from "../controllers/cliente.controller.js";

const router = Router();

router.post("/clientes", criarCliente);

router.post("/login", loginCliente);

router.get("/clientes/perfil", authMiddleware, buscarMeuPerfil);

router.put("/clientes/", authMiddleware, atualizarCliente);


router.delete("/clientes/", authMiddleware, deletarCliente);

export default router;
