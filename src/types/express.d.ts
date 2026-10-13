
declare global {
    namespace Express {
        interface Request {
            clienteId?: number;
        }
    }
}

export {};
