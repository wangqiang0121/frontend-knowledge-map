var total = 0, count = 1;
while (count <= 10) {
    total += count;
    count += 1;
}

console.log(total);

//  console.log(sum(range(1, 10)));

//  传统
var array = [1,2,3];
for(var i = 0; i < array.length; i++) {
    var current = array[i];
    console.log(current);
}
//  进化1
function logEach(array) {
    for(var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}
//  进化2
function forEach(array, action) {
    for(var i = 0; i < array.length; i++) {
        action(array[i]);
    }
}
var numbers = [1,2,3,4,5] ,sum = 0;
forEach(numbers, function(number) {
    sum += number;
});
console.log(sum);
//  JavaScript => Array.forEach(function);

//  例子
function gatherCorrelations(journal) {
    var phis = {};
    for(var entry = 0; entry < journal.length; entry++) {
        var events = journal[entry].events;
        for(var i  = 0; i < events.length; i++) {
            var event = events[i];
            if(!(event in phis))
                phis[event] = phi(tableFor(event, journal));
        }
    }
    return phis;
}
// Working with forEach
function gatherCorrelations(journal) {
    var phis = {};
    journal.forEach(function(entry) {
        entry.forEach(function(event) {
            if(!(event in phis))
                phis[event] = phi(tableFor(event, journal));
        });
    });
    return phis;
}

//  通过函数创建函数(闭包)
function greaterThan(n) {
    return function(m) { 
        console.log("m:" + m);
        console.log("n:" + n);
        return m > n 
    };
}
var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));  // -> true

//  通过函数改变其他函数
function noisy(f) {
    return function(arg) {
        console.log("calling with", arg);
        var val = f(arg);
        console.log("called with", arg, "-got", val);
        return val;
    };
}
noisy(Boolean)(0);
//  内置函数接受多个参数
function transparentWrapping(f) {
    return function() {
        return f.apply(null, arguments);
    }
}

//  编写函数提供新的控制流
function unless(test, then) {
    if(!test) then();
}
function repeat(times, body) {
    for(var i = 0; i < times; i++) body(i);
}

repeat(3, function(n) {
    unless(n % 2, function() {
        console.log(n, "is even");
    });
});

//  Filter
//  JavaScript => Array.filter(function);
//  Transform
//  JavaScript => Array.map(function);
//  Summarizing
//  JavaScript => Array.reduce(function);