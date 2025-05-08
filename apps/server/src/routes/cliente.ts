import { Router } from 'express'

import {
  criarCliente,
  editarCliente,
  excluirCliente,
  obterCliente,
  obterClientes,
} from '@/controllers/cliente'

const ClienteRouter = Router()

ClienteRouter.get('/', obterClientes)
ClienteRouter.post('/', criarCliente)
ClienteRouter.get('/:id', obterCliente)
ClienteRouter.put('/:id', editarCliente)
ClienteRouter.delete('/:id', excluirCliente)

export { ClienteRouter }
