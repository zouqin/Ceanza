export class TempImgBean{
  constructor(p, c, url, i) {
    this.htmlSize = {
      l: p.x,
      t: p.y,
    }
    this.canvasSize = {
      l: c.x,
      t: c.y,
      w: c[2],
      h: c[2],
    }
    this.url = url;
    this.i = i;
    this.style = `
    left:${p.x}rpx;
    top:${p.y}rpx;
    opacity: 1;
    transform : scale(1);
    -webkit-transform : scale(1);
    animation: an_user 1s;
    -webkit-animation: an_user 1s;`
  }
} 