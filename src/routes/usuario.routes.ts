import { Router } from "express";
import {
    criarUsuario,
    loginUsuario,
    buscarMeuPerfil,
    atualizarUsuario,
    deletarUsuario,
} from "../controllers/usuario.controller.js";

import authUsuarioMiddleware from "../middlewares/authUsuario.middleware.js";

const router = Router();

router.post("/usuario", criarUsuario);
router.post("/usuario/login", loginUsuario);
router.get("/usuario/perfil", authUsuarioMiddleware, buscarMeuPerfil);
router.put("/usuario", authUsuarioMiddleware, atualizarUsuario);
router.delete("/usuario", authUsuarioMiddleware, deletarUsuario);

export default router;