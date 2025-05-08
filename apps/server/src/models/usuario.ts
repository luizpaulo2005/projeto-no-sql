import mongoose from 'mongoose'

interface Usuario {
  nome: string
  email: string
  senha: string
}

const usuarioSchema = new mongoose.Schema<Usuario>({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export { Usuario }
