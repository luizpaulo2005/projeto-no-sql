import { Router } from 'express'

import {
  criarCategoria,
  editarCategoria,
  excluirCategoria,
  obterCategoria,
  obterCategorias,
} from '@/controllers/categoria'

const CategoriaRouter = Router()

CategoriaRouter.get('/', obterCategorias)
CategoriaRouter.post('/', criarCategoria)
CategoriaRouter.get('/:id', obterCategoria)
CategoriaRouter.put('/:id', editarCategoria)
CategoriaRouter.delete('/:id', excluirCategoria)

export { CategoriaRouter }
