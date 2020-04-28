new String(1)
new Number('1')
new Boolean('')

String(1) // '1'
Number('1') // 1
Boolean('') // false

Object(1) // Number {1}

Symbol()
// new Symbol()  // error
Object(Symbol(1))

Object(Symbol(1)).constructor
Object.getPrototypeOf(Object(Symbol('1'))) === Symbol.prototype // true
Object(Symbol()) instanceof Symbol  // true

(function () {return this}).apply(Symbol(1))  // 装箱
