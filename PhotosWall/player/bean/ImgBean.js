import { Animation } from './Animation.js';

// 动画梦工场
let factory = Animation.getInstance();

/**
 * 图片信息类
 */
export class ImageBean {
  /**
   * 初始化照片信息
   */
  constructor( url ){
    this.url = url; // 照片地址

    this.getInfo( url ); // 照片信息

    this.animation = this.getAnimation(); // 照片动画

    this.style = this.getStyle(); // 图片样式

    this.showClassName = 'none'; // 节点状态 'none'、'active'、'ready'
  }

  /**
   * 获取图片基础信息
   */
  getInfo( url ){
    wx.getImageInfo({
      src: url,
      success: (res) => {
        this.info = res;
      }
    })
  }

  /**
   * 初始化动画
   */
  getAnimation(){
    let animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 2000,
      timingFunction: "ease",
      delay: 2000
    });
    return '';
  }

  /**
   * 初始化样式表
   */
  getStyle(){
    return '';
  }
  /**
   * 切换节点动画
   */
  switchAnimation( host ){
    // 当前节点下标
    let index = 0;
    for (let i = 0; i < host.data.imgs.length; i++ ){
      if (host.data.imgs[i] == this ){
        index = i;
        break;
      }
    }
    // 下一个节点下标
    let nextIndex = index + 1 >= host.data.imgs.length ? 0 : index + 1;
    // 获取动画
    this.animation = factory.random();
    // 当前节点和下一个节点都显示出来
    this.showClassName = 'active';
    host.data.imgs[nextIndex].showClassName = 'ready';
    // 更新DOM并利用回调函数重置节点动画
    host.setData({
      imgs: host.data.imgs,
    }, ()=>{
      setTimeout( ()=>{
        this.animation = factory.reset;
        this.showClassName = 'none';
        host.setData({
          imgs: host.data.imgs,
        })
      }, 2000 )
    })
  }

  /**
   * 清楚动画效果
   */
  clearAnimation(){
    this.animation = '';
  }

}