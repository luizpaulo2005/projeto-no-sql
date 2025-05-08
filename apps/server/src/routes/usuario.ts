import { Router } from 'express'

import {
  criarUsuario,
  editarUsuario,
  excluirUsuario,
  obterUsuario,
  obterUsuarios,
} from '@/controllers/usuario'

const UsuarioRoute = Router()

UsuarioRoute.get('/', obterUsuarios)
UsuarioRoute.post('/', criarUsuario)
UsuarioRoute.get('/:id', obterUsuario)
UsuarioRoute.put('/:id', editarUsuario)
UsuarioRoute.delete('/:id', excluirUsuario)

export { UsuarioRoute }
