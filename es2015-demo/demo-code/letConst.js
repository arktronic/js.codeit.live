// var is not block-scope
var a = 1;
if (something) {
    var a = 2;
}
console.log(a); // -> 2
var a = 3;

// let is block-scope
let b = 1;
if (something) {
    let b = 2;
}
console.log(b); // -> 1
b = 3;
// can't do this:
//let b = 4;

// const is block-scope
const c = 1;
if (something) {
    const c = 2;
}
// can't do this:
//const c = 3;

// const != immutable
const people = [];
people.push('a person');
