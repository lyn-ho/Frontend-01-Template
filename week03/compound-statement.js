// BlockStatement

{
  a: 1;
  const b = 2;
}

{
  const a = 1;
  throw 1;
  let b = 2;
  b = foo();
}


// Iteration

for (let i = 0;i < 10;i++) {
  console.log(i); // 0 ~ 9
}

//---

var i = 0;
for (;i < 10;i++) {
  let i = 0;
  console.log(i); // 0
}

// for 会产生一个作用域，在 block 之外

for (let i = 0;i < 10;i++) {
  let i = 0;
  console.log(i); // 0
}

// ---

// var 变量提升，函数作用域
for (i = 0;i < 10;i++) {
  console.log(i);
  var i;
}

// in

for (let p in { a: 1, b: 2 }) {
  console.log(p);
}

// of

for (let v of [1, 2, 3]) {
  console.log(v);
}

function* g() {
  yield 0;

  yield 1;

  yield 4;
}

for (let v of g()) {
  console.log(v);
}

// for of => Iterator => Generator/Array


// LabelStatement

function foo() {
  public:
  this.a = 1;
  this.b = 2;
  private:
  var x = 3;
  var y = 4;
}

function foo() {
  public:this.a = 1;
  this.b = 2;

  private:var x = 3;
  var y = 4;
}


// TryStatement

try {
  // throw
  // 运行时错误
} catch (error) {
  //
} finally {

}

// ---

try {
  throw 2;
} catch (e) {
  let e;  // 'e' has already been declared
  console.log(e);
}

// ---

var e = 1;

try {
  throw 2;
} catch (e) {
  console.log(e); // 2
}

console.log(e); // 1




