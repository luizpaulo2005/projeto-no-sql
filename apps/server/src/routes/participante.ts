import { Router } from 'express'

import {
  criarParticipante,
  editarParticipante,
  excluirParticipante,
  obterParticipante,
  obterParticipantes,
} from '@/controllers/participante'

const ParticipanteRouter = Router()

ParticipanteRouter.get('/', obterParticipantes)
ParticipanteRouter.post('/', criarParticipante)
ParticipanteRouter.get('/:id', obterParticipante)
ParticipanteRouter.put('/:id', editarParticipante)
ParticipanteRouter.delete('/:id', excluirParticipante)

export { ParticipanteRouter }
