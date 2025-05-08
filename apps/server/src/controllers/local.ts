import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { Local } from '@/models/local'

const criarLocalSchema = z.object({
  cidade: z.string().nonempty({ message: 'Cidade é obrigatório.' }),
  estado: z.string().nonempty({ message: 'Estado é obrigatório.' }),
  pais: z.string().nonempty({ message: 'País é obrigatório.' }),
})

const criarLocal = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = criarLocalSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const { cidade, estado, pais } = body.data

    await new Local({ cidade, estado, pais }).save()

    return res.status(201).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const obterLocais = async (req: Request, res: Response) => {
  try {
    const locals = await Local.find()

    return res.status(200).json(locals)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const obterLocal = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const local = await Local.findById(id)

    if (!local) {
      return res.status(404).json({ message: 'Local não encontrado.' })
    }

    return res.status(200).json(local)
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const editarLocalSchema = z.object({
  cidade: z.string().optional(),
  estado: z.string().optional(),
  pais: z.string().optional(),
})

const editarLocal = async (req: Request, res: Response) => {
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

  const body = editarLocalSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const local = await Local.findById(id)

    if (!local) {
      return res.status(404).json({ message: 'Local não encontrado.' })
    }

    const { cidade, estado, pais } = body.data

    // await Local.updateOne(id, { cidade, estado, pais })

    await local.updateOne({ cidade, estado, pais })

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const excluirLocal = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const local = await Local.findById(id)

    if (!local) {
      return res.status(404).json({ message: 'Local não encontrado.' })
    }

    // await Local.deleteOne({ _id: id })

    await local.deleteOne()

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

export { criarLocal, editarLocal, excluirLocal, obterLocais, obterLocal }
