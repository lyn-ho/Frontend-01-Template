let handlers = new Map

let usedReactivities = []
let reactivities = new Map

function reactive(obj) {
  if (reactivities.has(obj)) {
    return reactivities.get(obj)
  }

  let proxy = new Proxy(obj, {
    get(obj, prop) {
      usedReactivities.push([obj, prop])

      if (typeof obj[prop] === 'object')
        return reactive(obj[prop])

      return obj[prop]
    },

    set(obj, prop, val) {
      obj[prop] = val

      if (handlers.has(obj))
        if (handlers.get(obj).has(prop))
          for (let handler of handlers.get(obj).get(prop))
            handler()

      return obj[prop]
    },
  })

  reactivities.set(obj, proxy)
  reactivities.set(proxy, proxy)

  return proxy
}

function effect(handler) {
  if (!handler) return

  usedReactivities = []
  handler()
  // console.log(usedReactivities)

  for (let useReactivity of usedReactivities) {
    let [obj, prop] = useReactivity
    // console.log([obj, prop])

    if (!handlers.has(obj)) {
      handlers.set(obj, new Map)
    }

    if (!handlers.get(obj).has(prop)) {
      handlers.get(obj).set(prop, [])
    }

    handlers.get(obj).get(prop).push(handler)
  }
}

let p1 = reactive({ a: 1 })
let p2 = reactive({ a: 2 })

// -----
// let v1, v2, v12

// effect(() => v12 = p1.a + p2.a)
// effect(() => v1 = p1.a)
// effect(() => v2 = p2.a)

// -----
// let v
// let b = false
// effect(() => v = b ? 2 : p1.a)

// b = true
// p1.a = 10

// -----

let obj = {
  a: { x: 3 },
  b: 2
}
let v
let p = reactive(obj)

effect(() => v = p.a.x)

console.log('origin ', v)
p.a.x = 10
console.log('p.a.x = 10 ', v)
p.a = { x: 4 }
console.log('p.a = { x: 4 }', v)

