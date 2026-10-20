import type { Request, Response } from "express";
import { clienteSchema } from "../validations/cliente.schema.js";
import criarClienteService from "../services/cliente.service.js";
import loginClienteService from "../services/auth.service.js";
import { atualizarClienteSchema } from "../validations/cliente.schema.js";
import { atualizarCliente as atualizarClienteService } from "../services/cliente.service.js";
import { deletarCliente as deletarClienteService } from "../services/cliente.service.js";
import { buscarMeuPerfil as buscarMeuPerfilService} from "../services/cliente.service.js";

export async function criarCliente(req: Request, res: Response) {
    const dadosValidados = clienteSchema.parse(req.body);

    const resultado = await criarClienteService(dadosValidados);

    const { senha, ...clienteSemSenha } = resultado.cliente;

   return res.status(201).json({
      message: "Cliente criado com sucesso",
      data: clienteSemSenha,
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

export async function buscarMeuPerfil(req: Request, res: Response) {
    const id = (req.clienteId);

    if (id === undefined) {
        return res.status(401).json({
         message: "Não autenticado",
        });
   }

    const resultado = await buscarMeuPerfilService(id);

    const { senha, ...clienteSemSenha } = resultado.cliente;

    return res.status(200).json({
        message: "Perfil do cliente",
        data: clienteSemSenha,
    });
}

export async function atualizarCliente(req: Request, res: Response) {
    const id = (req.clienteId);

    if (id === undefined) {
        return res.status(401).json({
         message: "Não autenticado",
        });
   }
    const dadosValidados = atualizarClienteSchema.parse(req.body);

    const resultado = await atualizarClienteService(
        id,
        dadosValidados
    );

    const { senha, ...clienteSemSenha } = resultado.cliente;

    return res.status(200).json({
        message: "Cliente atualizado com sucesso",
        data: clienteSemSenha,
    });
}

export async function deletarCliente(req: Request, res: Response) {
    const id = (req.clienteId);

    if (id === undefined) {
        return res.status(401).json({
         message: "Não autenticado",
        });
   }

    const cliente = await deletarClienteService(id);

    return res.status(200).json({
        message: "Cliente deletado com sucesso",
        data: cliente,
    });
}