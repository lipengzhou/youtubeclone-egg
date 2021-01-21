const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')

const signupRule = {
  user: {
    type: 'object',
    rule: {
      username: {
        type: 'string',
        required: true
      },
      email: {
        type: 'email',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    }
  }
}

const loginRule = {
  user: {
    type: 'object',
    rule: {
      email: {
        type: 'email',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    }
  }
}

class UserController extends Controller {
  /**
   * 获取用户列表
   */
  async users () {
    const { User } = this.ctx.model
    const users = await User.find({}, 'username avatar channelDescription')
    this.ctx.body = {
      users
    }
  }

  /**
   * 订阅用户
   */
  async subscribe () {
    this.ctx.body = 'subscribe'
  }

  /**
   * 取消订阅用户
   */
  async unsubscribe () {
    this.ctx.body = 'unsubscribe'
  }

  /**
   * 获取用户订阅列表
   */
  async subscriptions () {
    this.ctx.body = 'subscriptions'
  }

  async create() {
    const { ctx } = this
    const { User } = ctx.model
    const { body } = ctx.request

    ctx.validate(signupRule, body)

    if (await User.findOne({
      username: body.user.username
    })) {
      return ctx.throw(422, '用户名已存在')
    }

    if (await User.findOne({
      email: body.user.email
    })) {
      return ctx.throw(422, '邮箱已存在')
    }

    const user = new User(ctx.request.body.user)
    await user.save()

    // 生成 token
    const token = jwt.sign({
      userId: user._id
    }, this.config.jwt.secret, {
      expiresIn: this.config.jwt.expiresIn
    })

    ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar
      }
    }
  }

  async login() {
    this.ctx.validate(loginRule, this.ctx.request.body)
    const { User } = this.ctx.model
    const user = await User.findOne({ email: this.ctx.request.body.user.email }, 'email username channelDescription avatar password')
    console.log(user)
    if (!user) {
      return this.ctx.throw(422, '用户不存在')
    }
    if (this.ctx.helper.md5(this.ctx.request.body.user.password) !== user.password) {
      return this.ctx.throw(422, '密码错误')
    }
    const token = jwt.sign({
      userId: user._id
    }, this.config.jwt.secret, {
      expiresIn: this.config.jwt.expiresIn
    })

    this.ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar
      }
    }
  }

  async me() {
    const user = this.ctx.user
    this.ctx.body = {
      user: {
        email: user.email,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
        token: this.ctx.request.header.authorization
      }
    }
  }
}

module.exports = UserController
