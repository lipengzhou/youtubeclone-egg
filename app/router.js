module.exports = app => {
  const { router, controller, middleware } = app

  const auth = middleware.auth(app.config.jwt)

  router.get('/', controller.home.index)

  router.prefix('/api/v1')

  router
    .post('/users', controller.user.create) // 用户注册
    .post('/users/login', controller.user.login) // 用户登录
    .get('/users', controller.user.users) // 获取用户列表
    .get('/users/:userId/liked-videos', controller.user.likedVideos) // 获取用户喜欢的视频列表
    .get('/users/:userId') // 获取用户信息

  router
    .get('/user') // 获取当前登录用户
    .patch('/user') // 更新用户资料
    .get('/user/history') // 获取用户的观看历史
    .get('/user/subscriptions', controller.user.subscriptions) // 获取用户订阅列表
    .post('/user/subscriptions', controller.user.subscribe) // 订阅用户
    .delete('/user/subscriptions', controller.user.unsubscribe) // 取消订阅

  // 视频
  router
    .get('/videos', controller.video.videos) // 获取视频列表
    .post('/videos', auth, controller.video.create) // 创建视频
    .get('/videos/:id', controller.video.video) // 获取视频
    .post('/videos/:videoId/likes', auth, controller.video.createLike) // 视频点赞

  // 阿里云视频点播服务
  // 接口文档：https://help.aliyun.com/document_detail/60574.html
  router.get('/api/v1/vod/:action', controller.vod.index)
}
