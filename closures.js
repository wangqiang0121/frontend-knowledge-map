//  词法作用域
function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        alert (name); // displayName() uses variable declared in the parent function    
    }
    displayName();    
}

//  闭包
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
//  displayName() 内部函数在执行前被从其外围函数中返回了。


function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
/*add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。*/