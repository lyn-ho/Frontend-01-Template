function foo() { }

class Foo {

}

function* g() {
}

// ---

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

void async function () {
  let i = 0;
  while (true) {
    console.log(i++)
    await sleep(1000);
  }
}()

// ---

async function* gen() {
  let i = 0;
  while (true) {
    yield i++;
    await sleep(1000);
  }
}

void async function () {
  let g = gen()
  // console.log(await g.next())
  // console.log(await g.next())
  // console.log(await g.next())
  // console.log(await g.next())
  // console.log(await g.next())

  for await (let e of g) {
    console.log(e)
  }
}()

// ---

var x = 0;

function foo() {
  var o = { x: 1 };
  x = 2;
  with (o) {
    var x = 3;  // var 声明提升
  }
  console.log(x)  // 2
  console.log(o.x)  // 3
}

foo();
console.log(x); // 0

// ---

var x = 0;

function foo() {
  var o = { x: 1 };
  x = 2;
  with (o) {
    x = 3;
  }
  console.log(x)  // 2
  console.log(o.x)  // 3
}

foo();
console.log(x); // 2

// ---

// var 声明最好放在函数最前面，至少在使用之前，不要在 block 中写 var
// let const 代替 var
var x = 0;
function foo() {
  x = 2;

  if (false) {
    var x = 1;
  }

  console.log(x)

  return;
  var x = 3;
}

// ---

function foo() {
  bar();
  console.log(i);

  return;
  var i = 1;

  function bar() {
    console.log(2)
  }
}

// ---

// let const class 先声明
