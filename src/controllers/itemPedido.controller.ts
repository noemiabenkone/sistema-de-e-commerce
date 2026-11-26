import type { Request, Response } from "express";
import { itemPedidoSchema } from "../validations/itemPedido.schema.js";
import {
  criarItemPedido as criarItemPedidoService,
  buscarPedidoPorId as buscarPedidoPorIdService
} from "../services/itemPedido.service.js";

export async function criarItemPedido(req: Request, res: Response) {
  const clienteId = req.clienteId;

  if (clienteId === undefined) {
    return res.status(401).json({
      message: "Não autenticado"
    });
  }

  const pedidoId = Number(req.params.pedidoId);

  if (!Number.isInteger(pedidoId) || pedidoId <= 0) {
    return res.status(400).json({
      message: "ID do pedido inválido"
    });
  }

  const dadosValidados = itemPedidoSchema.parse(req.body);

  const itemPedido = await criarItemPedidoService(clienteId,pedidoId,dadosValidados);

  return res.status(201).json({
    message: "Item do pedido criado com sucesso",
    itemPedido
  });
}

export async function buscarPedidoPorId(req: Request, res: Response) {
    const clienteId = req.clienteId

    if(clienteId === undefined) {
      return res.status(401).json({
        message: "nao autenticado"
      })
    }

    const pedidoId = Number(req.pedidoId)

    if(!Number.isInteger(pedidoId) || pedidoId <= 0) {
      return res.status(400).json({
        message: "ID informado invalido"
      })
    }

    const pedido = await buscarPedidoPorIdService(clienteId, pedidoId) 
    res.status(200).json({
      message: "Pedido encontrado com sucesso",
      pedido
    })
}