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
由宿主发起的任务称为宏观任务
- script
- setTimeout
- setInterval
- setImmediate
- I/O
- UI
- rendering

## 微观任务 Micro Task
把JavaScript引擎发起的任务称为微观任务
- process.nextTick
- Promise
- Object.observe(已废弃)
- MutationObserver(html5新特性)

## 宏观任务与微观任务
宏观任务的队列就相当于事件循环。
每个宏观任务中包含了一个微观任务队列。

## Node.js中的事件循环
JavaScript在构建时考虑了异步行为，因此我们通常不会马上执行所有操作。以下列举的方法，事件不会直接按顺序执行:

microtasks

例如，立即处理Promises，如Promise.resolve。它意味着这段代码会在同一个的事件循环中被执行，但得等到所有同步代码执行完后。

process.nextTick

这是Node.js特有的方法，它不存在于任何浏览器（以及进程对象）中。它的行为类似于微任务(microtask)，但具有优先级。这意味着它将在所有同步代码之后立即执行，即使之前引入了其他微任务 - 这是很危险的，可能导致无限循环。从命名上讲是不对的，因为它是在同一个事件循环中执行的，而不是在它的next tick中执行。但是由于兼容性原因，它可能保持不变。

setImmediate

虽然它确实存在于某些浏览器中，但并未在所有浏览器中达到一致的行为，因此在浏览器中使用时，您需要非常小心。它类似于 setTimeout（0）代码，但有时会优先于它。这里的命名也不是最好的 - 我们在谈论下一个事件循环迭代，它并不是真正的immidiate。

setTimeout/setInterval

定时器在Node和浏览器中的表现形式是相同的。关于定时器的一个重要的事情是，我们提供的延迟不代表在这个时间之后回调就会被执行。它的真正含义是，一旦主线程完成所有操作（包括微任务）并且没有其它具有更高优先级的定时器，Node.js将在此时间之后执行回调。

参考 Example 7

## 参考资料
- [前端基础进阶（十二）：深入核心，详解事件循环机制](https://www.jianshu.com/p/12b9f73c5a4f)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)