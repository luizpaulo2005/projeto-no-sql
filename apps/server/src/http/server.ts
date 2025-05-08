import { createServer } from 'node:http'

import { env } from '@/lib/env'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { db } from '@/lib/db'
import { CategoriaRouter } from '@/routes/categoria'
import { ClienteRouter } from '@/routes/cliente'
import { EventoRouter } from '@/routes/evento'
import { LocalRouter } from '@/routes/local'
import { ParticipanteRouter } from '@/routes/participante'
import { UsuarioRoute } from '@/routes/usuario'

const app = express()
const server = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(cors())

app.get('/hello', async (_, res) => {
  res.status(200).json({
    message: 'Hello World!',
  })
})

app.use('/usuario', UsuarioRoute)
app.use('/categoria', CategoriaRouter)
app.use('/local', LocalRouter)
app.use('/cliente', ClienteRouter)
app.use('/evento', EventoRouter)
app.use('/participante', ParticipanteRouter)

server.on('listening', () => {
  db.then(() => {
    console.log('MongoDB connected')
  }).catch((err) => {
    console.error('MongoDB connection error:', err)
  })
})

server.listen(env.SERVER_PORT, () => {
  console.log(`Server is running on ${env.SERVER_URL}:${env.SERVER_PORT}`)
})
