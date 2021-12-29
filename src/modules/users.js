import { prisma } from '~/data/index'
import bcrypt from 'bcrypt'

export const _getUsers = async ctx => {
  try {
    const users = await prisma.user.findMany()

    ctx.body = { users }
  } catch (err) {
    console.log(err)
  }
}

export const _getUserById = async ctx => {
  try {
    const { id } = ctx.params

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    ctx.body = { user }
  } catch (err) {
    console.log(err)
  }
}

export const _postUserCreate = async ctx => {
  try {
    const { name, email, password } = ctx.request.body
    const saltRounds = 10

    if (!name || !email || !password) {
      return (ctx.body = {
        error: 1,
        message: 'Missing fields!',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      ctx.status = 400
      ctx.body = {
        error: 1,
        message: 'User already exists!',
      }
      return
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    if (createUser)
      return (ctx.body = {
        createUser,
        error: 0,
        message: 'User created successfully!',
      })
  } catch (err) {
    console.log(err)
  }
}

export const _deleteUser = async ctx => {
  try {
    const { id } = ctx.params

    if (!id) {
      ctx.status = 400
      ctx.body = {
        error: 1,
        message: 'Missing ID!',
      }
      return
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      ctx.status = 404
      ctx.body = {
        error: 1,
        message: 'Not exists user with this ID!',
      }
      return
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    })

    ctx.status = 200
    ctx.body = {
      error: 0,
      message: 'User was excluded successfully!',
      id,
    }
  } catch (err) {
    console.log(err)
  }
}
