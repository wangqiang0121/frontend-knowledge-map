#JavaScript函数

##函数的定义
- function语句形式
`function test(){}`
- 函数直接量形式
`var test = function(){}`
- 通过function构造函数形式定义函数
`var test = new Function("a","b","return a+b")`

function语句 | Function构造函数 | 函数直接量
----|------|----
句子 | 表达式  | 表达式
有名 | 匿名  | 匿名
静态 | 动态  | 动态
优先解析 | 顺序解析 | 顺序解析
具有函数作用域 | 顶级函数（顶级作用域）| 具有函数作用域

解析顺序问题：
```
test1();		//	成功，又先解析
function test1(){
	alert("Hello");
}

test2();	//失败，变量声明未被赋值；
alert(test2);	//undefined
var test2 = function(){
	alert("World");
}
```
思考下面案例的输出顺序：
```
function f(){return 1;}
console.log(f());
var f=new Function("return 2;");
console.log(f());
var f=function(){return 3;}
console.log(f());
function f(){return 4;}
console.log(f());
var f = new Function("return 5;")
console.log(f());
var f = function(){return 6;}
console.log(f());

//4,2,3,3,5,6
```
function语句式当做全局变量优先解析，所以会被提前。后面定义的包含`return 4;` 会覆盖前面定义的`return 1` 函数。

函数作用域问题
```
var k=1;
function test(){
	var k = 2;
	function a(){console.log(k);}
	var b=function(){console.log(k)};
	var c = new Function("console.log(k);")
	a();    //2
	b();    //2
	c();    //1
}
test();
```
Function构造函数式具有顶级作用域，其余两种是函数作用域。

##函数的参数
函数的实际参数，内部利用一个数组去接受函数的实际参数。arguments对象可以在函数内部访问函数的实际参数。arguments多用于递归操作。
```
function fact(num){
	if(num<=1) return 1;
	else return num*arguments.callee(num-1);
}
console.log(fact(5));		//120
```
##this
this对象是在运行时基于函数的执行环境绑定的。在全局函数中，this等于window，而函数被作为某个对象的方法调用时，this等于那个对象。也就是说，this关键字总是指代调用者。

##call()和apply()方法
- 每一个函数都包含两个非继承而来的方法：call、apply这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值
- call、apply的用途之一就是传递参数，但事实上，他们真正强大的地方是能够扩充函数赖以运行的作用域。
- 使用call、apply来扩充作用域的最大好处就是对象不需要与方法有任何耦合关系。
- call apply 简单的用法：用于传递参数，调用
```
function sum(x,y){
	return x+y;
}
function callt(num1, num2){
		return sum.call(this, num1, num2);
		//将函数绑定到特定作用域，并传递参数
}
function applyt(num1,  num2){
	return sum.apply(this , [num1 , num2]);
	//参数是数组
}
```
扩充作用域：
```
window.color = "red";
var obj = {color:"blue"};
function showColor(){
	alert(this.color);
}
showColor.call(this);	//red
showColor.call(obj);	//blue 参数不同，指代的对象不同。
```
##执行环境、作用域链
- 执行环境是JavaScript中最为重要的一个概念，执行环境定义了变量或函数有权访问其他数据，决定了他们各自的行为。**每一个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中**虽然我们的代码无法访问这个对象，但是解析器在处理数据时会在后台执行它。
- 全局执行环境是最外围的一个执行环境。根据ECMScript实现所在的宿主环境不同，表示的环境的独享也不一样。
- 每一个函数都有自己的执行环境。当执行流进一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返还给之前的执行环境。当代吗在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途是保证对执行环境有访问权的所有变量按序访问。


##垃圾收集、块级作用域
JavaScript具有自动垃圾收集机制的编程语言。标记回收。
JavaScript不具备块级作用域。
JavaScript模拟块级作用域。
```
function test(){
	(function(){
		for(var i=0;i<=5;i++){
			alert(i);
		}
	})();
	alert(i);
}
test();
```
底层代码大量采用这种方法。

## 闭包
- 闭包与函数有着紧密的关系，它是函数的代码在运行过程中的一个动态环境，是一个运行期的、动态的概念。
- 所谓闭包，是指词法表示包括不必计算的变量的函数，也就是说，该函数能够使用函数外定义的变量
- 在程序语言中，所谓闭包。是指语法域位于某个特定的区域。具有持续参照（读写）位于该区域内自身范围之外的执行与上的非常持久型变量值能力的段落，这些外部执行与的非常持久型变量神器的保留他们在闭包最初定义（或创建）时的值。

```
var name = "xiao a";
var obj = {
	name:"xiao B",
	getName:function(){
		return function(){
			return this.name;
		}
	}
};
//alert(obj.getName()());
var f = obj.getName();
alert(typeof k); //function类型
alert( f());
```


