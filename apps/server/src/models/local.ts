import mongoose from 'mongoose'

interface Local {
  cidade: string
  estado: string
  pais: string
}

const localSchema = new mongoose.Schema<Local>({
  cidade: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
})

const Local = mongoose.model('Local', localSchema)

export { Local }
