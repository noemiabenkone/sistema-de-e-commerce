import {prisma} from "../lib/prisma.js";
import bcrypt from "bcrypt";
export default async function loginCliente(email: string, senha: string) {
    const cliente = await prisma.cliente.findUnique({
        where: {
            email: email
        }
    })
    if (!cliente) {
    throw new Error("Email ou senha inválidos");
}
    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
    throw new Error("Email ou senha inválidos");
}
    return cliente; 
}
