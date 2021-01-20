module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const videoLikeSchema = new Schema({
    like: {
      type: Number,
      required: true,
      enum: [-1, 0, 1]
    },
    video: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'Video'
    },
    user: { // 点赞用户
      type: mongoose.ObjectId,
      required: true,
      ref: 'User'
    },
    createdAt: { // 创建时间
      type: Date,
      default: Date.now
    },
    updatedAt: { // 更新时间
      type: Date,
      default: Date.now
    }
  })

  return mongoose.model('VideoLike', videoLikeSchema)
}
