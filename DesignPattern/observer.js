/**
 * 观察者模式
 * Subject <--> Observer
 */

// 被观察者
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(f) {
    this.observers.push(f);
    console.log(`${f.name} 进入队列`);
  }

  removeObserver(f) {
    this.observers = this.observers.filter((subscribe) => subscribe !== f);
    console.log(`${f.name} 离开队列`);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.run(data));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  run(data) {
    console.log(`${this.name} 响应命令 ${data}`);
  }
}

// 被观察的对象
const subject = new Subject();
// 观察者
const person1 = new Observer('小明');
const person2 = new Observer('小红');
const person3 = new Observer('小张');

subject.addObserver(person1);
subject.addObserver(person2);
subject.addObserver(person3);

// 被观察的对象通知观察者
subject.notify('向左');

subject.removeObserver(person2);

subject.notify('向右');
