/**
 * 发布-订阅模式
 * Publisher --> Event Bus <----> Subscriber
 * 典型应用：EventBus
 */

// 发布消息的主体
 class Publisher {
  publish (data, cb) {
    cb(data)
  }
}

// 事件集中处理
class EventBus {
  constructor() {
    this.eventTopics = {}
  }

  on(eventName, handler) {
    const eventCollect = this.eventTopics[eventName]
    if (!eventCollect) {
      this.eventTopics[eventName] = []
    }
    this.eventTopics[eventName].push(handler)
  }

  emit(eventName, params) {
    const eventCollect = this.eventTopics[eventName]
    if (!eventCollect) return;
    eventCollect.forEach(function (listener) {
      listener(!!params ? params : {});
    });
  }
}

// 实例化一个事件发布者
const publisher = new Publisher()
// 实例化一个事件管理中心
const eventBus = new EventBus()
// 新建一个事件观察者
const subscriber = eventBus.on('click', (data) => { console.log(data) })

publisher.publish('发布click事件', (data) => {
  eventBus.emit('click', data)
})
