
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não informado",
        });
    }

    const [tipo, token, ...resto] = authHeader.split(" ");

    if (tipo !== "Bearer" || !token || resto.length > 0) {
        return res.status(401).json({
            message: "Formato de token inválido",
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            message: "Erro de configuração do servidor",
        });
    }

    try {
        const decoded = jwt.verify(token, secret);

        if (
            typeof decoded === "string" ||
            !("clienteId" in decoded) ||
            typeof decoded.clienteId !== "number"
        ) {
            return res.status(401).json({
                message: "Token inválido",
            });
        }

        req.clienteId = decoded.clienteId;

        return next();
    } catch {
        return res.status(401).json({
            message: "Token inválido ou expirado",
        });
    }
}
