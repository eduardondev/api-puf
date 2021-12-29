import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../data/index'

export const _getUserLogin = async ctx => {
  try {
    const [type, credentials] = ctx.request.headers.authorization.split(' ')

    if (type !== 'Basic') {
      ctx.status = 400
      ctx.body = {
        error: 1,
        message: 'Cannot authenticate',
      }
    }

    const [email, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':')

    if (!email || !password)
      return (ctx.body = {
        error: 1,
        message: 'Missing fields!',
      })

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const passwordEqual = await bcrypt.compare(password, user.password)

    if (!user || !passwordEqual) {
      ctx.status = 404
      ctx.body = {
        error: 1,
        message: 'User not exists!',
      }
      return
    }

    let token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)

    ctx.body = {
      token,
      error: 0,
      message: 'Logged!',
    }
  } catch (err) {
    console.log(err)
  }
}
