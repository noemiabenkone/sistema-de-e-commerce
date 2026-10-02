import zod from "zod";

export const descontoSchema = zod.object({
    tipo: zod.enum(["PERCENTUAL", "VALOR_FIXO"]),
    valor: zod.number().nonnegative(),
    dataInicio: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dataFim: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: zod.boolean().default(false),
});