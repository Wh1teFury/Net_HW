const logWithDate = console.log;
Object.defineProperty( console, "log", {
  get : function () { 
    return Function.prototype.bind.call(logWithDate, console, `${new Date()} |`); 
  }
});
console.log("test")







