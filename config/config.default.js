exports.keys = '0927c64f-248d-4415-b151-531fedb609a5'

exports.security = {
  csrf: {
    enable: false
  },
  domainWhiteList: ['*']
}

exports.jwt = {
  secret: '67ef887c-e16d-4ec7-827f-0b73010a2889',
  expiresIn: '7d'
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

// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.html': 'nunjucks'
  }
}

exports.vod = {
  accessKeyId: process.env.VOD_ACCESS_KEY,
  secretAccessKey: process.env.VOD_SECRET_KEY
}
