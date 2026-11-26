import "dotenv/config";
import { prisma } from "./produto.service.js";
import { AppError } from "../errors/AppError.js";

export async function adicionarItemCarrinho(clienteId: number, dados: { produtoId: number; quantidade: number }) {
    let carrinho = await prisma.carrinho.findUnique({
        where: { clienteId }
    });

    if (!carrinho) {
        carrinho = await prisma.carrinho.create({
            data: { clienteId }
        });
    }

    const produto = await prisma.produto.findUnique({
        where: { id: dados.produtoId }
    });

    if (!produto || !produto.ativo) {
        throw new AppError("Produto não encontrado ou inativo.", 404);
    }

    const estoque = await prisma.estoque.findUnique({
        where: { produtoId: dados.produtoId }
    });

    if (!estoque || estoque.quantidade < dados.quantidade) {
        throw new AppError("Estoque insuficiente para este produto.", 400);
    }

    const itemExistente = await prisma.itemCarrinho.findFirst({
        where: {
            carrinhoId: carrinho.id,
            produtoId: dados.produtoId
        }
    });

    if (itemExistente) {
        return await prisma.itemCarrinho.update({
            where: { id: itemExistente.id },
            data: { quantidade: itemExistente.quantidade + dados.quantidade }
        });
    }

    return await prisma.itemCarrinho.create({
        data: {
            carrinhoId: carrinho.id,
            produtoId: dados.produtoId,
            quantidade: dados.quantidade
        }
    });
}

export async function listarItensCarrinho(clienteId: number) {
    const carrinho = await prisma.carrinho.findUnique({
        where: { clienteId },
        include: {
            itens: {
                include: {
                    produto: true
                }
            }
        }
    });

    if (!carrinho) {
        return [];
    }

    return carrinho.itens;
}

export async function removerItemCarrinho(clienteId: number, produtoId: number) {
    const carrinho = await prisma.carrinho.findUnique({
        where: { clienteId }
    });

    if (!carrinho) {
        throw new AppError("Carrinho não encontrado.", 404);
    }

    const item = await prisma.itemCarrinho.findFirst({
        where: {
            carrinhoId: carrinho.id,
            produtoId
        }
    });

    if (!item) {
        throw new AppError("Item não encontrado no carrinho.", 404);
    }

    return await prisma.itemCarrinho.delete({
        where: { id: item.id }
    });
}

export async function atualizarQuantidadeItemCarrinho(clienteId: number, produtoId: number, quantidade: number) {
    const carrinho = await prisma.carrinho.findUnique({
        where: { clienteId }
    });

    if (!carrinho) {
        throw new AppError("Carrinho não encontrado.", 404);
    }

    const item = await prisma.itemCarrinho.findFirst({
        where: {
            carrinhoId: carrinho.id,
            produtoId
        }
    });

    if (!item) {
        throw new AppError("Item não encontrado no carrinho.", 404);
    }

    if (quantidade <= 0) {
        return await prisma.itemCarrinho.delete({
            where: { id: item.id }
        });
    }

    const estoque = await prisma.estoque.findUnique({
        where: { produtoId }
    });

    if (!estoque || estoque.quantidade < quantidade) {
        throw new AppError("Estoque insuficiente para este produto.", 400);
    }

    return await prisma.itemCarrinho.update({
        where: { id: item.id },
        data: { quantidade }
    });
}