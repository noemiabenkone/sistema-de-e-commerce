import { AppError } from "../errors/AppError.js";
import {prisma} from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function loginUsuario(email: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    })
    if (!usuario) {
    throw new AppError("Email ou senha inválidos", 401);
}
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
    throw new AppError("Email ou senha inválidos", 401);
}
const token = jwt.sign({ usuarioId: usuario.id },process.env.JWT_SECRET!,{ expiresIn: "1h" });
    return { usuario, token }; 
}