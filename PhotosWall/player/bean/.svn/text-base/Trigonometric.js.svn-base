

export class Trigonometric {
  /**
   * 根据邻边和角度求斜边长度
   * @param angle 角度
   * @param bd    邻边
   */
  static countAD(angle, bd) {
    let tan = Math.tan(Math.PI / 180 * angle);
    return tan * bd;
  }

  /**
   * 根据角度和邻边求斜边
   * @param angle 角度
   * @param bd    邻边
   */
  static countAB(angle, bd) {
    let cos = Math.cos(Math.PI / 180 * angle);
    return bd / cos;
  }

  /**
   * 根据斜边和余弦求邻边
   * @param angle 角度
   * @param ad 
   */
  static countDB(angle, ad) {
    let cos = Math.cos(Math.PI / 180 * angle);
    return ad * cos;
  }

  /**
   * 根据斜边和正弦求对边
   */
  static countSinAB(angle, ad ){
    let sin = Math.sin(Math.PI / 180 * angle);
    return sin * ad;
  }
}