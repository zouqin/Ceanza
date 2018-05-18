/**
 * Created by sail on 2017/6/11.
 */

/**
 * x 裁剪框的左边界
 * y 裁剪框的上边界
 * 
 * imgLeft 图片在canvas容器的左边界
 * imgTop 图片在canvas容器的上边界
 * 
 * rectX
 * rectY
 * 
 * width 裁剪框默认宽度，即整个画布宽度
 * height 裁剪框默认高度，即整个画布高度
 * 
 * 图片最终展示在canvas容器的宽和高
 * scaleWidth
 * scaleHeight
 * 
 * 图片展示在canvas容器的最小宽和高
 * baseWidth
 * baseHeight
 * 
 */
import { isFunction } from './utils'
import { COVERMODE } from './constants.js'

export default function methods() {
  const self = this

  const { deviceRadio } = self
  const boundWidth = self.width // 裁剪框默认宽度，即整个画布宽度
  const boundHeight = self.height // 裁剪框默认高度，即整个画布高度
  let { x = 0, y = 0, width = boundWidth, height = boundHeight, coverMode } = self.cut

  self.updateCanvas = () => {
    if (self.croperTarget) {
      //  画布绘制图片
      self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight)
    }
    isFunction(self.onBeforeDraw) && self.onBeforeDraw(self.ctx, self)

    self.setBoundStyle() //	设置边界样式
    self.ctx.draw()
    return self
  }

  self.pushOrign = (src) => {
    self.src = src

    isFunction(self.onBeforeImageLoad) && self.onBeforeImageLoad(self.ctx, self)

    wx.getImageInfo({
      src,
      success(res) {
        // 图片的宽高比例
        let innerAspectRadio = res.width / res.height
        //  canvas容器的宽高比
        let boundRadio = boundWidth / boundHeight
        // 图片最终展示在canvas容器的宽和高
        let scaleWidth, scaleHeight;
        self.croperTarget = res.path

        if (innerAspectRadio < width / height) {
          self.rectX = x
          self.baseWidth = width
          self.baseHeight = width / innerAspectRadio
          self.rectY = y - Math.abs((height - self.baseHeight) / 2)
        } else {
          self.rectY = y
          self.baseWidth = height * innerAspectRadio
          self.baseHeight = height
          self.rectX = x - Math.abs((width - self.baseWidth) / 2)
        }

        scaleWidth = self.baseWidth;
        scaleHeight = self.baseHeight;

        if (coverMode == COVERMODE.COVER_CONTAINER) {
          if (innerAspectRadio < boundRadio) {
            //  图片高  需要压缩
            self.rectY = 0;
            scaleWidth = res.width * (boundHeight / res.height)
            scaleHeight = boundHeight
            self.rectX = Math.abs((boundWidth - scaleWidth) / 2)
            if (scaleWidth < width) {
              // 需要修正
              self.rectX = x
              scaleWidth = width
              scaleHeight = width / innerAspectRadio
              self.rectY = y - Math.abs((height - self.baseHeight) / 2)
            }
          } else {
            //  图片宽  需要压缩
            self.rectX = 0
            scaleHeight = res.height * (boundWidth / res.width)
            scaleWidth = boundWidth
            self.rectY = Math.abs((boundHeight - scaleHeight) / 2)

            if (scaleHeight < height) {
              // 需要修正
              self.rectY = y
              scaleWidth = height * innerAspectRadio
              scaleHeight = height
              self.rectX = x - Math.abs((width - self.baseWidth) / 2)
            }
          }
        }

        self.imgLeft = self.rectX
        self.imgTop = self.rectY
        self.scaleWidth = scaleWidth
        self.scaleHeight = scaleHeight
        self.oldScale = self.scaleWidth / self.baseWidth
        self.updateCanvas()
        isFunction(self.onImageLoad) && self.onImageLoad(self.ctx, self)
      }
    })

    self.update()
    return self
  }

  self.getCropperImage = (...args) => {
    const { id } = self
    const ARG_TYPE = toString.call(args[0])
    const fn = args[args.length - 1]  

    switch (ARG_TYPE) {
      case '[object Object]':
        let { quality = 10 } = args[0]

        if (typeof (quality) !== 'number') {
          console.error(`quality：${quality} is invalid`)
        } else if (quality < 0 || quality > 10) {
          console.error(`quality should be ranged in 0 ~ 10`)
        }
        wx.canvasToTempFilePath({
          canvasId: id,
          x,
          y,
          width,
          height,
          destWidth: width * quality / (deviceRadio * 10),
          destHeight: height * quality / (deviceRadio * 10),
          success(res) {
            isFunction(fn) && fn.call(self, res.tempFilePath)
          },
          fail(res) {
            isFunction(fn) && fn.call(self, null)
          }
        }); break
      case '[object Function]':
        wx.canvasToTempFilePath({
          canvasId: id,
          x,
          y,
          width,
          height,
          destWidth: width / deviceRadio,
          destHeight: height / deviceRadio,
          success(res) {
            isFunction(fn) && fn.call(self, res.tempFilePath)
          },
          fail(res) {
            isFunction(fn) && fn.call(self, null)
          }
        }); break
    }

    return self
  }
}