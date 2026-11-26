
import zod from "zod";

const itemPedidoInputSchema = zod.object({
    produtoId: zod.number().int().positive(),
    quantidade: zod.number().int().positive()
});

export const pedidoSchema = zod.object({
    enderecoId: zod.number().int().positive(
        "ID do endereço inválido"
    ),

    itens: zod.array(itemPedidoInputSchema).min(
        1,
        "O pedido deve conter pelo menos um item"
    )
});

export type PedidoInput = zod.infer<typeof pedidoSchema>;
