import { Router } from 'express'

import {
  criarEvento,
  editarEvento,
  excluirEvento,
  obterEvento,
  obterEventos,
} from '@/controllers/evento'

const EventoRouter = Router()

EventoRouter.get('/', obterEventos)
EventoRouter.post('/', criarEvento)
EventoRouter.get('/:id', obterEvento)
EventoRouter.put('/:id', editarEvento)
EventoRouter.delete('/:id', excluirEvento)

export { EventoRouter }
