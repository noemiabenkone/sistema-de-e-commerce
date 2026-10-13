import {prisma} from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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
const token = jwt.sign(
        { clienteId: cliente.id },
           process.env.JWT_SECRET!,
       { expiresIn: "1h" }
   );
    return { cliente, token }; 
}
