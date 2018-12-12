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