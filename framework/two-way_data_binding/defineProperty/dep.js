/**
 * 订阅收集器Dep
 */
class Dep {
  constructor () {
    /* 用来存放Watcher对象的数组 */
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  notify (sub) {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  }
}

Dep.target = null

