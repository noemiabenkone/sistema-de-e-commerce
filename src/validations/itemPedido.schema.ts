import zod from "zod";

export const itemCarrinhoSchema = zod.object({
    carrinhoId: zod.number().int().positive(),
    produtoId: zod.number().int().positive(),
    quantidade: zod.number().int().positive(),
});