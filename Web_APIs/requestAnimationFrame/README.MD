## Window.requestAnimationFrame

- 传入一个回调函数，告诉浏览器在下次重绘之前执行这个回调函数；(请求一次，执行一次);
- 返回一个ID，可以使用`window.cancelAnimationFrame()`来取消回调函数执行；
- 当`requestAnimationFrame()`运行在后台标签页或者隐藏的`<iframe>`里时，`requestAnimationFrame()`会被暂停调用以提升性能和电池寿命。

### 相关问题
- 使用 JavaScript 实现一个持续的动画效果？

### 相关知识点
- 浏览器的重绘
- setInterval 为什么不行？
  - 定时器不精确，只是在特定时间将动画放到 UI 线程等待执行，如果前面有任务，则需要等待。
  - 延伸 —— JS事件循环 Event Loop

