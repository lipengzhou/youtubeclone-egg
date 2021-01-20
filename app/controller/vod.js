const Controller = require('egg').Controller

class VodController extends Controller {
  async index () {
    this.ctx.body = await this.app.vodClient.request(
      this.ctx.params.action,
      this.ctx.query,
      {}
    )
  }
}

module.exports = VodController
