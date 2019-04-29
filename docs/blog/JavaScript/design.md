---
{
  tags: ['JavaScript', '设计模式']
}
---
# JavaScript设计模式
> JavaScript中常见设计模式整理 [原文地址](https://juejin.im/post/5afe6430518825428630bc4d)
## 单例模式

#### 单例模式两个条件
* 确保只有一个实例
* 可以全局访问 

#### 适用
适用于弹框的实现、全局缓存

### 实现单例模式
``` javascript
const singleton = function(name) {
    this.name = name;
    this.instance = null;
}
singleton.prototype.getName = function() {
    console.log(this.name);
}
singleton.getInstance = function(name) {
    if(!this.instance) {
        this.instance = new singleton(name);
    }
    return this.instance
}
// test
const a = singleton.getInstance('a');
const b = singleton.getInstance('b');
console.log(a === b) // true
```

#### JavaScript中的单例模式
因为JavsScript是无类的语言，而且JS中的全局对象符合单例模式两个条件。很多时候把全局对象当成单例模式来使用
``` javascript
var obj = {}
```

#### 弹框层的实践
实现弹框的一种做法是先创建好弹框，然后使之隐藏，这样子的话会浪费部分不必要的dom开销，我们可以在需要弹框的时候再进行创建，同时结合单例模式实现只有一个实例，从而节省部分DOM开销。
``` javascript
const createLoginLayer = function() {
    const div = document.createElement('div')
    div.innerHTML = '弹窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}
```
使单例模式和创建弹框代码解耦
``` javascript
const getSingle = function(fn) {
    const result
    return function() {
        return result || result = fn.apply(this, arguments)
    }
}
```
``` javascript
const createSingleLoginLayer = getsingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function() {
    createSingleLoginLayer();
}
```

## 策略模式
* 根据不同参数可以命中不同的策略

#### JavaScript中的策略模式
观察如下获取年终奖的demo，根据不同的参数(level)获得不同策略方法(规则)，这是策略模式在JS比较经典的运用之一。
``` javascript
const strategy = {
    'S': function(salary) {
        return salary * 4;
    },
    'A': function(salary) {
        return salary * 3;
    },
    'B': function(salary) {
        return salary * 2;
    }
}
const calcylateBonus = function(level, salary) {
    return strategy[level](salary);
}
calcylateBonus('A', 10000) // 30000
```
在函数是一等公民的JS中，策略模式的使用常常隐藏在高阶函数中，稍微变换下上述demo的形式如下，可以发现我们平时已经在使用它了
``` javascript
const S = function(salary) {
    return salary * 4;
}
const A = function(salary) {
    return salary * 3;
}
const B = function(salary) {
    return salary * 2;
}
const calculateBonus = function(func, salary) {
  return func(salary)
}

calculateBonus(A, 10000) // 30000
```

#### 优点
* 能减少大量if语句
* 复用性好

## 代理模式
情景: 小明追女生A
* 非代理模式: 小明 => 花 => 女生A
* 代理模式: 小明 => 花 => 让女生A的好友帮忙 => 花 => 女生A

#### 代理模式的特点
* 代理对象和本体对象具有一致性的接口，对使用者友好  

代理模式的种类有很多，在JS中最常用的为虚拟代理和缓存代理

##### 虚拟代理实现图片与家长
下面这段代码运用代理模式来实现图片预加载，可以看到通过代理模式巧妙的将创建图片与预加载逻辑分离，并且在未来如果不需要预加载，只要改成请求本体代替请求代理对象就行。
``` javascript
const myImage = (function() {
    const imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src
        }
    }
})();

const proxyImage = (function() {
    const img = new Image();
    img.onload = function() { // http图片加载完毕后才会执行
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            myImage.setSrc('loading.jpg') // 本地loading图片
            img.src = src
        }
    }
})()
proxyImage.setSrc('http://laded.jpg')
```
##### 缓存代理实现乘积计算
``` javascript
const mult = function() {
    let a = 1;
    for (let i = 0, l; l = arguments[i++];) {
        a = a * l;
    }
    return a
}

const proxyMult = (function() {
    const cache = {};
    return function() {
        const tag = Array.prototype.join.call(arguments, ',');
        if(cache[tag]) {
            return cache[tag]
        }
        cache[tag] = mult.apply(this, arguments);
        return chche[tag]
    }
})()
proxyMult(1, 2, 3, 4)
```

::: warning Tip
在开发时候不要先去猜测是否需要使用代理模式，如果发现直接使用某个对象不方便时，再来优化不迟
:::

## 命令模式
命令模式与策略模式有些类似，在JavaScript中它们都是隐式的。

#### JavaScript中的命令模式

命令模式在JavaScript中也比较简单，下面代码中对按钮和命令进行了抽离，因此在复杂项目中可以使用命令模式将洁面的代码和功能的代码交付给不同的人去写。

``` javascript
const setCommand = function(button, command) {
    button.onClick = function() {
        command.excute();
    }
}
// 上面的界面逻辑由A完成，下面的由B完成
const menu = {
    updateMenu: function() {
        console.log('更新菜单');
    }
}
const UpdateCommand = function(receive) {
    return {
        excute: receive.updateMenu
    }
}
const updateCommand = UpdateCommand(menu); // 创建命令

const button = document.getElementById('button');
setCommand(button. updateCommand);
```

## 模板方法模式
在继承的基础上，在父类中定义好执行的算法。

#### 泡茶和泡咖啡
步骤 | 泡茶 | 泡咖啡 
:-: | :-: | :-: 
1 | 烧开水| 烧开水 
2 | 浸泡茶叶 | 冲泡咖啡 
3 | 倒入杯子 | 倒入杯子 
4 | 加柠檬 | 加糖 

可以看出仅在步骤2和步骤4上有细微的差别
``` javascript
const Drinks = function() {};
Drinks.prototype = {
    firstStep: function() {
        console.log('烧开水')
    },
    secondStep: function() {
        console.log('2')
    },
    thirdStep: function() {
        console.log('倒入杯子')
    },
    fourthStep: function() {
        console.log('4')
    },
    init: function() {
        this.firstStep();
        this.secondStep();
        this.thirdStep();
        this.fourthStep();
    }
}
const Tea = function() {}
Tea.prototype = new Drinks
Tea.prototype.secondStep = function() {
    console.log('浸泡茶叶');
}
Tea.prototype.fourthStep = function() {
    console.log('加柠檬');
}
const Coffee = function() {}
Coffee.prototype = new Drinks
Coffee.prototype.secondStep = function() {
    console.log('冲泡咖啡');
}
Coffee.prototype.fourthStep = function() {
    console.log('加糖');
}
const tea = new Tea();
tea.init();
const coffee = new Coffee();
coffee.init();
```

#### 钩子
假如客人不想加佐料(糖、柠檬)怎么办，这时可以引入钩子来实现
``` javascript
// ...
Drinks.prototype.ifNeedFlavour = function() {
    return true
}
Drinks.prototype.init = function() {
    this.firstStep();
    this.secondStep();
    this.thirdStep();
    if(this.ifNeedFlavour()) {
        this.fourthStep();
    }
}
// ...
Coffee.prototype.ifNeedFlavour = function() {
    return window.confirm('是否需要佐料？') // 弹窗选择是否需要佐料
}
```

## 职责链模式
* 类似多米诺骨牌，通过请求第一个条件，会持续执行后续的条件，知道返回结果为止
* 在项目中能对if-else语句进行优化

#### 场景demo
某电商针对已付过定金的用户有优惠政策，在正式购买后，已经支付过500元定金的用户会收到100元的优惠卷，200元定金的用户可以收到50元优惠卷，没有支付过定金的用户只能正常购买。
``` javascript
// orderType: 表示订单类型 1、500元定金用户;2、200元定金用户;3、普通购买用户
// pay: 表示用户是否已经支付过定金，true: 已支付;false: 未支付
// stock: 表示当前用于普通购买的手机库存数量，已支付过定金的用户不受此限制
const order = function(orderType, pay, stock) {
    if(orderType === 1) {
        if(pay) {
            console.log('500元定金预购，得到100元优惠卷');
        } else {
            if(stock > 0) {
                console.log('普通购买，无优惠卷');
            } else {
                console.log('库存不足，无法购买');
            }
        }
    } else if(orderType === 2) {
        if(pay) {
            console.log('200元定金预购，得到50元优惠卷');
        } else {
            if(stock > 0) {
                console.log('普通购买，无优惠卷');
            } else {
                console.log('库存不足，无法购买');
            }
        }
    } else if(orderType === 3) {
        if(stock > 0) {
            console.log('普通购买，无优惠卷');
        } else {
            console.log('库存不足，无法购买');
        }
    }
}
order(3, true, 500) //普通购买，无优惠券
```
下面用职责链模式改造代码:
``` javascript
const order500 = function(orderType, pay, stock) {
    if(orderType === 1 && pay) {
        console.log('500元定金预购，得到100元优惠卷');
    } else {
        order200(orderType, pay, stock);
    }
}
const order200 = function(orderType, pay, stock) {
    if(orderType === 2 && pay) {
        console.log('200元定金预购，得到50元优惠卷');
    } else {
        orderCommon(orderType, pay, stock);
    }
}
const orderCommon = function(orderType, pay, stock) {
    if(orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买')
    }
}
order500(3, true, 500) // 普通购买，无优惠券
```
改造后可以发现代码逻辑相对清晰了，但是链路代码和业务代码依然耦合在一起，进一步优化:
``` javascript
// 业务代码
const order500 = function(orderType, pay, stock) {
    if(orderType === 1 && pay) {
        console.log('500元定金预购，得到100元优惠卷');
    } else {
        return 'nextSuccess'
    }
}
const order200 = function(orderType, pay, stock) {
    if(orderType === 2 && pay) {
        console.log('200元定金预购，得到50元优惠卷');
    } else {
        return 'nextSuccess'
    }
}
const orderCommon = function(orderType, pay, stock) {
    if(orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买')
    }
}
// 链路代码
const chain = function(fn) {
    this.fn = fn;
    this.sucessor = null;
}
chain.prototype.setNext = function(sucessor) {
    this.sucessor = sucessor;
}
chain.prototype.init = function() {
    const result = this.fn.apply(this, arguments);
    if(result === 'nextSuccess') {
        this.sucessor.init.apply(this.sucessor, arguments);
    }
}
const order500New = new chain(order500);
const order200New = new chain(order200);
const orderCommonNew = new chain(orderCommon);
order500New.setNext(order200New);
order200New.setNext(orderCommonNew);

order500New.init(3, true, 500) // 普通购买，无优惠券
```
重构后，链路代码和业务代码彻底的分离，假如未来需要新增order300，那只需要新增与其相关的函数而不必改动原有业务代码。  

另外结合AOP还能简化上述链路代码:
``` javascript
// 业务代码
const order500 = function(orderType, pay, stock) {
    if(orderType === 1 && pay) {
        console.log('500元定金预购，得到100元优惠卷');
    } else {
        return 'nextSuccess'
    }
}
const order200 = function(orderType, pay, stock) {
    if(orderType === 2 && pay) {
        console.log('200元定金预购，得到50元优惠卷');
    } else {
        return 'nextSuccess'
    }
}
const orderCommon = function(orderType, pay, stock) {
    if(orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买')
    }
}

// 链路代码
Function.prototype.after = function(fn) {
    const self = this;
    return function() {
        const result = self.apply(self, arguments);
        if(result === 'nextSuccess') {
            return fn.apply(self, arguments)
        }
    }
}

const order = order500.after(order200).after(orderCommon);
order(3, true, 500) // 普通购买，无优惠券
```
::: warning 重点
职责链模式比较重要，用上它能解耦1个请求对象和n个目标对象的关系
:::

## 享元模式
享元模式是一种优化程序性能的模式，本质为减少对象创建的个数  
以下情况可以使用享元模式
* 有大量相似的对象，占用了大量内存
* 对象中大部分状态可以抽离为外部状态

#### demo
某商家有50种男款内衣和50种女款内衣，要展示它们  
方案一: 造50个塑料男模和50个塑料女模，让它们穿上展示
``` javascript
const Model = function(gender, underwear) {
    this.gender = gender;
    this.underwear = underwear;
}
Model.prototype.takephoto = function() {
    console.log(`${this.gender}穿着${this.underwear}`);
}
for(let i = 1; i < 51; i++) {
    const maleModel = new Model('male', `第${i}款衣服`)；
    maleModel.takephoto();
}
for(let i = 1; i < 51; i++) {
    const female = new Model('female', `第${i}款衣服`)；
    female.takephoto();
}
```
方案二: 造一个塑料男模1个塑料女模，分别试穿50款内衣
``` javascript
const Model = function(gender) {
    this.gender = gender;
}
Model.prototype.takephoto = function() {
    console.log(`${this.sex}穿着${this.underwear}`)
}
const maleModel = new Model('male');
const femaleModel = new Model('female');
for(let i = 1; i < 51; i++) {
    maleModel.underwear = `第${i}款衣服`;
    maleModel.takephoto();
}
for(let i = 1; i < 51; i++) {
    femaleModel.underwear = `第${i}款衣服`;
    femaleModel.takephoto();
}
```
对比发现: 方案一创建了100个对象，方案二只创建了2个对象，在该demo中，gender(性别)是内部对象，underwear(穿着)是外部对象   
当然在方案二的demo中，还可以进一步改善:
* 一开始就通过构造函数显式的创建实例，可用工厂模式将其升级成可控生产
* 在实例上手动添加underwear不是很优雅，可以在外部单独再写个manager函数
``` javascript
const Model = function(gender) {
    this.gender = gender;
}
Model.prototype.takephoto = function() {
    console.log(`${this.gender}穿着${this.underwear}`);
}
const modelFactory = (function() { // 优化第一点
    const modelGender = {};
    return {
        createModel: function(gender) {
            if(modelGender[gender]) {
                return modelGender[gender]
            }
            return modelGender[gender] = new Model(gender)
        }
    }
}())
const modelManager = (function() {
    const modelObj = {}
    return {
        add: function(gender, i) {
            modelObj[i] = {
                underwear: `${i}款衣服`
            }
            return modelFactory.createModel(gender)
        },
        copy: function(model, i) { // 优化第二点
            model.underwear = modelObj[i].underwear
        }
    }
}());

for(let i = 1; i < 51; i++) {
    const maleModel = modelManager.add('male', i);
    modelManager.copy(maleModel, i);
    maleModel.takephoto();
}
for(let i = 1; i < 51; i++) {
    const femaleModel = modelManager.add('male', i);
    modelManager.copy(femaleModel, i);
    femaleModel.takephoto();
}
```
## 中介者模式
对象和对象之间借助第三方中介者进行通信

#### demo
一场测试结束后，公布结果: 告知解答出题目的人挑战成功，否则挑战失败
``` javascript
const player = function(name) {
    this.name = name;
    playerMiddle.add(name)
}
player.prototype.win = function() {
    playerMiddle.win(this.name);
}
player.prototype.lose = function() {
    playerMiddle.lose(this.name);
}

const playerMiddle = (function() {
    const players = [];
    const winArr = [];
    const loseArr = [];
    return {
        add: function(name) {
            players.push(name)
        },
        win: function(name) {
            winArr.push(name)
            if(winArr.length + loseArr.length === players.length) {
                this.show();
            }
        },
        lose: function(name) {
            loseArr.push(name)
            if(winArr.length + loseArr.length === players.length) {
                this.show();
            }
        },
        show: function() {
            for(let winner of winArr) {
                console.log(winner + '挑战成功;');
            }
            for(let loser of loseArr) {
                console.log(loser + '挑战失败;');
            }
        }
    }
}());
const a = new player('A 选手');
const b = new player('B 选手');
const c = new player('C 选手');
a.win();
b.win();
c.lose();
```
在这段代码中A、B、C之间没有直接发生关系，而是通过宁外的playerMiddle对象建立连接

## 装饰器模式
动态的给函数赋能

#### JavaScript中的装饰器模式
生活中的例子: 天气冷了,就添加衣服来保暖;天气热了,就将外套脱下;随着天气的冷暖变化，衣服可以动态的穿上脱下
``` javascript
let wear = function() {
    console.log('穿上第一件衣服');
}
const _wear1 = wear;
wear = function() {
    _wear1();
    console.log('穿上第二件衣服');
}
const _wear2 = wear;
wear = function() {
    _wear2();
    console.log('穿上第三件衣服');
}
wear();
// 穿上第一件衣服
// 穿上第二件衣服
// 穿上第三件衣服
```
这种方式有一下缺点
* 临时变量会变得越来越多
* this指向有时会出错

#### AOP装饰函数
``` javascript
// 前置代码
Function.prototype.before = function(fn) {
    const self = this;
    return function() {
        fn.apply(new(self), arguments);
        return self.apply(new(self), arguments);
    }
}
// 后置代码
Function.prototype.after = function(fn) {
    const self = this;
    return function() {
        self.apply(new(self), arguments);
        return fn.apply(new(self), arguments);
    }
}
```
用后置代码来实验下上面穿衣服的demo
``` javascript
const wear1 = function() {
  console.log('穿上第一件衣服')
}

const wear2 = function() {
  console.log('穿上第二件衣服')
}

const wear3 = function() {
  console.log('穿上第三件衣服')
}

const wear = wear1.after(wear2).after(wear3)
wear()

// 穿上第一件衣服
// 穿上第二件衣服
// 穿上第三件衣服
```
但这样有时会污染原生函数，可以做点变通
``` javascript
const after = function(fn, afterFn) {
  return function() {
    fn.apply(this, arguments)
    afterFn.apply(this, arguments)
  }
}
const wear = after(after(wear1, wear2), wear3)
wear()
```

## 状态模式
将事物内部的每个状态分别封装成类，内部状态改变会产生不同的行为  

优点: 用对象代替字符串记录当前状态，状态易维护  
缺点: 需编写大量状态类对象

#### 场景demo
某电灯，按一下按钮打开弱光，按两下按钮打开强光，按三下按钮关闭灯光
``` javascript
// 将状态封装成不同类
const weakLight = function(light) {
    this.light = light
}
weakLight.prototype.press = function() {
    console.log('打开强光');
    this.light.setState(this.light.strongLight);
}
const strongLight = function(light) {
    this.light = light;
}
strongLight.prototype.press = function() {
    console.log('关灯');
    this.light.setState(this.light.offLight);
}
const offLight = function(light) {
    this.light = light;
}
offLight.prototype.press = function() {
    console.log('打开弱光');
    this.light.setState(this.light.weakLight);
}
const Light = function() {
    this.weakLight = new weakLight(this);
    this.strongLight = new strongLight(this);
    this.offLight = new offLight(this);
    this.currentState = this.offLight;
}
Light.prototype.init = function() {
    const btn = document.createElement('button');
    btn.innerHTML = '按钮';
    document.body.append(btn);
    const self = this;
    btn.addEventListener('click', function() {
        self.currentState.press();
    })
}
Light.prototype.setState = function(state) { // 改变当前状态
    this.currentState = state
}
const light = new Light();
light.init();
```
#### 非面向对象实现的状态模式
借助于JavaScript的委托机制，可以像如下实现状态模式
``` javascript
const obj = {
    'weakLight': {
        press: function() {
            console.log('打开强光');
            this.currentState = obj.strongLight;
        }
    },
    'strongLight': {
        press: function() {
            console.log('关灯');
            this.currentState = obj.offLight;
        }
    },
    'offLight': {
        press: function() {
            console.log('打开弱光');
            this.currentState = obj.weakLight;
        }
    }
}
const Light = function() {
    this.currentState = obj.offLight;
}
Light.prototype.init = function() {
    const btn = document.createElement('button');
    btn.innerHTML = '按钮';
    document.body.append(btn);
    const self = this;
    btn.addEventListener('click', function() {
        self.currentState.press.call(self)
    })
}
const light = new Light();
light.init();
```

## 适配者模式
主要用于解决两个接口之间不匹配的问题
``` javascript
// 老接口
const zhejiangCityOld = (function() {
    return [{
        name: 'hangzhou',
        id: 11
    }, {
        name: 'jinhua',
        id: 12
    }]
}());
// 新接口希望是下面形式
{
    hangzhou: 11,
    jinhua: 12
}
// 这时候就可采用适配者模式
const adaptor = (function(oldCity) {
    const obj = {};
    for(let city of zhejiangCityOld) {
        obj[city.name] = city.id
    }
    return obj
}())
```

## 观察者模式
观察者(又称发布订阅)模式定义了对象间的一种一对多的依赖关系，以便一个对象的状态发生变化时，所有依赖于它的对象都得到通知并自动刷新  
优点: 在发布者和订阅者间的耦合性降低  
缺点: 弱化了对象间的关系，不利于代码的维护和理解

#### demo
``` javascript
let event = {};
event.list = [];
//增加订阅者
event.listen = function(fn){
    event.list.push(fn);
}
//发布消息
event.trigger = function(){
    for(var i = 0,fn; fn = this.list[i++];) {
        fn.apply(this,arguments); 
    }
}

let click = function(){
    console.log('event：click');
}

let hover = function(){
    console.log('event：hover');
}

event.listen(click);
event.listen(hover);
event.trigger();
//打印：
‘event：click’
'event：hover'
```
#### 完善观察者模式
``` javascript
let Event = (function(){
    var list = {},
        listen,
        trigger,
        remove;
    listen = function(key,fn){
        list[key] = list[key]||[];
        list[key].push(fn);
    };
    trigger = function(){
        var key = Array.prototype.shift.call(arguments),
            fns = list[key];
        if(!fns || fns.length === 0) {
            return false;
        }
        for(var i = 0, fn; fn = fns[i++];) {
            fn.apply(this,arguments);
        }
    };
    remove = function(key,fn){
        var fns = list[key];
        if(!fns) {
            return false;
        }
        if(!fn) {
            fns && (fns.length = 0);
        }else {
            for(var i = fns.length - 1; i >= 0; i--){
                var _fn = fns[i];
                if(_fn === fn) {
                    fns.splice(i,1);
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

Event.listen('click', function(type) {
    console.log('event: ' + type +' click');
});

Event.trigger('click' , 'button');
//打印
'event: button click'
```
