import type { Request, Response } from 'express'
import mongoose, { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { Participante } from '@/models/participante'

const criarParticipanteSchema = z.object({
  idEvento: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idEvento deve ser um ObjectId válido',
    }),
  idCliente: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idCliente deve ser um ObjectId válido',
    }),
})

const criarParticipante = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = criarParticipanteSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const { idEvento, idCliente } = body.data

    await new Participante({ idEvento, idCliente }).save()

    return res.status(201).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const obterParticipantes = async (req: Request, res: Response) => {
  try {
    const participantes = await Participante.find().populate([
      'idEvento',
      'idCliente',
    ])

    return res.status(200).json(participantes)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const obterParticipante = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const participante = await Participante.findById(id).populate([
      'idEvento',
      'idCliente',
    ])

    if (!participante) {
      return res.status(404).json({ message: 'Participante não encontrado.' })
    }

    return res.status(200).json(participante)
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const editarParticipanteSchema = z.object({
  idEvento: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idEvento deve ser um ObjectId válido',
    })
    .optional(),
  idCliente: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idCliente deve ser um ObjectId válido',
    })
    .optional(),
})

const editarParticipante = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = editarParticipanteSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const participante = await Participante.findById(id)

    if (!participante) {
      return res.status(404).json({ message: 'Participante não encontrado.' })
    }

    const { idEvento, idCliente } = body.data

    // await Participante.updateOne(id, { idEvento, idCliente })

    await participante.updateOne({ idEvento, idCliente })

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const excluirParticipante = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const participante = await Participante.findById(id)

    if (!participante) {
      return res.status(404).json({ message: 'Participante não encontrado.' })
    }

    // await Participante.deleteOne({ _id: id })

    await participante.deleteOne()

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

export {
  criarParticipante,
  editarParticipante,
  excluirParticipante,
  obterParticipante,
  obterParticipantes,
}
