import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import type { z } from "zod";
import { clienteSchema } from "../validations/cliente.schema.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

type DadosCliente = z.infer<typeof clienteSchema>;

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