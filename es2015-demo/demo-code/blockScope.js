// Old way to Block Scope
(function () {
  var hw = 'Hello World!';
}());
console.log(hw); // Referance Error

// "var": define variables in the scope of the entire function.
// "let": define variables in the scope of a block (new in ES6)
{
  var a = 'Hello';
  let b = 'world';
  console.log(a + ' ' + b); // "Hello world"
}
console.log(a + ' ' + b); // will throw: b is defined in the scope of the block
