import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { Cliente } from '@/models/cliente'

const criarClienteSchema = z.object({
  nome: z.string().nonempty({ message: 'Nome é obrigatório.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  telefone: z.string().nonempty({ message: 'Telefone é obrigatório.' }),
})

const criarCliente = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = criarClienteSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const { nome, email, telefone } = body.data

    await new Cliente({ nome, email, telefone }).save()

    return res.status(201).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const obterClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.find()

    return res.status(200).json(clientes)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const obterCliente = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const cliente = await Cliente.findById(id)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }

    return res.status(200).json(cliente)
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const editarClienteSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email({ message: 'E-mail inválido.' }).optional(),
  telefone: z.string().optional(),
})

const editarCliente = async (req: Request, res: Response) => {
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

  const body = editarClienteSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const cliente = await Cliente.findById(id)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }

    const { nome, email, telefone } = body.data

    // await Cliente.updateOne(id, { nome, email, telefone })

    await cliente.updateOne({ nome, email, telefone })

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const excluirCliente = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const cliente = await Cliente.findById(id)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' })
    }

    // await Cliente.deleteOne({ _id: id })

    await cliente.deleteOne()

    return res.status(200).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

export {
  criarCliente,
  editarCliente,
  excluirCliente,
  obterCliente,
  obterClientes,
}
