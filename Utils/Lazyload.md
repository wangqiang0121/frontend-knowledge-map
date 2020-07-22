## 图片懒加载

### 解决问题
图片流量消耗比较大，非首屏图片暂不加载。

### 实现原理
- 非首屏图片赋值默认图片src
- 监听滚动事件、动态给图片赋值真实图片src

### 具体实现
- 渲染列表时，非首屏图片src设为默认图片，真实图片地址存放在`data-*`中
- 监听`window.onscroll`事件，注意节流（throttle）或防抖（debounce）
- 判断图片是否进入视窗内，主要判断三个高度：
  - 当前body滚动的高度：`document.body.scrollTop`
  - 视窗的高度 `window.innerHeight`
  - 图片距离顶部的高度 `imgElem.offsetTop`

### 代码
```
window.onscroll =_.throttle(this.watchscroll, 200);

watchscroll () {
  var bodyScrollHeight =  document.body.scrollTop;// body滚动高度
  var windowHeight = window.innerHeight;// 视窗高度
  var imgs = document.getElementsByClassName('lazyloadimg');
  for (var i =0; i < imgs.length; i++) {
    var imgHeight = imgs[i].offsetTop;// 图片距离顶部高度
    if (imgHeight  < windowHeight  + bodyScrollHeight) {
       imgs[i].src = imgs[i].getAttribute('data-src');
       img[i].className = img[i].className.replace('lazyloadimg','')
    }
  }
}
```

### 引申
- 事件的节流与防抖
- 浏览器各种元素高度判断API
- 常用的滚动判断
  - 页面滚动离开首屏(这时可显示回到顶部的按钮)：`document.body.scrollTop > window.innerHeight`
  - 页面滚动到底部了(这时可去调接口获取更多内容)：`window.scrollY + window.innerHeight > document.body.offsetHeight`
- 图片懒加载的其他方法（http://axuebin.com/blog/2017/08/19/javascript-lazyload/）