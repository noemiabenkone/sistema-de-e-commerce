import { prisma } from "./produto.service.js";
import { AppError } from "../errors/AppError.js";
import type { PedidoInput } from "../validations/pedido.schema.js";

export async function criarPedido(
    clienteId: number,
    dados: PedidoInput
) {
    return prisma.$transaction(async (tx) => {
        const endereco = await tx.endereco.findFirst({
            where: {
                id: dados.enderecoId,
                clienteId
            }
        });

        if (!endereco) {
            throw new AppError(
                "Endereço não encontrado ou não pertence ao cliente.",
                404
            );
        }

        const quantidadesPorProduto = new Map<number, number>();
        for (const item of dados.itens) {
            const atual = quantidadesPorProduto.get(item.produtoId) ?? 0;
            quantidadesPorProduto.set(item.produtoId, atual + item.quantidade);
        }

        let valorTotalItens = 0;
        const itensParaCriar: {
            produtoId: number;
            quantidade: number;
            preco: typeof produtoPreco;
        }[] = [];
        let produtoPreco!: Awaited<ReturnType<typeof tx.produto.findUnique>> extends infer T
            ? T extends { preco: infer P }
                ? P
                : never
            : never;

        for (const [produtoId, quantidadeTotal] of quantidadesPorProduto.entries()) {
            const produto = await tx.produto.findUnique({
                where: {
                    id: produtoId
                }
            });

            if (!produto || !produto.ativo) {
                throw new AppError(
                    `Produto ID ${produtoId} não encontrado ou inativo.`,
                    404
                );
            }

            const estoque = await tx.estoque.findUnique({
                where: {
                    produtoId
                }
            });

            if (!estoque || estoque.quantidade < quantidadeTotal) {
                throw new AppError(
                    `Estoque insuficiente para o produto: ${produto.nome}`,
                    400
                );
            }

            produtoPreco = produto.preco;
            const precoProduto = Number(produto.preco);
            valorTotalItens += precoProduto * quantidadeTotal;

            itensParaCriar.push({
                produtoId,
                quantidade: quantidadeTotal,
                preco: produto.preco
            });
        }

        const novoPedido = await tx.pedido.create({
            data: {
                clienteId,
                data: new Date(),
                status: "PENDENTE",
                valorTotal: valorTotalItens,
                itensPedidos: {
                    create: itensParaCriar
                },
                enderecoEntrega: {
                    create: {
                        tipoLogradouro: endereco.tipoLogradouro,
                        nomeLogradouro: endereco.nomeLogradouro,
                        numero: endereco.numero,
                        complemento: endereco.complemento ?? null,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        estado: endereco.estado,
                        cep: endereco.cep
                    }
                }
            },
            include: {
                itensPedidos: {
                    include: {
                        produto: true
                    }
                },
                enderecoEntrega: true
            }
        });

        const carrinho = await tx.carrinho.findUnique({
            where: {
                clienteId
            }
        });

        if (carrinho) {
            await tx.itemCarrinho.deleteMany({
                where: {
                    carrinhoId: carrinho.id
                }
            });
        }

        return novoPedido;
    });
}

export async function buscarPedidos(clienteId: number) {
    return prisma.pedido.findMany({
        where: {
            clienteId
        },
        orderBy: {
            data: "desc"
        },
        include: {
            itensPedidos: {
                include: {
                    produto: {
                        select: {
                            id: true,
                            nome: true,
                            descricao: true
                        }
                    }
                }
            },
            enderecoEntrega: true
        }
    });
}

export async function buscarPedidoPorId(clienteId: number, pedidoId: number) {
    const pedido = await prisma.pedido.findFirst({
        where: {
            id: pedidoId,
            clienteId
        },
        include: {
            itensPedidos: {
                include: {
                    produto: {
                        select: {
                            id: true,
                            nome: true,
                            descricao: true
                        }
                    }
                }
            },
            enderecoEntrega: true
        }
    });

    if (!pedido) {
        throw new AppError("Pedido não encontrado.", 404);
    }

    return pedido;
}