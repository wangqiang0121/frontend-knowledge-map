/**
 * 作用域、执行上下文、作用域链
 */

// question 1
function func() {
  console.log('function func');
}
var func = "coffe";
console.log(func);

// question 2
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    // 这里返回的是个闭包
    return f;
}
checkscope()();

// question 3
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

a.x
b.x