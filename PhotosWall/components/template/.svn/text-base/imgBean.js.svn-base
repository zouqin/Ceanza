class ImgBean {
  constructor( p, c, url, i ){
    this.htmlSize = {
      l : p[0],
      t : p[1],
      w : p[2],
      h : p[2],
    }
    this.canvasSize = {
      l: c[0],
      t: c[1],
      w: c[2],
      h: c[2],
    }
    this.url = url;
    this.i = i;
    this.style = `
    width:${p[2]}rpx;
    height:${p[2]}rpx;
    left:${p[0]}rpx;
    top:${p[1]}rpx;
    opacity: 1;
    transform : scale(1);
    -webkit-transform : scale(1);
    animation: an_user 1s;
    -webkit-animation: an_user 1s;`
  }
}

module.exports = ImgBean;