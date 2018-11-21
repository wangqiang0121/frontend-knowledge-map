var greet = function(greeting, name) {
    console.log(greeting + "," + name);
};
greet("Hello", "Heidi"); //  "Hello, Heidi"

var greetCurried = function(greeting) {
    return function(name) {
        console.log(greeting + "," + name);
    };
};
var greetHello = greetCurried("Hello");
greetHello("Heidi"); //  "Hello,Heidi"
greetHello("Eddie"); //  "Hello,Eddie"

greetCurried("Hi there")("Howard"); //  "Hi there, Howard"

var greetDeeplyCurried = function(greeting) {
    return function(separator) {
        return function(emphasis) {
            return function(name) {
                console.log(greeting + separator + name + emphasis);
            };
        };
    };
};
var greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");
greetAwkwardly("Heidi"); //"Hello...Heidi?"
greetAwkwardly("Eddie"); //"Hello...Eddie?"

var sayHello = greetDeeplyCurried("Hello")(", ");
sayHello(".")("Heidi"); //"Hello, Heidi."
sayHello(".")("Eddie"); //"Hello, Eddie."

var askHello = sayHello("?");
askHello("Heidi"); //"Hello, Heidi?"
askHello("Eddie"); //"Hello, Eddie?"

var curryIt = function(uncurried) {
  var parameters = Array.prototype.slice.call(arguments, 1);
  return function() {
    return uncurried.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  };
};

var greeter = function(greeting, separator, emphasis, name) {
  console.log(greeting + separator + name + emphasis);
};
var greetHello = curryIt(greeter, "Hello", ", ", ".");
greetHello("Heidi"); //"Hello, Heidi."
greetHello("Eddie"); //"Hello, Eddie."
var greetGoodbye = curryIt(greeter, "Goodbye", ", ");
greetGoodbye(".", "Joe"); //"Goodbye, Joe."