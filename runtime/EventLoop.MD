# 事件循环 Event Loop
- JavaScript是单线程，在这个单线程中拥有唯一的一个事件循环。
- JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。
- 一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。
- 任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。
- setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。
- 来自不同任务源的任务会进入到不同的任务队列。其中setTimeout与setInterval是同源的。
- 事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。
- 其中每一个任务的执行，无论是macro-task还是micro-task，都是借助函数调用栈来完成。
- 浏览器标准环境中（比如说谷歌webkit内核），是一个宏任务紧接着所有微任务执行。在node环境中，则又不一样了，是一个类型宏任务队列执行完，再去执行微任务。

## 宏观任务 Macro Task
- 由宿主发起的任务称为宏观任务
- script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。

## 微观任务 Micro Task
- 把JavaScript引擎发起的任务称为微观任务
- process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)

## 宏观任务与微观任务
宏观任务的队列就相当于事件循环。
每个宏观任务中包含了一个微观任务队列。

## 参考资料
- [前端基础进阶（十二）：深入核心，详解事件循环机制](https://www.jianshu.com/p/12b9f73c5a4f)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)