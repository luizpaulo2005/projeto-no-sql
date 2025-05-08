import mongoose from 'mongoose'

interface Categoria {
  tipo: string
}

const categoriaSchema = new mongoose.Schema<Categoria>({
  tipo: {
    type: String,
    required: true,
  },
})

const Categoria = mongoose.model('Categoria', categoriaSchema)

export { Categoria }
