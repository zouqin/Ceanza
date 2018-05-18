import { TempImgBean } from './tempImgBean.js';

export class Lbx {
  constructor( w, h ){
    this.tmp = [];
    this.canvas = [];

    let offsetX = 15;
    let offsetY = 70;
    // 第一行
    for( let i=0; i<4; i++ ){
      let s = i>=2 ? w*2.5: w*0.5;
      let x = s + i * w;
      let y = 0;
      this.tmp.push({ x: x, y: y });
      this.canvas.push({ x: x + offsetX, y: y + offsetY })
    }
    // 第二行
    for (let i = 0; i < 7; i++) {
      let x = 0+ i * w;
      let y = h;
      this.tmp.push({ x: x, y: y });
      this.canvas.push({ x: x + offsetX, y: y + offsetY })
    }
    // 第三行
    for (let i = 0; i < 6; i++) {
      let x = w * 0.5 + i * w;
      let y = h * 2;
      this.tmp.push({ x: x, y: y });
      this.canvas.push({ x: x + offsetX, y: y + offsetY })
    }
    // 第四行
    for (let i = 0; i < 5; i++) {
      let x = w * 1 + i * w;
      let y = h * 3;
      this.tmp.push({ x: x, y: y });
      this.canvas.push({ x: x + offsetX, y: y + offsetY })
    }
    // 第五行
    for (let i = 0; i < 2; i++) {
      let x = w * 2.5 + i * w;
      let y = h * 4;
      this.tmp.push({ x: x, y: y });
      this.canvas.push({ x: x + offsetX, y: y + offsetY })
    }
    // 第六行
    for (let i = 0; i < 1; i++) {
      let x = w * 3 + i * w;
      let y = h * 5;
      this.tmp.push({ x: x, y: y });
      this.canvas.push({ x: x + offsetX, y: y + offsetY })
    }
  }

  compose( data ){
    let staticData = [];
    for (let i = 0; i < 25; i++) {
      staticData.push({
        url: 'http://xyyxsns.oss-cn-shenzhen.aliyuncs.com/res/wxopen/photoWall/lbx.png'
      })
    }
    let photos = [];
    staticData.forEach((n, i) => {
      let url = '';
      for (let j = 0; j < data.length; j++) {
        if (data[j].position == i) {
          url = data[j].url;
          break;
        }
      }
      let p = this.tmp[i];
      let c = this.canvas[i];
      let img = new TempImgBean(p, c, url, i);
      photos.push(img);
    });
    return photos;
  }

  getTpl() {
    return {
      url: `https://static.xyyxsns.com/res/wxopen/photoWall/love1.png`,
      w: 750,
      h: 712,
      l: 24.5,
      t: 54
    }
  }
}