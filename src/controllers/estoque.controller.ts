
import type { Request, Response } from "express";
import { criarEstoque as criarEstoqueService } from "../services/estoque.service.js";
import { ProdAtualizadosSchema, estoqueSchema } from "../validations/estoque.schema.js";
import {consultarEstoque as consultarEstoqueService} from "../services/estoque.service.js"
import{atualizarEstoque as atualizarEstoqueService} from "../services/estoque.service.js"
import { deletarEstoque as deletarEstoqueService } from "../services/estoque.service.js";



export async function criarEstoque(req: Request, res: Response) {
    const usuarioId = req.usuarioId;

    if (usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado"
        });
    }

    const produtoId = Number(req.params.id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "ID informado inválido"
        });
    }

    const dadosValidados = estoqueSchema.parse(req.body);

    const estoque = await criarEstoqueService(produtoId, dadosValidados);

    return res.status(201).json({
        message: "Estoque registrado com sucesso",
        data: estoque
    });
}


export async function consultarEstoque(req: Request, res: Response) {
    const usuarioId = req.usuarioId;

    if (usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado"
        });
    }

    const produtoId = Number(req.params.id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "ID informado inválido"
        });
    }

    const estoqueProduto = await consultarEstoqueService(produtoId);

    return res.status(200).json({
        message: "Consulta de estoque realizada com sucesso",
        data: estoqueProduto
    });
}


export async function estoqueAtualizado(req: Request, res: Response) {
    const usuarioId = req.usuarioId;

    if (usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado"
        });
    }

    const produtoId = Number(req.params.id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "ID informado inválido"
        });
    }

    const dadosProdAtualizados = ProdAtualizadosSchema.parse(req.body);

    const estoqueAtualizado = await atualizarEstoqueService(
        produtoId,
        dadosProdAtualizados
    );

    return res.status(200).json({
        message: "Estoque atualizado com sucesso",
        data: estoqueAtualizado
    });
}

export async function deletarEstoque(req: Request, res: Response) {
    const usuarioId = req.usuarioId;

    if (usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado"
        });
    }

    const produtoId = Number(req.params.id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "ID do produto inválido"
        });
    }

    const estoque = await deletarEstoqueService(produtoId);

    return res.status(200).json({
        message: "Estoque excluído com sucesso",
        data: estoque
    });
}
