// expressions (concise body)
var keys = hash.map((key, value) => key);

// statements (block body)
keys.each(k => {
  if(k !== undefined) {
  	process(k);    
  }
});

// lexical this
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++;
  }, 1000);
}

// no arguments of its own
function callMe() {
  return () => arguments[0];
}
