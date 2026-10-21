
import { Router } from "express";
import authClienteMiddleware from "../middlewares/authCliente.middleware.js";
import {
    atualizarCliente,
    buscarMeuPerfil,
    criarCliente,
    deletarCliente,
    loginCliente,
} from "../controllers/cliente.controller.js";

const router = Router();

router.post("/clientes", criarCliente);

router.post("/clientes/login",loginCliente);

router.get("/clientes/perfil", authClienteMiddleware, buscarMeuPerfil);

router.put("/clientes/", authClienteMiddleware, atualizarCliente);


router.delete("/clientes/", authClienteMiddleware, deletarCliente);

export default router;
