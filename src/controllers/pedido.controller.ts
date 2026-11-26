import type {Request, Response} from "express"
import {criarPedido as criarPedidoService} from "../services/pedido.service.js"
import {buscarPedidos as buscarPedidosService,buscarPedidoPorId as buscarPedidoPorIdService} from "../services/pedido.service.js";
import { pedidoSchema } from "../validations/pedido.schema.js"


export async function criarPedido(req: Request, res: Response) {
    const clienteId = req.clienteId
    
    if(clienteId === undefined) {
        return res.status(401).json({
            message: " nao autenticado"
        })
    }

    
    const dadosValidados = pedidoSchema.parse(req.body)

    const pedido = await criarPedidoService(clienteId, dadosValidados) 

    res.status(201).json({
        message: "pedido criado com sucesso",
        data: pedido
    })
}

export async function buscarPedidos(req: Request, res: Response) {
    const clienteId = req.clienteId;

    if (clienteId === undefined) {
        return res.status(401).json({
            message: "Não autenticado."
        });
    }

    const pedidos = await buscarPedidosService(clienteId);

    return res.status(200).json({
        message: "Pedidos listados com sucesso.",
        pedidos
    });
}

export async function buscarPedidoPorId(req: Request, res: Response) {
    const clienteId = req.clienteId;

    if (clienteId === undefined) {
        return res.status(401).json({
            message: "Não autenticado."
        });
    }

    const pedidoId = Number(req.params.id);

    if (!Number.isInteger(pedidoId) || pedidoId <= 0) {
        return res.status(400).json({
            message: "ID do pedido inválido."
        });
    }

    const pedido = await buscarPedidoPorIdService(clienteId, pedidoId);

    return res.status(200).json({
        message: "Pedido encontrado com sucesso.",
        pedido
    });
}