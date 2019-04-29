# JavaScript中的事件循环
``` js
// 请写出输出内容
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});

console.log('script end');

/*
script start
async1 start
async2
promise1
script end
promise2
async1 end
setTimeout
*/
```

## 任务队列
首先需要明白以下几件事情:
* js分为同步任务和异步任务
* 同步任务都在主线程上执行，形成一个执行栈
* 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
* 一旦执行栈中的所有同步任务执行完毕(此时JS引擎空闲)，系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

根据规范，事件循环是通过任务队列的机制来进行协调的。一个Event Loop中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合。每个任务都有一个任务源(task source)，源自同一个任务源的task必须放到同一个任务队列，从不同源来的则被添加到不同队列。 setTimeout/Promise等API便是任务源，而进入任务队列的是它们指定的具体执行任务。
![示例图](/eventLoop/1.png)

## 宏任务
(macro)task (又称宏任务)，可以理解是每次执行栈执行的代码就是一个宏任务(包括每次从事件队列中获取一个事件回调并放到执行栈中执行)。

浏览器为了能够使得js内部(mscro)task与DOM任务能够有序的执行，会在一个(macro)task执行结束后，在下一个(macro)task执行开始前，对页面进行重新渲染，流程如下:
```
(macro)task -> 渲染 -> (macro)task -> ...
```
(macro)task主要包含: script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(node.js环境)

## 微任务
microtask(又称为微任务)，可以理解是在当前task执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前。

所以它的响应速度相比setTimeout(setTimeout是task)会更快，因为无需等待渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕(在渲染前)。

microtask主要包含: Promise.then、MutaionObserver、process.nextTick(Node.js环境)

## 运行机制
在事件循环中，每进行一次循环操作成为tick，每一次tick的任务处理模型是比较复杂的，但关键步骤如下:
* 执行一个宏任务(栈中没有就从事件队列中获取)
* 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
* 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务(依次执行)
* 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
* 渲染完毕后，JS线程继续接管，开始下个宏任务(从事件队列中获取)

流程图如下:

![示例图](/eventLoop/2.jpg)

## Promise和async中的立即执行
我们知道Promise中的异步体现在`then`和`catch`中，所以写在Promise中的代码是被当做同步任务立即执行的。而在async/await中，在出现await之前，其中的代码也是立即执行的。那么出现了awaait时候发生了什么

### await 做了什么
await等待的是一个表达式，这个表达式的返回值可以是一个promise对象也可以是其他值。

很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志、await后面的函数会先执行一遍，然后就会跳出整个async函数来执行后面的代码。等本轮事件循环执行完了之后又会跳回到async函数中执行后面的代码。

## 回到本题
以上就本道题涉及到的所有相关知识点了，下面再来看是怎么回事儿。
1、首先，事件循环从宏任务(macrotask)队列开始，这个时候，宏任务队列中，只有一个script(整体代码)任务;当遇到任务源(task source)时，则会先分发任务到对应的任务队列中去。所以，上面例子的第一步执行如下图所示:

![示例图](/eventLoop/3.png)

2、然后我们看到首先定义了两个async函数，接着往下看，然后遇到了`console`语句，直接输出`script start`。输出之后，script任务继续往下执行，遇到`setTimeout`，其作为一个宏任务源，则会先将其任务分发到对应的队列中。

![示例图](/eventLoop/4.png)

3、script任务继续往下执行，执行了async1()函数，前面讲过async函数中在await之前的代码是立即执行的，所以会立即输出`async1 start`，遇到了await时，会将await后面的表达式执行一遍，所以就紧接着输出`async2`，然后跳出async1函数来执行后面的代码，等本轮事件循环执行玩了之后又会跳回async1执行后面的代码。

4、script任务继续往下执行，遇到Promise实例。由于Promise中的函数是立即执行的，而后续的`.then`则会被分发到microtask的`Promise`队列中去。所以会先输出`promise1`，然后执行`resolve`，将`promise2`分配到对应队列。

![示例图](/eventLoop/5.png)

5、script任务继续往下执行，最后只有一句`script end`，至此，全局任务就执行完毕了。  
根据上述，每次执行完一个宏任务之后，会去检查是否存在Microtasks,如果有，则执行Microtasks直至清空Microtask Queue。  
因而在script任务执行完毕之后，开始查找清空微任务队列。此时，微任务中，只有`Promise`队列中的一个任务`promise2`，因此直接执行就行了，执行结果输出`promise2`。当所有的Mircotasks执行完毕之后，表示第一轮的循环就结束了。

6、第二轮循环开始，这个时候就会跳回async1函数中执行后面的代码，然后遇到了同步任务`console`语句，直接输出`async1 end`。这样第二轮的循环就结束了。(也可以理解为被加入到script任务队列中，所以会先于`setTimeout`队列执行)。

7、第三轮循环从宏任务队列开始。此时宏任务中只有一个`setTimeout`，取出直接输出即可，至此整个流程结束。