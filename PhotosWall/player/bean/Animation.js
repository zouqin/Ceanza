
import { Trigonometric } from './Trigonometric.js'
/**
 * 动画梦工场
 * 负责生成动画模板
 */
export class Animation{
  constructor(){
    this.rotate = this.createrRotate();
    this.fall = this.createrFall();
    this.reset = this.createrReset();
    this.default = this.createrDefault();
  }
  static getInstance(){
    if( !this.self ){
      this.self = new Animation();
    }
    return this.self;
  }

  /**
   * 获取随机隐退动画
   * 由于该动画每次调用需要确保其随机性
   * 所以采用每次get 的方式拦截并重新赋值
   */
  get opacity (){
    return this.createrRandomOpacity();
  }

  /**
   * 旋转隐藏动画
   */
  createrRotate(){
    let animation = wx.createAnimation();
    animation.rotate(800).opacity(0).step({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
    })
    return animation.export();
  }

  /**
   * 撕裂坠落动画
   */
  createrFall(){
    let animation = wx.createAnimation();
    let rotate = 15;
    let y=1000;
    animation.rotate(rotate).step({
      transformOrigin: "0 0",
      duration: 1000,
      timingFunction: "ease",
    })
    /**
     * 当节点发生旋转后纵向位移会像旋转后的方向移动,
     * 所以需要根据三角函数横向移动动
     */
    let x = Trigonometric.countSinAB(rotate, y );
    animation.translate(x, y).step({
      transformOrigin: "0 0",
      duration: 1000,
      timingFunction: "ease",
    })
    return animation.export();
  }

  /**
   * 随机隐退效果
   */
  createrRandomOpacity(){
    let animation = wx.createAnimation();
    let mode = [
      '0 50%',
      '100% 50%',
      '50% 0',
      '50% 100%'
    ];
    let origin = mode[parseInt(Math.random() * mode.length ) ];
    animation.scale(0.6).opacity(0).step({
      transformOrigin: origin,
      duration: 1000,
      timingFunction: "ease",
    })
    return animation.export();
  }

  createrDefault(){
    let animation = wx.createAnimation();
    animation.opacity(0).step({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
    })

    return animation.export();
  }

  /**
   * 重置效果
   */
  createrReset(){
    let animation = wx.createAnimation();
    animation.scale(1).opacity(1).translate(0, 0).rotate(0).step({
      transformOrigin: '50% 50%',
      duration: 0,
      timingFunction: "ease",
    })
    return animation.export();
  }

  /**
   * 随机效果切换
   */
  random(){
    let animation;
    let num = parseInt(Math.random() * 3 );
    switch ( num ){
      case 0: animation= this.default ;break;
      case 1: animation = this.fall; break;
      case 2: animation = this.opacity; break;
      default :animation= this.default; break;
    }
    return animation;
  }
} 