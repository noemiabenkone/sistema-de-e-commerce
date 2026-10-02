import zod from "zod";

export const devolucaoSchema = zod.object({
    descricao: zod.string().min(1).max(255),
    pedidoId: zod.number().int().positive(),
});