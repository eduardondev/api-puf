import { prisma } from '../data/index'

export const _getUserLogin = async ctx => {
  try {
    const { email, password } = ctx.request.body

    if (!email || !password)
      return (ctx.body = {
        error: 1,
        message: 'Missing fields!',
      })

    const verifyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!verifyExists) {
      ctx.status = 404
      ctx.body = {
        error: 1,
        message: 'User not exists!',
      }
      return
    }

    ctx.body = {
      error: 0,
      message: 'Logged!',
    }
  } catch (err) {
    console.log(err)
  }
}
