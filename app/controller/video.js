const Controller = require('egg').Controller

const createVideoRule = {
  video: {
    type: 'object',
    rule: {
      Title: {
        type: 'string',
        required: true
      },
      Description: {
        type: 'string',
        required: true
      },
      CoverURL: {
        type: 'string',
        required: true
      },
      videoId: {
        type: 'string',
        required: true
      }
    }
  }
}

class VideoController extends Controller {
  async videos() {
    const { Video } = this.ctx.model
    const videos = await Video
      .find()
      .populate('user', 'avatar username')
      .sort({
        createdAt: -1
      })

    this.ctx.body = {
      videos
    }
  }

  async create() {
    const body = this.ctx.request.body
    this.ctx.validate(createVideoRule, body)

    body.video.user = this.ctx.user._id

    // 保存到业务数据库中
    const video = new this.ctx.model.Video(body.video)
    await video.save()

    this.ctx.body = video
  }

  async video() {
    const videoId = this.ctx.params.id
    const video = await this.ctx.model.Video.findById(videoId).populate('user')
    if (!video) {
      return this.ctx.throw(404)
    }
    // 喜欢数量
    video.likeCount = await this.ctx.model.VideoLike.countDocuments({
      video: videoId,
      like: 1
    })

    video.dislikeCount = await this.ctx.model.VideoLike.countDocuments({
      video: videoId,
      like: -1
    })

    console.log(video)
    // 不喜欢数量
    this.ctx.body = video
  }

  async createLike() {
    const body = this.ctx.request.body
    const VideoLike = this.ctx.model.VideoLike
    const { videoId } = this.ctx.params
    const user = this.ctx.user

    // 根据视频和用户找到点赞记录
    let videoLike = await VideoLike.findOne({
      video: videoId,
      user
    })

    if (!videoLike) {
      videoLike = await new VideoLike({
        like: body.videoLike.like,
        video: videoId,
        user: user._id
      }).save()
    } else {
      videoLike.like = body.videoLike.like
      videoLike.updatedAt = new Date()
      await videoLike.save()
    }

    this.ctx.body = videoLike
  }
}

module.exports = VideoController
