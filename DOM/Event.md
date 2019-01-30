# JavaScript中的事件

## 事件绑定

### HTML直接绑定
```
/* html */
<button onclick="myClickFunc()">ClickMe</button>

/* js */
// 事件处理程序
var myClickFunc = function(evt){
    // TODO..
};

// 移除事件处理程序
myClickFunc = function(){};
```

### DOM0级时间处理
```
/* html */
<button id="btn">ClickMe</button>

/* js */
// 事件处理程序
var myClickFunc = function(evt){
    // TODO ...
};

// 直接给DOM节点的 onclick 方法赋值，注意这里接收的是一个function
document.getElementById('btn').onclick = myClickFunc;

// 移除事件处理程序
document.getElementById('btn').onclick = null;
```

### DOM2级事件处理
```
// event: 事件名称
// function: 事件函数
// boolean: false | true, true 为事件捕获, false 为事件冒泡(默认);
element.addEventListener(event,function[,boolean]); // 添加句柄
element.removeEventListener(event,function[,boolean]); // 移除句柄
```

```
/* html */
<button id="btn">ClickMe</button>

/* js */
// 通过DOM操作进行动态绑定：
// 获取btnHello节点
var oBtn = document.getElementById('btn');

// 增加第一个 click 事件监听处理程序
oBtn.addEventListener('click',function(evt){
    // TODO sth 1...
});

// 增加第二个 click 事件监听处理程序
oBtn.addEventListener('click',function(evt){
    // TODO sth 2...
});

// ps：通过这种形式，可以给btn按钮绑定任意多个click监听；注意，执行顺序与添加顺序相关。

// 移除事件处理程序
oBtn.removeEventListener('click',function(evt){..});
```

## 事件冒泡与事件捕获

### 事件冒泡
事件冒泡就是事件触发时，会从目标DOM元素向上传播，直到文档根节点
targetDOM → parentNode → ... → body → document → window

在有些时候，我们想让事件独立触发，所以我们必须阻止冒泡，用event的stopPropagation()方法。

注意：
- 不是所有的事件都能冒泡，如：blur、focus、load、unload都不能
- 不同的浏览器，阻止冒泡的方式也不一样，在w3c标准中，通过event.stopPropagation()完成， 在IE中则是通过自身的event.cancelBubble=true来完成。

## 事件委托
- 利用事件冒泡的原理，在多个元素的公共父级上监听事件
- 通过`event.traget`判断触发的元素

优点：
- 管理的函数变少了。不需要为每个元素都添加监听函数。对于同一个父节点下面类似的子元素，可以通过委托给父元素的监听函数来处理事件。
- 可以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。
- JavaScript和DOM节点之间的关联变少了，这样也就减少了因循环引用而带来的内存泄漏发生的概率。

## `this`与`event.target`、`event.curentTarget`的区别
- `this`等于`event.currentTarget`，当前绑定事件的元素
- `event.target`事件触发的源头。