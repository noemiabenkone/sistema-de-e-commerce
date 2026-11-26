
declare global {
    namespace Express {
        interface Request {
            clienteId?: number;
            produtoId?: number;
            usuarioId?: number;
            pedidoId?: number;
            endereco?: number;

        }
    }
}

export {};
