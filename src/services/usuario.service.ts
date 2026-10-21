import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import type { z } from "zod";
import { AppError } from "../errors/AppError.js";
import type { atualizarUsuarioSchema, usuarioSchema } from "../validations/usuario.schema.js";
import bcrypt from "bcrypt";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

type DadosUsuario = z.infer<typeof usuarioSchema>;
type DadosAtualizacaoUsuario = z.infer<typeof atualizarUsuarioSchema>;


export async function criarUsuario(dados: DadosUsuario) {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: {
            email: dados.email,
        },
    });

    if (usuarioExistente) {
        throw new AppError("Usuário já cadastrado", 400);
    }

    const cpfExistente = await prisma.usuario.findUnique({
        where: {
            cpf: dados.cpf,
        },
    });

    if (cpfExistente) {
        throw new AppError("CPF já cadastrado", 400);
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await prisma.usuario.create({
        data: {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            email: dados.email,
            cpf: dados.cpf,
            dataNascimento: new Date(dados.dataNascimento),
            senha: senhaHash,

        }
            
    })
    
    return usuario;
}

export async function buscarMeuPerfil(id: number) {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: id,
        },
    });

    if (!usuario) {
        throw new AppError("Usuário não encontrado", 404);
    }

    return usuario;
}

export async function atualizarUsuario(
    id: number,
    dados: z.infer<typeof atualizarUsuarioSchema>
) {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuarioExistente) {
        throw new AppError("Usuário não encontrado", 404);
    }

    if (dados.email && dados.email !== usuarioExistente.email) {
        const emailExistente = await prisma.usuario.findUnique({
            where: { email: dados.email },
        });

        if (emailExistente) {
            throw new AppError("E-mail já cadastrado", 400);
        }
    }

    if (dados.cpf && dados.cpf !== usuarioExistente.cpf) {
        const cpfExistente = await prisma.usuario.findUnique({
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

    const usuario = await prisma.usuario.update({
        where: { id },
        data: dadosAtualizacao,
    });

    return { usuario };
}

export async function deletarUsuario(id: number) {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: { id },
    });

    if (!usuarioExistente) {
        throw new AppError("Usuário não encontrado", 404);
    }

const usuario = await prisma.usuario.delete({
        where: { id },
    });

    return { usuario };
}