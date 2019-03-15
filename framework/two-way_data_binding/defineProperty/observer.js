/**
 * 监听器Observer
 * 核心：Object.defineProperty()
 * 暂不考虑数组等复杂情况
 */
function defineReactive(data, key, val) {
  observe(val) // 对新值继续遍历绑定

  const dep = new Dep() // 订阅收集器

  Object.defineProperty(data, key, {
    enumerable: true, // 属性可枚举
    configurable: true, // 属性可被修改或删除
    get: function reactiveGetter () {
      /* 依赖收集：将当前Watcher对象存入dep的subs中 */
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return;
      val = newVal
      // 通知依赖收集Dep中的每一个Watcher
      dep.notify()
    }
  })
}

function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key])
  })
}
