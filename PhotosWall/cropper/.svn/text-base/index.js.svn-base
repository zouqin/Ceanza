/**
 * Created by sail on 2017/6/1.
 */
import weCropper from '../components/wecropper/main'
import { imageUpload } from '../../utils/apis.js'
const service = require('service')

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

const defaultCutWidth = width * 0.9

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 1,
      cut: {
        coverMode: 0,
        x: (width - defaultCutWidth) / 2,
        y: (height - defaultCutWidth) / 2,
        width: defaultCutWidth,
        height: defaultCutWidth
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },


  /**
   *  完成裁剪
   */
  compeletedCut(e) {
    if (!this.compeletedCutLock) {
      this.compeletedCutLock = true
      this.wecropper.getCropperImage((src) => {
        if (src) {
          let needShowLoading = true
          setTimeout(() => {
            needShowLoading && wx.showLoading({
              title: '正在上传',
            })
          }, 1500)

          wx.uploadFile({
            url: imageUpload,
            filePath: src,
            name: 'file',
            formData: {
              forceJpg: 1,
              compress: 80,
              thumbnail: 0,
              wxOpenSession: wx.getStorageSync('wxopen_session')
            },
            success: function (res) {
              let resInfo = JSON.parse(res.data)
              if (resInfo.ret == 0) {
                needShowLoading = false
                wx.hideLoading()
                service.compeletedCut(resInfo)
              } else {
                wx.showToast({
                  title: resInfo.msg,
                })
              }
              console.log(resInfo)
            }
          })
        }
      })
    }
  },

  onLoad(options) {
    this.loadOptions = options
    const { cropperOpt } = this.data
    let { cutWidth = defaultCutWidth, cutHeight = defaultCutWidth } = this.loadOptions;
    cutWidth = parseInt(cutWidth);
    cutHeight = parseInt(cutHeight);
    cutWidth = cutWidth > 0 ? cutWidth : defaultCutWidth;
    cutHeight = cutHeight > 0 ? cutHeight : defaultCutWidth;

    cropperOpt.cut.x = (width - cutWidth) / 2;
    cropperOpt.cut.y = (height - cutHeight) / 2;
    cropperOpt.cut.width = cutWidth;
    cropperOpt.cut.height = cutHeight;

    new weCropper(cropperOpt)
      .on('ready', (ctx) => {
        ctx.pushOrign(this.loadOptions.src)
      })
      .on('beforeImageLoad', (ctx) => {
      })
      .on('imageLoad', (ctx) => {
      })
      .on('beforeDraw', (ctx, instance) => {
      })
      .updateCanvas()
  }
})

