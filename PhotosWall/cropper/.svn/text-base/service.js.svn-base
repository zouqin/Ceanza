/**
 * 只支持打开一个剪裁页面
 */
let _callback = ''
/**
 *  打开剪裁页面
 */
function cut(options) {
  let { src, success, cutWidth = 0, cutHeight = 0 } = options;
  _callback = success;
  wx.navigateTo({
    url: `/pages/cropper/index?src=${src}&cutWidth=${cutWidth}&cutHeight=${cutHeight}`
  })
}
/**
 * 完成剪裁，并回调
 */
function compeletedCut(data) {
  _callback && _callback(data)
  wx.navigateBack()
}


module.exports = {
  cut: cut,
  compeletedCut: compeletedCut
}