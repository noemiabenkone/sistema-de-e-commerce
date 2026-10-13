import Router from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/clientes", authMiddleware, (req, res) => {
    res.json({
        message: "Rota de clientes",
        clienteId: req.clienteId
    })
})

export default router;
