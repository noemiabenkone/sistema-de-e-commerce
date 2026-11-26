import zod from "zod";

export const itemPedidoSchema = zod.object({
    pedidoId: zod.number().int().positive(),
    produtoId: zod.number().int().positive(),
    quantidade: zod.number().int().positive(),
    preco: zod.number().nonnegative(),
    
});