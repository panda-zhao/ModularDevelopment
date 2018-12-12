define( function() {
  var name = 'hello world!';
    function printName(){
       console.log(name);
    }
    return {printName: printName};
});