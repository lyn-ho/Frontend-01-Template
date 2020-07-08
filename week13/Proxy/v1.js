let handlers = []

let obj = {
  a: 1,
  b: 2,
}

// let proxy = new Proxy(obj, {
//   get(obj, prop) {
//     console.log(obj, prop)
//     return obj[prop]
//   },

//   defineProperty(obj, prop, desc) {
//     console.log(arguments)
//     return Object.defineProperty(obj, prop, desc)
//   },
// })

function reactive(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      console.log(obj, prop)
      return obj[prop]
    },

    set(obj, prop, val) {
      obj[prop] = val

      for (let handler of handlers) handler()
      return obj[prop]
    },
  })
}

function effect(handler) {
  handler && handler()

  handler && handlers.push(handler)
}

let dummy

let proxy = reactive(obj)

effect(() => dummy = proxy.a)
console.log(dummy)

proxy.a = 2
console.log(dummy)
