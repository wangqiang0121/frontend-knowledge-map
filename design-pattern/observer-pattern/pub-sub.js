/**
 * 发布-订阅模式
 * Publisher --> Event Bus <----> Subscriber
 * 典型应用：EventBus
 */

class EventBus {
  constructor() {
    this.eventTopics = {}
  }

  on(eventName, handler) {
    const eventCollect = this.eventTopics[eventName]
    if (!eventCollect || eventCollect.length === 0) {
      this.eventTopics[eventName] = []
    }
    this.eventTopics[eventName].push(handler)
  }

  emit(eventName, params) {
    const eventCollect = this.eventTopics[eventName]
    if (!eventCollect || eventCollect.length < 1) return;
    eventCollect.forEach(function (listener) {
      listener(!!params ? params : {});
    });
  }
}

const eventBus = new EventBus()

eventBus.on('click', (data) => { console.log('click事件触发') })

eventBus.emit('click')