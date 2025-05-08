import mongoose from 'mongoose'

interface Participante {
  idCliente: mongoose.Schema.Types.ObjectId
  idEvento: mongoose.Schema.Types.ObjectId
}

const participanteSchema = new mongoose.Schema<Participante>({
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  idEvento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: true,
  },
})

const Participante = mongoose.model('Participante', participanteSchema)

export { Participante }
