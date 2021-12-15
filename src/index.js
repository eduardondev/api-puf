import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

import { router } from './routes'

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World Edu'
})

app.listen(5001, () => {
  console.log(
    ` ${process.env.SERVER_NAME} is running on http://localhost:${process.env.SERVER_PORT}`
  )
})
