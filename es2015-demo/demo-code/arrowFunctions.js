// expressions
var keys = hash.map((key, value) => key);

// statements
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
