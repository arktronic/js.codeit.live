// Expanded in places with `...` for arguments or multiple elements.
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];


var cities = ['San Francisco', 'Los Angeles'];
var places = ['Miami', ...cities, 'Chicago'];
console.log(places); // ['Miami', 'San Francisco', 'Los Angeles', 'Chicago']
