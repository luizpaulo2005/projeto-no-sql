import mongoose from 'mongoose'

interface Evento {
  idLocal: mongoose.Schema.Types.ObjectId
  idCategoria: mongoose.Schema.Types.ObjectId
  idUsuario: mongoose.Schema.Types.ObjectId
  nome: string
  descricao: string
  inicio: Date
  fim: Date
  endereco: string
}

const eventoSchema = new mongoose.Schema<Evento>({
  idLocal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Local',
    required: true,
  },
  idCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  inicio: {
    type: Date,
    required: true,
  },
  fim: {
    type: Date,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
})

const Evento = mongoose.model('Evento', eventoSchema)

export { Evento }
