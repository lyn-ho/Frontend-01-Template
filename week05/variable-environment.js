{
  let y = 2;
  eval('var x = 1;');
}

with ({ a: 1 }) {
  eval('var x;');
}

console.log(x);
