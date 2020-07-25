/**
 * 监听者Watcher
 * 核心：如何将自身添加到订阅列表中？
 */
class Watcher {
  constructor() {
    /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
    // 对于全局来说，一次只会存在一个watcher实例
    Dep.target = this
  }

  /* 更新视图的方法 */
  update () {
    console.log('视图更新');
  }
}