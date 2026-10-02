import zod from "zod";

export const usuarioSchema = zod.object({
    nome: zod.string().min(3).max(100),
    sobrenome: zod.string().min(3).max(100),
    email: zod.string().email(),
    senha: zod.string().min(6).max(20),
    cpf: zod.string().regex(/^\d{11}$/),
    dataNascimento: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});