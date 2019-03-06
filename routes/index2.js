const router = require('koa-router')()
const userController = require('./../controllers/user')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'ok i like it!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  console.log(ctx.request.query)
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/signup', userController.signUp)
router.post('/signin', userController.signin)
router.post('/checkLogin', userController.checkLogin)

module.exports = router
