const video = require("./model/video")

module.exports = app => {
  const { router, controller, middleware } = app
  const auth = middleware.auth(app.config.jwt)
  router.get('/', controller.home.index)

  // 认证
  router.post('/api/v1/auth/signup', controller.auth.signup)
  router.post('/api/v1/auth/login', controller.auth.login)
  router.get('/api/v1/auth/me', auth, controller.auth.me)

  // 视频
  router.post('/api/v1/videos', auth, controller.video.create)
  router.get('/api/v1/videos/upload_info', controller.video.uploadInfo)
  router.get('/api/v1/videos/:id', controller.video.getVideo)
  // router.get('/vod-test', controller.video.showVodTest)
}
