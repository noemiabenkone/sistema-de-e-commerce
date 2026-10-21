import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import type { z } from "zod";
import { AppError } from "../errors/AppError.js";
import type { produtoSchema } from "../validations/produto.schema.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

type DadosProduto = z.infer<typeof produtoSchema>;


export async function cadastrarProduto(dados: DadosProduto, id: number) {
    const produtoExistente = await prisma.produto.findUnique({
        where:{id}
    })

    if (produtoExistente) {
        throw new AppError("Produto já cadastrado", 400);
    }

    const novoProduto = await prisma.produto.create({
        data: dados
    });

    return novoProduto;
}

export async function listarProdutos() {
    const produtos = await prisma.produto.findMany();
    return produtos;
}

export async function buscarProdutoPorId(id: number) {
    const produto = await prisma.produto.findUnique({
        where: { id }
    });
    return produto;
}

export async function atualizarProduto(id: number, dados: DadosProduto) {
    const produtoExistente = await prisma.produto.findUnique({
        where: { id }
    });

    if (!produtoExistente) {
        throw new AppError("Produto não encontrado", 404);
    }

    const produtoAtualizado = await prisma.produto.update({
        where: { id },
        data: dados
    });

    return produtoAtualizado;
}