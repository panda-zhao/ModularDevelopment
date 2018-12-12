# JS的模块化规范

如果JS有了模块功能，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。

其他语言都有这项功能，比如 Ruby 的`require`、Python 的`import`，甚至就连 CSS 都有`@import`，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS ，AMD 和 CMD三种。

CommonJS --- 同步模块定义规范

AMD --- Asynchronous Module Definition----异步模块定义规范

CMD --- Common Module Definition --- 通用模块定义规范

| 类型     | CommonJS规范                                                 | AMD                              | CMD                     |
| -------- | ------------------------------------------------------------ | -------------------------------- | ----------------------- |
| 规范     | 同步模块定义规范                                             | 异步加载模块规范                 |                         |
| 加载方式 | 同步加载                                                     | 异步加载                         | 异步加载                |
| 主要场景 | 主要用在服务端                                               | 浏览器端的模块加载器             | web浏览器端的模块加载器 |
| 实践     | 比如NodeJS， webpack                                         | require.js                       | sea.js                  |
| 缺陷     | 浏览器默认不支持，同步加载在浏览器端容易出现问题             | 需要修改类库自身来支持require.js | es6的普及已经停止维护   |
| 解决方案 | Browserify 格式转换工具可以把 nodejs的模块编译成浏览器可用的模块 |                                  |                         |

# ES6模式

在ES6前， 前端就使用RequireJS或者seaJS实现模块化， requireJS是基于AMD规范的模块化库，  而像seaJS是基于CMD规范的模块化库，  两者都是为了为了推广前端模块化的工具

现在ES6在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6的模块化的基本规则或特点

- 每一个模块只加载一次， 每一个JS只执行一次， 如果下次再去加载同目录下同文件，直接从内存中读取。 一个模块就是一个单例，或者说就是一个对象；
- 每一个模块内声明的变量都是局部变量， 不会污染全局作用域；
- 模块内部的变量或者函数可以通过export导出；
- 一个模块可以导入别的模块

> 缺陷：目前大部分浏览器对es6支持仍然很差。解决方案使用Babel.js将ES6转换为浏览器可以读取的文件

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

| 类型         | CommonJS                                                     | ES6                                                          |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 加载方式     | 加载模块内所有方法生成一个对象，然后再从这个对象上面读取方法。这种加载称为“运行时加载”。<br>因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。 | 从模块加载指定的方法其他方法不加载。这种加载称为“编译时加载”或者静态加载。<br>即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。 |
| 顶层this指向 | 当前模块                                                     | undefined                                                    |

## 1 定义模块

````javascript
// export.js
export const add = function(x,y){
  return x + ' ' + y
}
````

## 2 加载模块

```javascript
//import.js
import { add } from './export.js'
console.log( add('hello','ES6') )
```

此时使用 `babel-node` 测试发现服务端其实已经成功了！

```
babel-node import.js //hello ES6
```

## 3 在浏览器中使用

> 注意截止目前2018-12-12：import和export这两个命令现在在任何浏览器中都是不支持的

同时babel也无法将其转换为浏览器支持的ES5, 原因在于:

babel只是个翻译，假设a.js 里 import 了 b.js, 对a.js进行转码，只是翻译了a.js，并不会把b.js的内容给读取合并进来, 如果想在最终的某一个js里，包含 a.js，b.js 

的代码，那就需要用到打包工具

解决方案1：babel + browserify

首先通过babel把ES6转换成CommonJS

```
babel src -d lib
```

此时再通过browserify转换给浏览器使用

```
browserify import.js > bundle.js
```

最后再浏览器中引入

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ES6模块规范测试</title>
</head>
<body>
  <h1>ES6模块规范</h1>
  <script src="./lib/bundle.js"></script>
</body>
</html>
```

解决方案二

推荐在webpack中使用，然后通过打包的形式可以直接得到完整的浏览器可以允许的代码，具体这里就先不说了!

# CommonJS---同步模块定义规范

CommonJS定义的模块分为:

- module对象：代表模块本身；
- exports对象：用于导出当前模块的方法或变量，唯一的导出口；
- require()：用来引入外部模块。

```
// CommonJS模块
var math = require('math');
math.add(2, 3);
```

> 第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。
>
> 服务器端这不是问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。
>
> 对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态
>
> 而browserify这样的一个工具，可以把nodejs的模块编译成浏览器可用的模块，解决上面提到的问题。本文将详细介绍Browserify

## 1 定义模块

```javascript
// export.js
var test = function(x){
  console.log(x)
}
var get = function(){
  console.log('我是get方法')
}
var post = function(){
  console.log('我是post方法')
}
module.exports = {test,get,post}
```

## 2  模块引用

```javascript
//require.js
var utils = require('./export.js')
console.log(utils)
utils.test('hello world!')
utils.get()
utils.post()
```

## 3 Browserify转换（客户端时使用）

index.html直接引用main.js会报错，提示require没有被定义

> 原因：浏览器客户端缺少 module  exports  require  global四个环境变量的支持

Browserify是目前最常用的CommonJS格式转换的工具，  可以把 nodejs的模块编译成浏览器可用的模块

```
# 安装Browserify 
npm install -g browserify

