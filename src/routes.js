import Router from '@koa/router'
export const router = new Router()

import * as users from './modules/users'
import * as auth from './modules/auth'

/* ----- LOGIN ----- */

router.get('/login', auth._getUserLogin)

/* ----- END LOGIN ----- */

/* ----- USERS ----- */
router.get('/users', users._getUsers)
router.get('/user/:id', users._getUserById)
router.post('/user/create', users._postUserCreate)
router.delete('/user/delete/:id', users._deleteUser)

/* ----- END USERS ----- */
