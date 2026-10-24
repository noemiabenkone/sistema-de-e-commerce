
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import type { z } from "zod";
import { AppError } from "../errors/AppError.js";
import type {
    atualizacaoProdutoSchema,
    produtoSchema,
} from "../validations/produto.schema.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

type DadosProduto = z.infer<typeof produtoSchema>;
type DadosAtualizacaoProduto = z.infer<typeof atualizacaoProdutoSchema>;

export async function cadastrarProduto(dados: DadosProduto, id: number) {
    const usuarioAutenticado = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuarioAutenticado) {
        throw new AppError("Usuário não autenticado", 401);
    }

    const produto = await prisma.produto.create({
        data: dados,
    });

    return produto;
}

export async function listarProdutos() {
    const produtos = await prisma.produto.findMany();

    return produtos;
}

export async function buscarProdutoPorId(id: number) {
    const produto = await prisma.produto.findUnique({
        where: { id },
    });

    if (!produto) {
        throw new AppError("Produto não encontrado", 404);
    }

    return produto;
}


export async function atualizarProduto(
    id: number,
    dados: DadosAtualizacaoProduto
) {
    const produtoExistente = await prisma.produto.findUnique({
        where: { id },
    });

    if (!produtoExistente) {
        throw new AppError("Produto não encontrado", 404);
    }

    const dadosParaAtualizar = {
        ...(dados.nome !== undefined && { nome: dados.nome }),
        ...(dados.descricao !== undefined && {
            descricao: dados.descricao,
        }),
        ...(dados.preco !== undefined && { preco: dados.preco }),
        ...(dados.ativo !== undefined && { ativo: dados.ativo }),
    };

    const produtoAtualizado = await prisma.produto.update({
        where: { id },
        data: dadosParaAtualizar,
    });

    return produtoAtualizado;
}

export async function deletarProduto(id: number) {
    const produtoExistente = await prisma.produto.findUnique({
        where: {id}, 
    })
    if(!produtoExistente) {
        throw new AppError("produto nao encontrado", 400)
    }
    
    const produto = await prisma.produto.delete({
        where: {id}
    })
    return produto
} 
