import zod from "zod";

export const carrinhoSchema = zod.object({
    clienteId: zod.number().int().positive(),
})