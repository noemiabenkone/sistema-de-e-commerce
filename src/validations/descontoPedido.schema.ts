import zod from "zod";

export const descontoPedidoSchema = zod.object({
    tipo: zod.enum(["PERCENTUAL", "VALOR_FIXO"]),
   valorAplicado: zod.number().nonnegative(),
   pedidoId: zod.number().int().positive(),

});