# call和apply的模拟实现

## call
> call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数和方法。
``` js
var foo = {
    value: 1
}
function bar() {
    console.log(this.value);
}
bar.call(foo); // 1
```
* call改变了this的指向，指向到foo
* bar函数执行了

## 第一步
当调用call的时候，把foo对象改造成如下:
``` js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value);
    }
}
foo.bar(); // 1
```
这个时候this就指向了foo。
但是这样却给foo对象本身添加了一个属性，不过之后用delete删除就好了。
随意模拟的步骤可以分为:
* 将函数设为对象的属性
* 执行该函数
* 删除该函数

``` js
// 第一步
foo.fn = bar;
// 第二步
foo.fn();
// 第三步
delete foo.fn
```
根据这个思路，可以尝试去写第一版call2函数:
``` js
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}
// 测试一下
var foo = {
    value: 1
}

function bar() {
    console.log(this.value);
}
bar.call2(foo); // 1
```
## 第二步
call函数还能给定参数执行函数:
``` js
var foo = {
    value: 1
}
function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}
bar.call(foo, 'Kyle', 18);
// Kyle
// 18
// 1
```
注意: 传入的参数并不确定
可以从Arguments对象中取值，去出第二个到最后一个参数，然后放到一个数组里。
``` js
// 以上个例子为例，此时的argument为
// arguments = {
//     0: foo,
//     1: 'Kyle'
//     2: 18
//     length: 3
// }
// 因为arguments是类数组对象，所以可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments['+ i +']');
}
// 执行后args为['arguments[1]', 'arguments[2]', 'arguments[3]']
```
接着把这个参数数组放到要执行的函数里去。
``` js
eval('context.fn('+ args +')');
```
这里args会自动调用`Array.toString()`这个方法

第二版代码如下:
``` js
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = argments.length; i < len; i++) {
        args.push('arguments['+ i +']');
    }
    eval('context.fn('+ args +')');
    delete context.fn;
}
// 测试一下
var foo = {
    value: 1
}
function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}
bar.call2(foo, 'Kyle', 18);
// Kyle
// 18
// 1
```
## 第三步
* this参数是可以传null的，当为null的时候，视为指向window
``` js
var value = 1;
function bar() {
    console.log(this.value);
}
bar.call(null); // 1
```
* 函数式可以有返回值的
``` js
var obj = {
    value: 1
}
function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}
console.log(bar.call(obj, 'Kyle', 18));
// {
//    value: 1,
//    name: 'Kyle',
//    age: 18
// }
```
都很好解决，第三版代码:
``` js
// 第三版
Function.prototype.call2 = function(context) {
    var context = context || window;
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments['+ i +']');
    }
    var result = eval('context.fn('+ args +')');
    delete context.fn;
    return result;
}
// 测试一下
var value = 2;
var obj = {
    value: 1
}
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
bar.call2(null); // 2
console.log(bar.call2(obj, 'Kyle', 18))
// 1
// {
//    value: 1,
//    name: 'Kyle',
//    age: 18
// }
```

## ES6实现call
``` js
Function.prototype.call2 = function(context, ...args) {
    context = context || window;
    // 防止覆盖context属性
    let fn = Symbol();
    context[fn] = this;
    var result = context[fn](...args);
    Reflect.deleteProperty(context, fn);
    return result;
}
```

## apply的模拟实现
``` js
Function.prototype.apply2 = function(context, arr) {
    var context = Object(context) || window;
    context.fn = this;
    var result;
    if(!arr) {
        result = context.fn();
    } else {
        var args = [];
        for(var i = 0, len = arr.length; i < len; i++) {
            args.push('arr['+ i +']');
        }
        result = eval('context.fn('+ args +')')
    }
    delete context.fn
    return result;

}
```
