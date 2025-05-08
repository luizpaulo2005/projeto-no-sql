import mongoose from 'mongoose'

interface Cliente {
  nome: string
  email: string
  telefone: string
}

const clienteSchema = new mongoose.Schema<Cliente>({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
})

const Cliente = mongoose.model('Cliente', clienteSchema)

export { Cliente }
