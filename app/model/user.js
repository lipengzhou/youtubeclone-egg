module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  })

  return mongoose.model('User', userSchema)
}
