import type { Request, Response } from "express";
import * as produtoService from "../services/produto.service.js";
import type { z } from "zod";
import { produtoSchema } from "../validations/produto.schema.js";


export async function cadastrarProduto(req: Request, res: Response) {
    const dados: z.infer<typeof produtoSchema> = req.body;
    const id = Number(req.produtoId);
    const produto = await produtoService.cadastrarProduto(dados, id);
    return res.status(201).json({
        message: "Produto cadastrado com sucesso",
        produto,
    });
}