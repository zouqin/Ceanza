# 微信H5获取用户经纬度解析方案
> 通过调用微信获取用户位置接口可以获得用户当前位置信息
```js
wx.getLocation({
	type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	success: function (res) {
		var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		var speed = res.speed; // 速度，以米/每秒计
		var accuracy = res.accuracy; // 位置精度
	}
});
```

> 加载腾讯地图api库 >> [接入文档](http://lbs.qq.com/javascript_v2/guide-start.html)
```html
// 网页头部引入腾讯地图api库文件
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>

```

> 通过全局对象 qq.maps 调用位置解析接口 [接口文档](http://lbs.qq.com/javascript_v2/guide-service.html#link-four)
```js
/**
 * 根据经纬度解析用户详细地址
 */
getAddress( l, t ){
	let promise = new Promise(( resolve, reject )=>{
		let geocoder = new qq.maps.Geocoder({
		    complete:function( result ){
		        resolve( result );
		    }
		});
		let coord=new qq.maps.LatLng( l,t );
		geocoder.getAddress(coord);
	});
	return promise;
}
```
