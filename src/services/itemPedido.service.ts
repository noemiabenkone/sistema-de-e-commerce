import "dotenv/config";
import { prisma } from "./produto.service.js";
import {itemPedidoSchema} from "../validations/itemPedido.schema.js"
import type { z } from "zod";
import { AppError } from "../errors/AppError.js";

type DadosItemPedido = z.infer<typeof itemPedidoSchema>;

export async function criarItemPedido(
    clienteId: number,
    pedidoId: number,
    dados: DadosItemPedido
) {
    const pedido = await prisma.pedido.findFirst({
        where: {
            id: pedidoId,
            cliente: {
                clienteId: clienteId
            }
        }
    });

    if (!pedido) {
        throw new AppError("Pedido não encontrado ou não pertence a este cliente", 404);
    }

    const estoque = await prisma.estoque.findUnique({
        where: {
            produtoId: dados.produtoId
        }
    });

    if (!estoque) {
        throw new AppError("Estoque não encontrado para este produto", 404);
    }

    if (estoque.quantidade < dados.quantidade) {
        throw new AppError("Estoque insuficiente", 400);
    }

    const itemPedido = await prisma.itemPedido.create({
        data: {
            pedidoId: pedidoId,
            produtoId: dados.produtoId,
            quantidade: dados.quantidade,
            preco: dados.preco
        }
    });

    return itemPedido;
}
export async function buscarPedidoPorId(clienteId: number, pedidoId:  number){
    const pedido = await prisma.pedido.findFirst({
        where: {
            id: pedidoId,
            clienteId: clienteId
        },
        include: {
            itensPedidos: {
                include:{
                    produto:{
                        select: {
                            nome: true,
                            descricao: true
                        }
                    }
                }
            }
        }
    })

    if(!pedido) {
        throw new AppError("pedido nao encontrado ",404);
    }

    return pedido;
}