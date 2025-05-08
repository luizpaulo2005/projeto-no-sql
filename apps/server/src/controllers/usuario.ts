import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { Usuario } from '@/models/usuario'

const criarUsuarioSchema = z.object({
  nome: z.string().nonempty({ message: 'Nome é obrigatório.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  senha: z.string().nonempty({ message: 'Senha é obrigatória.' }),
})

const criarUsuario = async (req: Request, res: Response) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Corpo da requisição não informado.' })
  }

  const body = criarUsuarioSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  const emailExistente = await Usuario.findOne({
    email: body.data.email,
  })

  if (emailExistente) {
    return res.status(400).json({
      message: 'Email já cadastrado.',
    })
  }

  try {
    const { email, nome, senha } = body.data

    const senhaHash = await bcrypt.hash(senha, 6)

    await new Usuario({ email, nome, senha: senhaHash }).save()

    return res.status(201).send()
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    })
  }
}

const obterUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find()

    return res.status(200).json(usuarios)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const obterUsuario = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const usuario = await Usuario.findById(id)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    return res.status(200).json(usuario)
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const editarUsuarioSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email({ message: 'Email inválido.' }).optional(),
  senha: z.string().optional(),
})

const editarUsuario = async (req: Request, res: Response) => {
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

  const body = editarUsuarioSchema.safeParse(req.body)

  if (!body.success) {
    const errors = body.error.flatten().fieldErrors

    return res.status(400).json(errors)
  }

  try {
    const usuario = await Usuario.findById(id)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    if (body.data.email) {
      const emailExistente = await Usuario.findOne({
        email: body.data.email,
      })

      if (emailExistente) {
        return res.status(400).json({
          message: 'Email já cadastrado.',
        })
      }
    }

    // await Usuario.updateOne(
    //   { _id: id },
    //   { nome: body.data.nome, email: body.data.email },
    // )

    await usuario.updateOne({
      nome: body.data.nome,
      email: body.data.email,
    })

    return res.status(200).json({ message: 'Usuário atualizado com sucesso.' })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

const excluirUsuario = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID não informado.' })
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido.' })
  }

  try {
    const usuario = await Usuario.findById(id)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    // await Usuario.deleteOne({ _id: id })

    await usuario.deleteOne()

    return res.status(200).json({ message: 'Usuário excluído com sucesso.' })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}

export {
  criarUsuario,
  editarUsuario,
  excluirUsuario,
  obterUsuario,
  obterUsuarios,
}
