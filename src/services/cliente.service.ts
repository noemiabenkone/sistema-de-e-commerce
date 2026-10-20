import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import type { z } from "zod";
import { clienteSchema } from "../validations/cliente.schema.js";
import { AppError } from "../errors/AppError.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

type DadosCliente = z.infer<typeof clienteSchema>;

type DadosAtualizacaoCliente = {
    nome?: string | undefined;
    sobrenome?: string | undefined;
    email?: string | undefined;
    senha?: string | undefined;
    cpf?: string | undefined;
    dataNascimento?: string | undefined;
    celular?: string | undefined;
};

export default async function criarCliente(dados: DadosCliente) {
    const clienteExistente = await prisma.cliente.findUnique({
        where: {
            email: dados.email,
        },
    });

    if (clienteExistente) {
        throw new Error("Cliente já cadastrado");
    }

    const cpfExistente = await prisma.cliente.findUnique({
        where: {
            cpf: dados.cpf,
        },
    });

    if (cpfExistente) {
        throw new Error("CPF já cadastrado");
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const cliente = await prisma.cliente.create({
        data: {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            email: dados.email,
            cpf: dados.cpf,
            dataNascimento: new Date(dados.dataNascimento),
            celular: dados.celular,
            senha: senhaHash,
        },
    });

    return { cliente };
}

export async function atualizarCliente(
    id: number,
    dados: DadosAtualizacaoCliente
) {
    const clienteExistente = await prisma.cliente.findUnique({
        where: { id },
    });

    if (!clienteExistente) {
        throw new AppError("Cliente não encontrado", 404);
    }

    if (dados.email && dados.email !== clienteExistente.email) {
        const emailExistente = await prisma.cliente.findUnique({
            where: { email: dados.email },
        });

        if (emailExistente) {
            throw new AppError("E-mail já cadastrado", 400);
        }
    }

    if (dados.cpf && dados.cpf !== clienteExistente.cpf) {
        const cpfExistente = await prisma.cliente.findUnique({
            where: { cpf: dados.cpf },
        });

        if (cpfExistente) {
            throw new AppError("CPF já cadastrado", 400);
        }
    }

    const dadosAtualizacao: {
        nome?: string;
        sobrenome?: string;
        email?: string;
        cpf?: string;
        celular?: string;
        dataNascimento?: Date;
        senha?: string;
    } = {};

    if (dados.nome !== undefined) {
        dadosAtualizacao.nome = dados.nome;
    }

    if (dados.sobrenome !== undefined) {
        dadosAtualizacao.sobrenome = dados.sobrenome;
    }

    if (dados.email !== undefined) {
        dadosAtualizacao.email = dados.email;
    }

    if (dados.cpf !== undefined) {
        dadosAtualizacao.cpf = dados.cpf;
    }

    if (dados.celular !== undefined) {
        dadosAtualizacao.celular = dados.celular;
    }

    if (dados.dataNascimento !== undefined) {
        dadosAtualizacao.dataNascimento = new Date(
            dados.dataNascimento
        );
    }

    if (dados.senha !== undefined) {
        dadosAtualizacao.senha = await bcrypt.hash(
            dados.senha,
            10
        );
    }

    const cliente = await prisma.cliente.update({
        where: { id },
        data: dadosAtualizacao,
    });

    return { cliente };
}

export async function buscarMeuPerfil(id: number) {
    const cliente = await prisma.cliente.findUnique({
        where: {id},
    })
   if(!cliente) {
       throw new AppError("Cliente não encontrado", 404);
   }
   return { cliente };
}

export async function deletarCliente(id: number) {
    const clienteExistente = await prisma.cliente.findUnique({
        where: { id },
    })
    if(!clienteExistente) {
       throw new AppError("Cliente não encontrado", 404);    }

    await prisma.cliente.delete({
        where: { id },
    });
    return { message: "Cliente deletado com sucesso" };
}
