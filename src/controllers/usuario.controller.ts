import type { Request, Response} from "express"
import { atualizarUsuarioSchema, usuarioSchema } from "../validations/usuario.schema.js"
import { criarUsuario as criarUsuarioService} from "../services/usuario.service.js"
import  loginUsuarioService from "../services/authUsuario.service.js"
import { buscarMeuPerfil as buscarMeuPerfilService} from "../services/usuario.service.js"
import { atualizarUsuario as atualizarUsuarioService} from "../services/usuario.service.js"
import { deletarUsuario as deletarUsuarioService} from "../services/usuario.service.js"



export async function criarUsuario(req: Request, res: Response) {
    const dadosValidados = usuarioSchema.parse(req.body);

    const usuario = await criarUsuarioService(dadosValidados);

    const { senha, ...usuarioSemSenha } = usuario;

    return res.status(201).json({
        message: "Usuário criado com sucesso",
        data: usuarioSemSenha,
    });
}


export async function loginUsuario(req: Request, res: Response) {
    const { email, senha } = req.body;

    const resultado = await loginUsuarioService(email, senha);

    return res.status(200).json({
        message: "Login realizado com sucesso",
        token: resultado.token,
    });
}


export async function buscarMeuPerfil(req: Request, res: Response) {
    const id = req.usuarioId;

    if (id === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    const usuario = await buscarMeuPerfilService(id);

    const { senha, ...usuarioSemSenha } = usuario;

    return res.status(200).json({
        message: "Perfil do usuário",
        data: usuarioSemSenha,
    });
}


export async function atualizarUsuario(req: Request, res: Response) {
    const id = req.usuarioId;

    if (id === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    const dadosValidados = atualizarUsuarioSchema.parse(req.body);

    const usuarioAtualizado = await atualizarUsuarioService(id, dadosValidados);

    const { senha, ...usuarioSemSenha } = usuarioAtualizado.usuario;

    return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        data: usuarioSemSenha,
    });
}

export async function deletarUsuario(req: Request, res: Response) {
    const id = req.usuarioId;

    if (id === undefined) {
        return res.status(401).json({
            message: "Não autenticado",
        });
    }

    await deletarUsuarioService(id);

    return res.status(200).json({
        message: "Usuário deletado com sucesso",
    });
}
