import type { Request, Response } from "express";
import * as produtoService from "../services/produto.service.js";
import { atualizacaoProdutoSchema, produtoSchema } from "../validations/produto.schema.js";
import { deletarProduto as deletarProdutoService } from "../services/produto.service.js";


export async function cadastrarProduto(req: Request, res: Response) {
    const dados = produtoSchema.parse(req.body);
    const id = req.usuarioId;

    if (id === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    const produto = await produtoService.cadastrarProduto(dados, id);

    return res.status(201).json({
        message: "Produto cadastrado com sucesso",
        produto,
    });
}

export async function listarProdutos(req: Request, res: Response) {
    if (req.usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    const produtos = await produtoService.listarProdutos();

    return res.status(200).json({
        message: "Produtos encontrados com sucesso",
        produtos,
    });
}

export async function buscarProdutoPorId(req: Request, res: Response) {
    if (req.usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    const produtoId = Number(req.params.id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "ID do produto inválido",
        });
    }

    const produto = await produtoService.buscarProdutoPorId(produtoId);

    return res.status(200).json({
        message: "Produto encontrado com sucesso",
        produto,
    });
}

export async function atualizarProduto(req: Request, res: Response) {
    const usuarioId = req.usuarioId;

    if (usuarioId === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    const produtoId = Number(req.params.id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
        return res.status(400).json({
            message: "ID do produto inválido",
        });
    }

    const dadosAtualizados = atualizacaoProdutoSchema.parse(req.body);

    const produto = await produtoService.atualizarProduto(
        produtoId,
        dadosAtualizados
    );

    return res.status(200).json({
        message: "Produto atualizado com sucesso",
        produto,
    });
}

export async function deletarProduto(req: Request, res: Response ) {
    const usuarioId = req.usuarioId

    if( usuarioId === undefined) {
       res.status(401).json({
        message: "não autenticado"
       })
    }

    const produtoId = Number(req.params.id);
    if(!Number.isInteger(produtoId) || produtoId <= 0) {
        res.status(400).json({
            message: "id informado inválido"
        })
    }

    const produto = await deletarProdutoService(produtoId) 
    return res.status(200).json({
        message: "produto deletado com sucesso",
        data: produto
    })
    
}