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

let queue = []

for (let p of globalProperties) {
  queue.push({
    path: [p],
    object: this[p]
  })
}

let current
let set = new Set()

while (queue.length) {
  current = queue.shift()

  if(set.has(current.object)) continue
  console.log(current.path.join('.'))
  set.add(current.object)

  for (let p of Object.getOwnPropertyNames(current.object)) {
    let property = Object.getOwnPropertyDescriptor(current.object, p)
    if (property.hasOwnProperty('value') && (property.value !== null && typeof property.value === 'object') || typeof property.value === 'function' && property.value instanceof Object) {
      queue.push({
        path: current.path.concat([p]),
        object: property.value
      })
    }

    if (property.hasOwnProperty('get') && typeof property.get === 'function') {
      queue.push({
        path: current.path.concat([p]),
        object: property.get
      })
    }

    if (property.hasOwnProperty('set') && typeof property.set === 'function') {
      queue.push({
        path: current.path.concat([p]),
        object: property.set
      })
    }
  }
}


