(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var test = function(x){
  console.log(x)
}
var get = function(){
  console.log('我是get方法')
}
var post = function(){
  console.log('我是post方法')
}
// 输出接口
module.exports = {test,get,post}
// 也可以这样输出
// export default {test,get,post}

},{}],2:[function(require,module,exports){
var utils = require('./export.js')
console.log(utils)
utils.test('hello world!')
utils.get()
utils.post()
},{"./export.js":1}]},{},[2]);
