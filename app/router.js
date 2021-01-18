module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.post('/api/v1/auth/signup', controller.auth.signup)
  router.post('/api/v1/auth/login', controller.auth.login)
  router.get('/api/v1/auth/me', controller.auth.me)
}
