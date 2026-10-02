import zod from "zod";

export const pagamentoSchema = zod.object({
    metodo: zod.enum([
        "CARTAO_CREDITO",
        "CARTAO_DEBITO",
        "PIX",
        "BOLETO"
    ]),
    pedidoId: zod.number().int().positive(),
});