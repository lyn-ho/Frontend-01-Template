let objects = [
  eval,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  Array,
  Date,
  RegExp,
  Promise,
  Proxy,
  Map,
  WeakMap,
  Set,
  WeakSet,
  Function,
  Boolean,
  String,
  Number,
  Symbol,
  Object,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  ArrayBuffer,
  SharedArrayBuffer,
  DataView,
  Float32Array,
  Float64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  Atomics,
  JSON,
  Math,
  Reflect,
]

let current
let set = new Set()

while (objects.length) {
  current = objects.shift()

  if(set.has(current)) continue
  console.log(current)
  set.add(current)

  for (let p of Object.getOwnPropertyNames(current)) {
    let property = Object.getOwnPropertyDescriptor(current, p)
    if (property.hasOwnProperty('value') && (property.value !== null && typeof property.value === 'object') || typeof property.value === 'function' && property.value instanceof Object) {
      objects.push(property.value)
    }

    if (property.hasOwnProperty('get') && typeof property.get === 'function') {
      objects.push(property.get)
    }

    if (property.hasOwnProperty('set') && typeof property.set === 'function') {
      objects.push(property.set)
    }
  }
}
