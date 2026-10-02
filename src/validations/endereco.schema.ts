import zod from "zod";

export const enderecoSchema = zod.object({
    tipoLogradouro: zod.string().min(1).max(50),
    nomeLogradouro: zod.string().min(1).max(100),
    numero: zod.number().int().positive(),
    complemento: zod.string().max(100).optional(),
    bairro: zod.string().min(1).max(50),
    cidade: zod.string().min(1).max(50),
    estado: zod.string().min(2).max(2),
    cep: zod.string().regex(/^\d{5}-\d{3}$/),
})