import { Router } from 'express'

import {
  criarLocal,
  editarLocal,
  excluirLocal,
  obterLocais,
  obterLocal,
} from '@/controllers/local'

const LocalRouter = Router()

LocalRouter.get('/', obterLocais)
LocalRouter.post('/', criarLocal)
LocalRouter.get('/:id', obterLocal)
LocalRouter.put('/:id', editarLocal)
LocalRouter.delete('/:id', excluirLocal)

export { LocalRouter }
