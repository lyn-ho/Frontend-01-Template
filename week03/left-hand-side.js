function foo() {
  console.log(new.target) // 检测函数或构造方法是否是通过 new 运算符被调用的
}

foo() // undefined

new foo() // f foo()...

var fake = {}

Object.setPrototypeOf(fake, foo.prototype)

fake.constructor = foo

foo.apply(fake)

fake instanceof foo // true


/// --------

var name = 'lyn'

function bar() {
  console.log(arguments)
}

bar`Hello ${name}`


/// -----

function cls1(s) {
  console.log(s)
}

function cls2(s) {
  console.log('2', s)
  return cls1
}

new cls2  // f cls1...

cls2()  // f cls1...

new (new cls2('good'))  // cls1{ }

new new cls2('good')  // log('2 good') cls1{ }


/// ----

var o = { x: 1 }

o.x + 2

delete o.x
delete 1


class Reference {
  constructor(object, property) {
    this.object = object
    this.property = property
  }
}


/// -----

class Foo {
  constructor() {
    this.b = 1
  }
}

new Foo()['b'];
(new Foo())['b']

Foo['b'] = function () { }

new Foo['b']
new (Foo['b'])



