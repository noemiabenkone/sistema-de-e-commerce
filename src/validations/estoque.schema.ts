import zod from "zod";

export const estoqueSchema = zod.object({
    produtoId: zod.number().int().positive(),
    quantidade: zod.number().nonnegative(),
});