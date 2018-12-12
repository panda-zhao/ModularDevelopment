seajs.use(['./myModule.js'], function(myModule){
  console.log(myModule.name)
  myModule.doSomething()
});