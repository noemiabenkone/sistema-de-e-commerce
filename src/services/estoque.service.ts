
import type { z } from "zod";
import { estoqueSchema, ProdAtualizadosSchema} from "../validations/estoque.schema.js";
import { AppError } from "../errors/AppError.js";
import { prisma } from "./produto.service.js";

type DadosEstoque = z.infer<typeof estoqueSchema>;
type DadosAtualizacaoEstoque = z.infer<typeof ProdAtualizadosSchema>;

export async function criarEstoque(
    produtoId: number,
    dados: DadosEstoque
) {
    const produtoCadastrado = await prisma.produto.findUnique({
        where: { id: produtoId }
    });

    if (!produtoCadastrado) {
        throw new AppError("Produto não cadastrado", 404);
    }

    const estoque = await prisma.estoque.create({
        data: {
            produtoId,
            quantidade: dados.quantidade
        }
    });

    return estoque;
}

export async function consultarEstoque(produtoId: number) {
    const estoque = await prisma.estoque.findUnique({
        where: { produtoId }
    });

    if (!estoque) {
        throw new AppError("Estoque não encontrado para este produto", 404);
    }

    return estoque;
}

export async function atualizarEstoque(produtoId: number,dados: DadosAtualizacaoEstoque) {
    const estoqueExistente = await prisma.estoque.findUnique({
        where: { produtoId }
    });

    if (!estoqueExistente) {
        throw new AppError("Estoque não encontrado para este produto", 404);
    }

    if (dados.quantidade === undefined) {
        throw new AppError("Informe a quantidade para atualizar", 400);
    }

    const estoqueAtualizado = await prisma.estoque.update({
        where: { produtoId },
        data: {
            quantidade: dados.quantidade
        }
    });

    return estoqueAtualizado;
}


export async function deletarEstoque(produtoId: number) {
    const estoqueExistente = await prisma.estoque.findUnique({
        where: { produtoId }
    });

    if (!estoqueExistente) {
        throw new AppError("Estoque não encontrado para este produto", 404);
    }

    const estoqueDeletado = await prisma.estoque.delete({
        where: { produtoId }
    });

    return estoqueDeletado;
}



