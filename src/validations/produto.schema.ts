import zod from "zod";

export const produtoSchema = zod.object({
    nome: zod.string().min(3).max(100),
    descricao: zod.string().max(200),
    preco: zod.number().nonnegative(),
    ativo: zod.boolean().default(true),
});
