exports.keys = '0927c64f-248d-4415-b151-531fedb609a5'


exports.security = {
  csrf: {
    enable: false
  }
}

exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/youtube-clone',
    options: {},
    plugins: []
  }
}
