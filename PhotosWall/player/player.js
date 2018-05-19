import { ImageBean } from './bean/ImgBean.js';
import { Loader } from './bean/Loader.js'

/**
 * 模拟静态数据
 * 实际运用过程中,组件访问本地缓存数据 key:'imgs'
 * 需要在跳转页面前讲图片数组缓存到本地
 */
const staticData = [
'https://static.xyyxsns.com/uploads/image/shapealbums/2018/05/19/wx_download_5affc6a0e1a2f.jpg',
'https://static.xyyxsns.com/uploads/image/shapealbums/2018/05/19/wx_download_5affc71d4d7c9.jpg',
'https://static.xyyxsns.com/uploads/image/shapealbums/2018/05/19/wx_download_5affcac3b1fa6.jpg',
'https://static.xyyxsns.com/uploads/image/shapealbums/2018/05/19/wx_download_5affb22804a4a.jpg'
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],   
    music: false, // 音乐开关
    music_url: 'http://xyyxsns.oss-cn-shenzhen.aliyuncs.com/res/wxopen/photoWall/test1.mp3',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let staticData = wx.getStorageSync('imgs');


    staticData.forEach( url =>{
      this.data.imgs.push(new ImageBean(url) );
    })
    this.setData({
      imgs: this.data.imgs,
    }, ()=>{
      Loader.start( this, this.data.imgs );
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.musicPlayShow();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.musicPlayHide();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  play() {
    if (!this) {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url
      })
      return;
    }

    let state = this.data.music;
    if (state) {
      wx.pauseBackgroundAudio();
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url
      })
    }
    this.setData({
      music: !state,
    })
  },

  musicPlayHide() {
    let state = this.data.music;
    if (state) {
      wx.pauseBackgroundAudio();
      this.setData({
        music: !state,
      })
    }
  },

  musicPlayShow() {
    let state = this.data.music;
    if (!state) {
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url
      })
      this.setData({
        music: !state,
      })
    }
  }
})