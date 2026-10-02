import zod from "zod";

export const pedidoSchema = zod.object({
    clienteId: zod.number().int().positive(),
});