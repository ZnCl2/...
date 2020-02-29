
let valueA = prompt('What is the "a" value', ""); // finds out "a" value from user
let valueB= prompt('What is the "b" value', ""); // finds out "b" value from user
let valueC = prompt('What is the "c" value', ""); // finds out "c" value from user
let a = +valueA // converts the imput from a string to a value
let b = +valueB // ^
let c = +valueC // ^
let x1=-b/2/a+Math.pow(Math.pow(b,2)-4*a*c,0.5)/2/a;
let x2=-b/2/a-Math.pow(Math.pow(b,2)-4*a*c,0.5)/2/a;
alert(`the first root is ${x1} and the second root is ${x2}`); // final output of the formula
