const jwt = require('jsonwebtoken')

module.exports = options => {
  return async (ctx, next) => {
    const token = ctx.request.header.authorization
    if (!token) {
      return ctx.throw(401, '未授权')
    }
    try {
      const decoded = jwt.verify(token, options.secret)
      const user = await ctx.model.User.findById(decoded.userId)
      ctx.user = user
      await next()
    } catch (err) {
      ctx.throw(401, '未授权')
    }
  }
}
