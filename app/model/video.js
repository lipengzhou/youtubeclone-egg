module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const userSchema = new Schema({
    // title: { // 视频标题
    //   type: String,
    //   required: true
    // },
    // description: { // 视频介绍
    //   type: String,
    //   required: true
    // },
    videoId: {
      type: String,
      required: true
    },
    // thumbnail: { // 视频缩略图
    //   type: String,
    //   required: true
    // },
    author: {
      type: mongoose.ObjectId, // 视频作者
      required: true,
      ref: 'User'
    },
    likes: {
      type: [{
        like: {
          type: Number,
          required: true,
          enum: [-1, 0, 1]
        },
        user: {
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
      }],
      default: () => []
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

  return mongoose.model('Video', userSchema)
}
