import type { Request, Response } from "express";
import { enderecoSchema } from "../validations/endereco.schema.js";
import {cadastrarEndereco as cadastrarEnderecoService} from "../services/endereco.service.js"
import {listarEnderecos as listarEnderecosService} from "../services/endereco.service.js"
import {atualizarEndereco as atualizarEnderecoService} from "../services/endereco.service.js"
import {deletarEndereco as deletarEnderecoService} from "../services/endereco.service.js"

export async function cadastrarEndereco(req: Request, res: Response ){
     const clienteId = req.clienteId

     if(clienteId === undefined) {
        return res.status(401).json({
            message: "nao autenticado"
        })
     }
     const dadosValidados = enderecoSchema.parse(req.body)
     
     const endereco = await cadastrarEnderecoService(clienteId, dadosValidados)
     res.status(201).json({
        message: "endereco cadastrado com sucesso ",
        data: endereco
     })
}

export async function listarEnderecos(req: Request, res: Response ){
    const clienteId = req.clienteId

    if(clienteId === undefined) {
        return res.status(401).json({
            message: "nao autenticado"
        })
     }
     const enderecos = await listarEnderecosService(clienteId)
     res.status(200).json({
        message: "enderecos listados com sucesso ",
        data: enderecos
     })
}

export async function atualizarEndereco(req: Request, res: Response ){
    const clienteId = req.clienteId
    const enderecoId = Number(req.params.enderecoId)

    if(clienteId === undefined) {
        return res.status(401).json({
            message: "nao autenticado"
        })
     }

     if(!Number.isInteger(enderecoId) || enderecoId <= 0) {
        return res.status(400).json({
            message: "enderecoId invalido"
        })
     }
     const dadosValidados = enderecoSchema.parse(req.body)
     
     const endereco = await atualizarEnderecoService(clienteId, enderecoId, dadosValidados)
     res.status(200).json({
        message: "endereco atualizado com sucesso ",
        data: endereco
     })
}

export async function deletarEndereco(req: Request, res: Response ){
    const clienteId = req.clienteId
    const enderecoId = Number(req.params.enderecoId)

    if(clienteId === undefined) {
        return res.status(401).json({
            message: "nao autenticado"
        })
     }

     if(!Number.isInteger(enderecoId) || enderecoId <= 0) {
        return res.status(400).json({
            message: "enderecoId invalido"
        })
     }
     
      await deletarEnderecoService(clienteId, enderecoId)
     res.status(200).json({
        message: "endereco deletado com sucesso ",
        
     })
}