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

class AuthController extends Controller {
  async signup() {
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
    }, this.config.keys)

    ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        bio: user.bio,
        image: user.image
      }
    }
  }

  async login() {
    this.ctx.validate(loginRule, this.ctx.request.body)
    this.ctx.body = 'login'
  }

  async me() {
    this.ctx.body = 'me'
  }
}

module.exports = AuthController
