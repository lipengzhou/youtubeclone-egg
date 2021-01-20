const jwt = require('jsonwebtoken')

module.exports = options => {
  return async (ctx, next) => {
    const token = ctx.request.header.authorization
    if (!token) {
      return ctx.throw(401, '未授权')
    }
    try {
      const decoded = jwt.verify(token, options.secret)
      console.log(decoded.userId)
      const user = await ctx.model.User.findById(decoded.userId)
      ctx.user = user
    } catch (err) {
      ctx.throw(401, '未授权')
    }

    // 注意：不要把这行代码放到上面的 try 中，否则它里面的异常会视为 401
    await next()
  }
}
