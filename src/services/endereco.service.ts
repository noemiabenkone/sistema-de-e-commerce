import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import {z}from "zod"
import type { enderecoSchema } from "../validations/endereco.schema.js";
import { AppError } from "../errors/AppError.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });


type dados = z.infer<typeof enderecoSchema>

export async function cadastrarEndereco( clienteId: number, dadosValidados: dados){
    const quantidadeEndereco = await prisma.endereco.count({
        where: {clienteId}
    })
    let enderecoPadrao = dadosValidados.padrao
    if(quantidadeEndereco === 0) {
        enderecoPadrao = true
    }

    if (enderecoPadrao) {
        await prisma.endereco.updateMany({
            where: { 
                clienteId: clienteId,
                padrao: true 
            },
            data: { 
                padrao: false 
            }
        });
    }

    const novoEndereco = await prisma.endereco.create({
        data: {
            tipoLogradouro: dadosValidados.tipoLogradouro,
            nomeLogradouro: dadosValidados.nomeLogradouro,
            numero: dadosValidados.numero,
            
            complemento: dadosValidados.complemento ?? null, 
            
            bairro: dadosValidados.bairro,
            cidade: dadosValidados.cidade,
            estado: dadosValidados.estado,
            cep: dadosValidados.cep,
            
            padrao: enderecoPadrao ?? false, 
            
            clienteId: clienteId
        }
    });

    return novoEndereco;

}

export async function listarEnderecos(clienteId: number) {
    const enderecos = await prisma.endereco.findMany({
        where: { clienteId },
        orderBy: { padrao: 'desc' }
    });
    return enderecos;
}

export async function atualizarEndereco(clienteId: number, enderecoId: number, dadosValidados: dados) {
    const enderecoExistente = await prisma.endereco.findUnique({
        where: { id: enderecoId }
    });

    if (!enderecoExistente || enderecoExistente.clienteId !== clienteId) {
        throw new AppError("Endereço não encontrado ou não pertence ao cliente.", 404);
    }

    let enderecoPadrao = dadosValidados.padrao;
    if (enderecoPadrao) {
        await prisma.endereco.updateMany({
            where: { 
                clienteId: clienteId,
                padrao: true 
            },
            data: { 
                padrao: false 
            }
        });
    }

    const enderecoAtualizado = await prisma.endereco.update({
        where: { id: enderecoId },
        data: {
            tipoLogradouro: dadosValidados.tipoLogradouro,
            nomeLogradouro: dadosValidados.nomeLogradouro,
            numero: dadosValidados.numero,
            complemento: dadosValidados.complemento ?? null,
            bairro: dadosValidados.bairro,
            cidade: dadosValidados.cidade,
            estado: dadosValidados.estado,
            cep: dadosValidados.cep,
            padrao: enderecoPadrao ?? false
        }
    });

    return enderecoAtualizado;
}

export async function deletarEndereco(clienteId: number, enderecoId: number) {
    const enderecoExistente = await prisma.endereco.findUnique({
        where: { id: enderecoId }
    });

    if (!enderecoExistente || enderecoExistente.clienteId !== clienteId) {
        throw new AppError("Endereço não encontrado ou não pertence ao cliente.", 404);
    }

    await prisma.endereco.delete({
        where: { id: enderecoId }
    });
}