import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

export default async function criarClient(nome: string, sobrenome: string, email: string, cpf: string, dataNascimento: string, celular: string, senha: string) {
    const clienteExistente = await prisma.cliente.findUnique({
        where:{
            email: email
        }
    })
    const cpfExistente = await prisma.cliente.findUnique({
    where: {
        cpf: cpf
    }
});
    if(clienteExistente){
        throw new Error("Cliente já cadastrado")
    }
    if (cpfExistente) {
    throw new Error("CPF já cadastrado");
}
    const senhaHash = await bcrypt.hash(senha, 10);
    const cliente = await prisma.cliente.create({
        data: {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cpf: cpf,
            dataNascimento: new Date(dataNascimento),
            celular: celular,
            senha: senhaHash,
        }
    })

    return cliente;
}