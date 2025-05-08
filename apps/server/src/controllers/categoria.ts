import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { Categoria } from '@/models/categoria'

const criarCategoriaSchema = z.object({
  tipo: z.string().nonempty({ message: 'Tipo é obrigatório.' }),
})

const criarCategoria = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = criarCategoriaSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const { tipo } = body.data

    await new Categoria({ tipo }).save()

    return res.status(201).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const obterCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await Categoria.find()

    return res.status(200).json(categorias)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const obterCategoria = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const categoria = await Categoria.findById(id)

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' })
    }

    return res.status(200).json(categoria)
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const editarCategoriaSchema = z.object({
  tipo: z.string().nonempty({ message: 'Tipo é obrigatório.' }),
})

const editarCategoria = async (req: Request, res: Response) => {
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

  const body = editarCategoriaSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const categoria = await Categoria.findById(id)

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' })
    }

    const { tipo } = body.data

    // await Categoria.updateOne(id, { tipo })

    await categoria.updateOne({ tipo })

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const excluirCategoria = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const categoria = await Categoria.findById(id)

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' })
    }

    // await Categoria.deleteOne({ _id: id })

    await categoria.deleteOne()

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

export {
  criarCategoria,
  editarCategoria,
  excluirCategoria,
  obterCategoria,
  obterCategorias,
}
