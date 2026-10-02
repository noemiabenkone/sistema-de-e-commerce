import zod from "zod";

export const avaliacaoSchema = zod.object({
    nota: zod.number().int().min(1).max(5),
    mensagem: zod.string().min(1).max(255),
    pedidoId: zod.number().int().positive(),
    produtoId: zod.number().int().positive(),
});