# 实现Vue双向绑定

## 原理
- Object.defineProperty()
- 观察者模式

## 核心
- Vue 2 Object.defineProperty() 实现数据监听
- Vue 3 Proxy 实现数据监听

## 实现步骤
1. 实现一个监听器`Observer`，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
2. 实现一个订阅者`Watcher`，可以收到属性的变化通知并执行相应的函数，从而更新视图。
3. 实现一个解析器`Compile`，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

## 实现双向数据绑定的Proxy和Object.defineProperty优劣对比

### Object.defineProperty
- 无法监听数组变化
  - 目前Vue2 是采用针对数组方法进行Hack，对数组里的部分方法进行重写，显示的通知订阅者数据发生变更
- 监听的是对象的属性

### Proxy
- 可以监听整个对象
- 可以监听数组变化



## 参考
- [vue的双向绑定原理及实现](http://www.cnblogs.com/canfoo/p/6891868.html)
- [掘金小册——剖析 Vue.js 内部运行机制]
