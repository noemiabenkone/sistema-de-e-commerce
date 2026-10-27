
import zod from "zod";

export const estoqueSchema = zod.object({
    quantidade: zod.number().int().nonnegative(),
});

export const ProdAtualizadosSchema = estoqueSchema.partial();
