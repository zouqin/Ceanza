import ImgBean from './imgBean.js';
let fixed = ( l,m,ls,ms,pl,pt,bt)=>{
  return [
    [pl, pt, l],
    [pl, pt + ls, l],
    [pl - ls, pt, l],
    [pl + ls, pt, l],

    [pl + bt, pt + ls + ls, m],

    [pl - ms, pt + ls + ms, m],
    [pl + ls, pt + ls + ms, m],

    [pl - ms, pt + ls, m],
    [pl - ms * 2, pt + ls, m],
    [pl + ls, pt + ls, m],
    [pl + ls + ms, pt + ls, m],

    [pl - ls - ms, pt + ms, m],
    [pl + ls * 2, pt + ms, m],

    [pl - ls - ms, pt, m],
    [pl + ls * 2, pt, m],

    [pl - ls - ms, pt - ms, m],
    [pl - ls, pt - ms, m],
    [pl - ls + ms, pt - ms, m],
    [pl - ls + ms * 2, pt - ms, m],

    [pl + ls * 2 - ms * 3, pt - ms, m],
    [pl + ls * 2 - ms * 2, pt - ms, m],
    [pl + ls * 2 - ms, pt - ms, m],
    [pl + ls * 2, pt - ms, m],

    [pl - ls, pt - ms * 2, m],
    [pl - ls + ms, pt - ms * 2, m],

    [pl + ls * 2 - ms * 2, pt - ms * 2, m],
    [pl + ls * 2 - ms, pt - ms * 2, m],
  ]
}

let htmlFiexd = fixed(172, 66, 177, 71, 263, 154, 54);
let canvasFiexd = fixed(172, 66, 177, 71, 288, 207, 52);
class Love {
  constructor(){
    
  }

  // 组装照片数组
  compose( data ){
    let staticData = [];
    for( let i = 0; i< 27; i ++ ){
      staticData.push({ 
        url: 'https://static.xyyxsns.com/res/wxopen/photoWall/def.png' })
    }
    let photos = [];
    staticData.forEach( ( n, i )=>{
      let p = htmlFiexd[i];
      let c = canvasFiexd[i];
      let url = n.url;
      for( let j=0; j < data.length; j++ ){
        if ( data[j].position == i ){
          url = data[j].url;
          break;
        }
      }
      let img = new ImgBean(p, c, url, i );
      photos.push( img );
    });

    return photos;
  }

  getTpl(){
    return {
      url: `https://static.xyyxsns.com/res/wxopen/photoWall/love1.png`,
      w: 750,
      h:712,
      l:24.5,
      t:54
    }
  }
}

module.exports = Love;