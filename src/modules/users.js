import { prisma } from '../data/index'

export const _getUsers = async ctx => {
  try {
    const users = await prisma.user.findMany()

    ctx.body = users
  } catch (err) {
    console.log(err)
  }
}

export const _postUserCreate = async ctx => {
  try {
    const { name, email, password } = ctx.request.body

    if (!name || !email || !password)
      return (ctx.body = {
        error: 1,
        message: 'Missing fields!',
      })

    const verifyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (verifyExists) {
      ctx.status = 400
      ctx.body = {
        error: 1,
        message: 'User already exists!',
      }
    }

    const post = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    if (post)
      return (ctx.body = {
        error: 0,
        message: 'User created successfully!',
      })
  } catch (err) {
    console.log(err)
  }
}
