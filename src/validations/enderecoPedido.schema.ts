import zod from "zod";

export const enderecoPedidoSchema = zod.object({ 
    pedidoId: zod.number().int().positive(),
});