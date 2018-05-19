/**
 * 装载机类
 * 
 * 用于按照制定装载逻辑
 * 使图片数组按照装载逻辑运行
 * 实现动画效果
 */
export class Loader{
  /**
   * 启动方法
   * @param host 宿主对象
   */
  static start( host ){
    

    /**
     * 利用递归重复循环播放
     */
    let timeMachine= ( num )=>{
      if (num == host.data.imgs.length )num = 0;
      host.data.imgs[num].switchAnimation( host );
      setTimeout(timeMachine, 3000, ++num );
    }
    timeMachine( 0 );

    /**
     * 首次播放第一张图会出现错位
     * 将其隐藏
     */
    host.data.imgs[0].showClassName='none';
    host.setData({
      imgs: host.data.imgs,
    })
  } 
}