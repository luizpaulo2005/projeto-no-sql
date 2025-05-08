import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import { z } from 'zod'

import { Evento } from '@/models/evento'

const criarEventoSchema = z.object({
  idLocal: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idLocal deve ser um ObjectId válido',
    }),
  idCategoria: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idCategoria deve ser um ObjectId válido',
    }),
  idUsuario: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idUsuario deve ser um ObjectId válido',
    }),
  nome: z.string().nonempty({ message: 'Nome é obrigatório' }),
  descricao: z.string().nonempty({ message: 'Descrição é obrigatória' }),
  inicio: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Data de início deve ser futura',
  }),
  fim: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Data de fim deve ser futura',
  }),
  endereco: z.string().nonempty({ message: 'Endereço é obrigatório' }),
})

const criarEvento = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = criarEventoSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    await new Evento(body.data).save()

    return res.status(201).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const obterEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await Evento.find().populate([
      'idLocal',
      'idCategoria',
      'idUsuario',
    ])

    return res.status(200).json(eventos)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const obterEvento = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const evento = await Evento.findById(id).populate([
      'idLocal',
      'idCategoria',
      'idUsuario',
    ])

    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado.' })
    }

    return res.status(200).json(evento)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const editarEventoSchema = z.object({
  idLocal: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idLocal deve ser um ObjectId válido',
    })
    .optional(),
  idCategoria: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'idCategoria deve ser um ObjectId válido',
    })
    .optional(),
  nome: z.string().optional(),
  descricao: z.string().optional(),
  inicio: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: 'Data de início deve ser futura',
    })
    .optional(),
  fim: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: 'Data de fim deve ser futura',
    })
    .optional(),
  endereco: z.string().optional(),
})

const editarEvento = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = editarEventoSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const evento = await Evento.findById(id)

    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado.' })
    }

    // await Evento.updateOne({ _id: id }, body.data)

    await evento.updateOne(body.data)

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const excluirEvento = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const evento = await Evento.findById(id)

    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado.' })
    }

    // await Evento.deleteOne({ _id: id })

    await evento.deleteOne()

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

export { criarEvento, editarEvento, excluirEvento, obterEvento, obterEventos }
