import Router from "express";
import { cadastrarEndereco, listarEnderecos, atualizarEndereco, deletarEndereco } from "../controllers/endereco.controller.js";
import authClienteMiddleware from "../middlewares/authCliente.middleware.js";
const enderecoRouter = Router();

enderecoRouter.post("/", authClienteMiddleware, cadastrarEndereco);
enderecoRouter.get("/", authClienteMiddleware, listarEnderecos);
enderecoRouter.put("/:enderecoId", authClienteMiddleware, atualizarEndereco);
enderecoRouter.delete("/:enderecoId", authClienteMiddleware, deletarEndereco);