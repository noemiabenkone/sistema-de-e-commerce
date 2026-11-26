import type { Request, Response } from "express";
import { itemCarrinhoSchema } from "../validations/itemCarrinho.schema.js";
import { 
    adicionarItemCarrinho as adicionarItemCarrinhoService,
    listarItensCarrinho as listarItensCarrinhoService,
    removerItemCarrinho as removerItemCarrinhoService,
    atualizarQuantidadeItemCarrinho as atualizarQuantidadeItemCarrinhoService
} from "../services/itemCarrinho.service.js";

export async function adicionarItemCarrinho(req: Request, res: Response) {
    const clienteId = req.clienteId;
    
    if (clienteId === undefined) {
        return res.status(401).json({
            message: "Não autenticado."
        });
    }

    const dadosValidados = itemCarrinhoSchema.parse(req.body);

    const itemAdicionado = await adicionarItemCarrinhoService(clienteId, dadosValidados);
    
    return res.status(201).json({
        message: "Item adicionado ao carrinho com sucesso.",
        item: itemAdicionado
    });
}

export async function listarItensCarrinho(req: Request, res: Response) {
    const clienteId = req.clienteId;

    if (clienteId === undefined) {
        return res.status(401).json({
            message: "Não autenticado."
        });
    }

    const itensCarrinho = await listarItensCarrinhoService(clienteId);

    return res.status(200).json({
        message: "Itens do carrinho listados com sucesso.",
        itens: itensCarrinho
    });
}

export async function removerItemCarrinho(req: Request, res: Response) {
    const clienteId = req.clienteId;
    const produtoId = Number(req.params.produtoId);

    if (clienteId === undefined) {
        return res.status(401).json({
            message: "Não autenticado."
        });
    }

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "produtoId inválido."
        });
    }

    await removerItemCarrinhoService(clienteId, produtoId);

    return res.status(200).json({
        message: "Item removido do carrinho com sucesso."
    });
}

export async function atualizarQuantidadeItemCarrinho(req: Request, res: Response) {
    const clienteId = req.clienteId;
    const produtoId = Number(req.params.produtoId);
    const { quantidade } = req.body;

    if (clienteId === undefined) {
        return res.status(401).json({
            message: "Não autenticado."
        });
    }

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "produtoId inválido."
        });
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        return res.status(400).json({
            message: "quantidade inválida."
        });
    }

    const itemAtualizado = await atualizarQuantidadeItemCarrinhoService(clienteId, produtoId, quantidade);

    return res.status(200).json({
        message: "Quantidade do item atualizada com sucesso.",
        item: itemAtualizado
    });
}