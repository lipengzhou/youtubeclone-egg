module.exports = app => {
  const { router, controller, middleware } = app
  const auth = middleware.auth(app.config.jwt)
  router.get('/', controller.home.index)
  router.post('/api/v1/auth/signup', controller.auth.signup)
  router.post('/api/v1/auth/login', controller.auth.login)
  router.get('/api/v1/auth/me', auth, controller.auth.me)
}
