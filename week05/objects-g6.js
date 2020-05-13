let globalProperties = [
  'eval',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'Array',
  'Date',
  'RegExp',
  'Promise',
  'Proxy',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'Function',
  'Boolean',
  'String',
  'Number',
  'Symbol',
  'Object',
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
  'Atomics',
  'JSON',
  'Math',
  'Reflect',
]

let res = {id: 'objects', children: []}
let set = new Set()

for (let p of globalProperties) {
  dfs(p, this[p], res)
}

function dfs(property, object, node) {
  set.add(object)
  let temp = {id: property, children: []}
  node.children.push(temp)
  for (let p of Object.getOwnPropertyNames(object)) {
    let property = Object.getOwnPropertyDescriptor(object, p)
    if (property.hasOwnProperty('value') && (property.value !== null && typeof property.value === 'object') || typeof property.value === 'function' && property.value instanceof Object) {
      !set.has(property.value) && dfs(p, property.value, temp)
    }

    if (property.hasOwnProperty('get') && typeof property.get === 'function') {
      !set.has(property.get) && dfs(p, property.get, temp)
    }

    if (property.hasOwnProperty('set') && typeof property.set === 'function') {
      !set.has(property.set) && dfs(p, property.set, temp)
    }
  }
}

console.log(res)
