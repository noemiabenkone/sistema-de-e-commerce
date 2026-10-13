import type { Request, Response } from "express";
import { clienteSchema } from "../validations/cliente.schema.js";
import criarClienteService from "../services/cliente.service.js";
import loginClienteService from "../services/auth.service.js";

export async function criarCliente(req: Request, res: Response) {
    const dadosValidados = clienteSchema.parse(req.body);

    const cliente = await criarClienteService(dadosValidados);

    return res.status(201).json({
        message: "Cliente criado com sucesso",
        data: cliente,
    });
}

export async function loginCliente(req: Request, res: Response) {
const { email, senha } = req.body;

const resultado = await loginClienteService(email, senha);

return res.status(200).json({
    message: "Login realizado com sucesso",
    token: resultado.token,
});

}