import {Router} from "express";
import authUsuarioMiddleware from "../middlewares/authUsuario.middleware.js";
import { 
    buscarProdutoPorId, 
    cadastrarProduto, 
    listarProdutos , 
    atualizarProduto} 
from "../controllers/produto.controller.js";

const router = Router();

router.post("/produto", authUsuarioMiddleware, cadastrarProduto);
router.get("/produtos", authUsuarioMiddleware, listarProdutos);
router.get("/produto/:id", authUsuarioMiddleware, buscarProdutoPorId)
router.put("/produto/:id", authUsuarioMiddleware, atualizarProduto)

export default router;