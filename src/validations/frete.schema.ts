import zod from "zod";

export const freteSchema = zod.object({
    pedidoId: zod.number().int().positive(),
    valor: zod.number().nonnegative(),
    prazoEntrega: zod.string().min(1).max(50),
});