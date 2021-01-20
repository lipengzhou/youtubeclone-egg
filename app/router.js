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
  router.get('/api/v1/videos/:id', controller.video.video)
  router.post('/api/v1/videos/:videoId/likes', auth, controller.video.createLike)

  // 阿里云视频点播服务
  // 接口文档：https://help.aliyun.com/document_detail/60574.html
  router.get('/api/v1/vod/:action', controller.vod.index)
}
