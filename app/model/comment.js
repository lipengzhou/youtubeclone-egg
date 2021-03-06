/**
 * 视频评论
 */

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const userSchema = new Schema({
    content: { // 评论内容
      type: String,
      required: true
    },
    user: { // 评论用户
      type: mongoose.ObjectId,
      required: true
    },
    video: { // 评论视频
      type: mongoose.ObjectId,
      required: true
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

  return mongoose.model('Comment', userSchema)
}