# 使用Browserify转换格式并将文件打包到bundle.js
browserify require.js > bundle.js
```

转换以后直接（`index.html`）引用（`bundle.js`）现在浏览器已经可以正常使用了。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>测试CommonJS</title>
</head>
<body>
  <script src="./bundle.js"></script>
</body>
</html>
```

# AMD---异步模块定义规范

对于浏览器，如果使用commonJS是一个大问题。**因为require 是同步的**，必须等待模块加载完成才能够继续运行代码，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。

requireJS主要解决两个问题：

1. 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器；
2. js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长。

看一个使用requireJS的例子：

## 1 定义模块 

```javascript
//myModule
define(['dependency'], function(){
    var name = 'Byron';
    function printName(){
       console.log(name);
    }
    return {
        printName: printName
    };
});
```

requireJS定义了一个函数 define，它是全局变量，用来定义模块。

```
define(id?, dependencies?, factory);
```

- id：可选参数，用来定义模块的标识，如果没有提供该参数，脚本文件名（去掉拓展名）；
- dependencies：可选参数，是一个当前模块依赖的模块名称数组
- factory：工厂方法，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值；

## 2 加载模块

```javascript
// main.js 加载模块
require(['myModule'], function (my){
　 my.printName();
});
```

在页面上使用require函数加载模块；

```
require([dependencies], function(){});
```

require()函数接受两个参数：

- 第一个参数是一个数组，表示所依赖的模块；
- 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

## 3 在浏览器中使用

使用时只需要先引入require.js，在执行加载模块就可以了

> 注意：
>
> async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。
>
> data-main属性的作用是，指定网页程序的主模块。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>测试amd规范</title>
</head>
<body>
  <script src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js" defer async="true" data-main="./main.js"></script>
</body>
</html>
```

# CMD---通用模块定义规范

CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同：[seajs官方doc](http://seajs.org/docs/#docs)

Sea.js 推崇一个模块一个文件，遵循统一的写法

```
define(id?, deps?, factory)
```

因为CMD推崇一个文件一个模块，所以经常就用文件名作为模块id；

CMD推崇依赖就近，所以一般不在define的参数中写依赖，而是在factory中写。factory有三个参数：

```
function(require, exports, module){}
```

- require 是 factory 函数的第一个参数，require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口；
- exports 是一个对象，用来向外提供模块接口；
- module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

## 1 定义模块

```javascript
//myModule.js
define(function(require, exports, module) {

  // 获取模块 jquery 的接口
  // var $ = require('https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js')
  // 调用jquery的方法(这样执行时如果未加载完会报错)
  // $('body').css({'background':'#ff0'});

  // 异步加载一个模块，在加载完成时，执行回调
  require.async('https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js', function(b) {
    $('body').css({'background':'#ff0'});
  });

  // // 异步加载多个模块，在加载完成时，执行回调
  // require.async(['https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js', 'https://cdn.bootcss.com/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js'], function(c, d) {
  //   console.log(c)
  //   console.log(d)
  // });

  // 对外提供属性或者方法
  exports.name = 'sea.js';
  exports.doSomething = function() {
    console.log('对外提供 doSomething 方法已执行')
  };
  // 也可以这样写
  // module.exports = {
  //   name: 'sea.js',
  //   doSomething: function() {
  //     console.log('对外提供 doSomething 方法已执行')
  //   }
  // };
  // 也可以通过 return 直接提供接口
  // return {
  //   name: 'sea.js',
  //   doSomething: function() {
  //     console.log('对外提供 doSomething 方法已执行')
  //   }
  // };
})
```

## 2 加载模块

```javascript
seajs.use(['./myModule.js'], function(myModule){
  console.log(myModule.name)
  myModule.doSomething()
});
```

## 3 在浏览器中使用

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>CMD模块规范--sea.js测试</title>
</head>
<body>
  <h1>CMD模块规范--sea.js测试</h1>
  <script src="https://cdn.bootcss.com/seajs/3.0.3/sea.js"></script>
  <script src="./main.js"></script>
</body>
</html>
```

