const Controller = require('egg').Controller
const RPCClient = require('@alicloud/pop-core').RPCClient

function initVodClient(accessKeyId, secretAccessKey) {
  const regionId = 'cn-shanghai' // 点播服务接入区域
  const client = new RPCClient({
    accessKeyId,
    secretAccessKey,
    endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
    apiVersion: '2017-03-21'
  })

  return client
}

class VideoController extends Controller {
  async create() {
    this.ctx.body = 'video create'
  }

  async showVodTest() {
    await this.ctx.render('vod-test.html')
  }

  async uploadInfo() {
    const client = initVodClient(
      'LTAI4G2AWM6BLgfbzn4j7ag3',
      'f4XTKJNGyeoMo67WhYMHFLjoEf2Knr'
    )

    const response = await client.request(
      'CreateUploadVideo',
      {
        Title: 'this is a sample',
        FileName: 'filename.mp4'
      },
      {}
    )
    this.ctx.body = response
  }

  async getVideo() {
    const client = initVodClient(
      'LTAI4G2AWM6BLgfbzn4j7ag3',
      'f4XTKJNGyeoMo67WhYMHFLjoEf2Knr'
    )
    const response = await client.request(
      'GetVideoInfo',
      {
        VideoId: '3bc26712a44441dfba7b399275a5a87b'
      },
      {}
    )
    this.ctx.body = response
    // if (response.Video) {
    //   console.log('Title = ' + response.Video.Title)
    //   console.log('Description = ' + response.Video.Description)
    // }
    // console.log('RequestId = ' + response.RequestId)
  }
}

module.exports = VideoController
