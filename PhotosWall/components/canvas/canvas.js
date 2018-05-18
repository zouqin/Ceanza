class Canvas {
  constructor( fn ) {
    this.httpNum = 0;
    this.m = 10;
    this.off = fn;
  }

  /**
   * 绘制六边形背景
   */
  drawLbxBg(ctx, imgs, backfun){
    let imgsClone = JSON.parse(JSON.stringify(imgs));
    imgsClone.forEach( ( n )=>{
      n.url = '';
    })
    
    let arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push(i);
    }
    let recursion = (arrs, t) => {
      if (t >= arrs.length) {
        backfun( imgs );
        return;
      } else {
        this.drawLbxUserimg(ctx, imgsClone[t]).then(() => {
          recursion(arrs, ++t);
        })
      }
    }
    recursion(arr, 0);
  }


  /**
   * 绘制六边形完整照片墙
   */
  drawLbx(imgs) {
    wx.showLoading({
      title: '生成图片中',
    })
    let ctx = this.initDef();
    // 绘制背景
    this.drawLbxBg( ctx, imgs, ( imgs )=>{
      imgs.forEach((n, i) => {
        if (n.url == '') {
          // imgs[i].url = 'https://static.xyyxsns.com/res/wxopen/photoWall/lbx.png';
        } else {
          imgs[i].canvasSize.w = 90;
          imgs[i].canvasSize.h = 112.5;
          imgs[i].canvasSize.t = n.canvasSize.t + 11;
          imgs[i].canvasSize.l = n.canvasSize.l + 17;
        }
      })
      // 画布图片加载完成标记
      let num = 0;

      // 绘制背景模板

      let arr = [];
      for (let i = 0; i < 25; i++) {
        arr.push(i);
      }
      let newNum = 0;
      let recursion = (arrs, t) => {
        if (t >= arrs.length) {
          // 重置用户头像
          imgs.forEach((n, i) => {
            if (n.url) {
              delete imgs[i].canvasSize.w;
              delete imgs[i].canvasSize.h;
              imgs[i].canvasSize.t = n.canvasSize.t - 11;
              imgs[i].canvasSize.l = n.canvasSize.l - 17;
            }
          })
          return;
        } else {
          if (imgs[t].url == ''){
            this.checkOver(++newNum, 25);
            recursion(arrs, ++t);
          }else{
            this.drawLbxUserimg(ctx, imgs[t]).then(() => {
              this.checkOver(++newNum, 25);
              recursion(arrs, ++t);
            })
          }
          
        }
      }
      recursion(arr, 0);
    } );
  }

  /**
   * 绘制完整图片
   */
  drawDef(tpl, imgs){
    wx.showLoading({
      title: '生成图片中',
    })
    // 画布图片加载完成标记
    let num = 0;
    // 初始化画布
    let ctx = this.initDef();

    // 绘制背景模板
    this.drawBac(ctx, tpl).then(() => {
      this.checkOver(++num, 28);
      let arr = [];
      for (let i = 0; i < 27; i++) {
        arr.push(i);
      }
      let newNum = 0;
      let recursion = (arrs, t) => {
        if (t >= arrs.length) {
          return;
        } else {
          this.drawUserimg(ctx, imgs[t]).then(() => {
            this.checkOver(++newNum, 27);
            recursion(arrs, ++t);
          })
        }
      }
      recursion(arr, 0);

      // let imgs_index = 0;
      // let time_index = setInterval(() => {
      //   for (let i = imgs_index; i < imgs.length; i++) {
      //     if (this.httpNum < 10) {
      //       imgs_index++;
      //       this.drawUserimg(ctx, imgs[i]).then(() => {
      //         this.checkOver(++num, 28);
      //       });

      //       if (i >= imgs.length - 1) {
      //         clearInterval(time_index);
      //       }
      //     } else {
      //       break
      //     }
      //   }
      // }, 50);
    })
  }


  /**
   * 绘制图片
   */
  draw(tpl, imgs,qrcode ){
    wx.showLoading({
      title: '生成图片中',
    })

    // 画布图片加载完成标记
    let num = 0;
    // 初始化画布
    let ctx = this.init();
    
    // 绘制背景模板
    this.drawBac(ctx, tpl ).then(  ()=>{
      this.checkOver(++num, 30);

      let arr = [];
      for( let i = 0; i < 27; i ++ ){
        arr.push(i);
      }
      let newNum = 0;
      let recursion = ( arrs, t )=>{
        if (t >= arrs.length){
          return;
        }else{
          this.drawUserimg(ctx, imgs[t]).then(() => {
            this.checkOver(++newNum, 27);
            recursion( arrs, ++t );
          })
        }
      }
      recursion(arr, 0);
    })
    // 绘制二维码
    this.drawQrcode(ctx, qrcode ).then( ()=>{
      this.checkOver( ++num, 30 );
    })

    // 绘制标题
    this.drawTitle(ctx).then(() => {
      this.checkOver(++num, 30);
    })
    
  }


  /**
   * 绘制六边形二维码图片
   */
  drawLbxQrcode(imgs, qrcode) {
    wx.showLoading({
      title: '生成图片中',
    })

    // 初始化画布
    let ctx = this.init();
    // 绘制背景模板
    this.drawLbxBg(ctx, imgs, (imgs) => {
      imgs.forEach((n, i) => {
        if (n.url != '') {
          imgs[i].canvasSize.w = 90;
          imgs[i].canvasSize.h = 112.5;
          imgs[i].canvasSize.t = n.canvasSize.t + 11;
          imgs[i].canvasSize.l = n.canvasSize.l + 17;
        }
      })
      // 画布图片加载完成标记
      let num = 0;
      let arr = [];
      for (let i = 0; i < 25; i++) {
        arr.push(i);
      }
      let newNum = 0;
      let recursion = (arrs, t) => {
        if (t >= arrs.length) {
          // 重置用户头像
          imgs.forEach((n, i) => {
            if (n.url) {
              delete imgs[i].canvasSize.w;
              delete imgs[i].canvasSize.h;
              imgs[i].canvasSize.t = n.canvasSize.t - 11;
              imgs[i].canvasSize.l = n.canvasSize.l - 17;
            }
          })
          return;
        } else {
          if (imgs[t].url == '') {
            this.checkOver(++newNum, 25);
            recursion(arrs, ++t);
          } else {
            this.drawLbxUserimg(ctx, imgs[t]).then(() => {
              this.checkOver(++newNum, 25);
              recursion(arrs, ++t);
            })
          }

        }
      }
      recursion(arr, 0);

      // 绘制二维码
      this.drawQrcode(ctx, qrcode).then(() => {
        this.checkOver(++num, 27);
      })
      // 绘制标题
      this.drawTitle(ctx).then(() => {
        this.checkOver(++num, 27);
      })
    });
  }

  /**
   * 初始化图层
   */
  init( ){
    this.ctx = wx.createCanvasContext('myCanvas');
    let ctx = this.ctx;
    ctx.clearRect(0, 0, 750, 828);
    ctx.draw();
    ctx.save();
    ctx.setFillStyle('#E4E4E4')
    ctx.fillRect(0, 0, 750, 712)
    ctx.setFillStyle('#FFFFFF')
    ctx.fillRect(0, 712, 750, 116)
    ctx.setFontSize(20)
    ctx.setFillStyle('#525252')
    ctx.fillText("扫码补充上传", 576, 800);
    return ctx;
  }

  /**
   * 初始化图层(最终图片)
   */
  initDef() {
    this.ctx = wx.createCanvasContext('myCanvas');
    let ctx = this.ctx;
    ctx.clearRect(0, 0, 750, 712);
    ctx.draw();
    ctx.save();
    ctx.setFillStyle('#fefefe')
    ctx.fillRect(0, 0, 750, 712)
    return ctx;
  }

  /**
   * 下载图片
   */
  drawBac( ctx, tpl ){
    this.httpNum++;
    let that = this;
    let pro = new Promise(function (resolve, reject){
      let downloadTask = wx.downloadFile({
        url: tpl.url,
        success: function (res) {
          that.httpNum--;
          ctx.drawImage(res.tempFilePath, tpl.l, tpl.t);
          resolve();
        }
      })
    });
    return pro;
  }

  // 绘制二维码
  drawQrcode( ctx, url ){
    this.httpNum++;
    let that = this;
    let pro = new Promise(function (resolve, reject) {
      let downloadTask = wx.downloadFile({
        url: url,
        success: function (res) {
          that.httpNum--;
          ctx.setFillStyle('#d8d8d8')
          ctx.fillRect(572, 645, 129, 129)
          ctx.drawImage(res.tempFilePath, 573, 646, 127, 127);
          resolve();
        }
      })
    });
    return pro;
  }

  // 绘制用户头像
  drawUserimg( ctx,img ){
    this.httpNum++;
    let that = this;
    let data = img.canvasSize;
    let pro = new Promise(function (resolve, reject) {
      let downloadTask = wx.downloadFile({
        url: img.url,
        success: function (res) {
          that.httpNum--;
          ctx.drawImage(res.tempFilePath, data.l, data.t, data.w, data.h);
          resolve();
        }
      })
    });
    return pro;
  }

  // 绘制六边形用户图像
  drawLbxUserimg(ctx, img) {
    this.httpNum++;
    let that = this;
    let data = img.canvasSize;
    let url = img.url || 'https://static.xyyxsns.com/res/wxopen/photoWall/lbx.png';
    let pro = new Promise(function (resolve, reject) {
      let downloadTask = wx.downloadFile({
        url: url,
        success: function (res) {
          that.httpNum--;
          
          ctx.save();
          ctx.beginPath();
          if (url != 'https://static.xyyxsns.com/res/wxopen/photoWall/lbx.png' ){
            // 求中心点
            let x = data.l + data.w / 2;
            let y = data.t + data.h / 2;
            ctx.moveTo( x, y - 53);
            ctx.lineTo( x+45, y - 27 );
            ctx.lineTo( x+45, y + 25);
            ctx.lineTo( x, y+51 );
            ctx.lineTo( x-45, y+25 );
            ctx.lineTo(x-45, y-27);
            ctx.moveTo(x, y - 53);
            ctx.stroke();
            ctx.clip();
          }
          ctx.drawImage(res.tempFilePath, data.l, data.t, data.w, data.h);
          ctx.save();
          ctx.restore();
          resolve();
        }
      })
    });
    return pro;
  }

  // 绘制标题
  drawTitle( ctx ){
    this.httpNum++;
    let that = this;
    let pro = new Promise(function (resolve, reject) {
      let downloadTask = wx.downloadFile({
        url: 'https://static.xyyxsns.com/res/wxopen/photoWall/title.png',
        success: function (res) {
          that.httpNum--;
          ctx.drawImage(res.tempFilePath, 30, 750);
          resolve();
        }
      })
    });
    return pro;
  }



  // 检测是否完成
  checkOver( num, len ){
    if( num >= len ){ 
      this.ctx.draw();
      this.httpNum = 0;
      let off = this.off;
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          
          wx.hideLoading()
          // 关闭canvas
          off();

          wx.previewImage({
            current: '',
            urls: [res.tempFilePath]
          })
        }
      })
    }
  }
}

module.exports = Canvas;