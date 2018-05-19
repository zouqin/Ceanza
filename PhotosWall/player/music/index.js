const Fragment = require('../../../utils/fragment');
class Music extends Fragment {
  play() {
    if( !this.page ){
      wx.playBackgroundAudio({
        dataUrl: 'http://xyyxsns.oss-cn-shenzhen.aliyuncs.com/res/wxopen/photoWall/test1.mp3'
      })
      return;
    }

    let state = this.page.data.music;
    if ( state ){
      wx.pauseBackgroundAudio();
    }else{
      wx.playBackgroundAudio({
        dataUrl: 'http://xyyxsns.oss-cn-shenzhen.aliyuncs.com/res/wxopen/photoWall/test1.mp3'
      })
    }
    this.setData({
      music: !state,
    })
  }
  
  musicPlayShow(){
    let state = this.page.data.music;
    if (!state) {
      wx.playBackgroundAudio({
        dataUrl: 'http://xyyxsns.oss-cn-shenzhen.aliyuncs.com/res/wxopen/photoWall/test1.mp3'
      })
      this.setData({
        music: !state,
      })
    }
  }

  musicPlayHide(){
    let state = this.page.data.music;
    if (state) {
      wx.pauseBackgroundAudio();
      this.setData({
        music: !state,
      })
    }
  }

  _suppliedMethods() {
    return {
      musicPlay: this.play,
    }
  }
}

module.exports = Music;