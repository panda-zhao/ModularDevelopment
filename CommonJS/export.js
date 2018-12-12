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
