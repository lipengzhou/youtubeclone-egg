exports.keys = '0927c64f-248d-4415-b151-531fedb609a5'


exports.security = {
  csrf: {
    enable: false
  }
}

exports.jwt = {
  secret: '67ef887c-e16d-4ec7-827f-0b73010a2889',
  maxAge: '7d'
}

exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/youtube-clone',
    options: {
      useUnifiedTopology: true
    },
    plugins: []
  }
}
