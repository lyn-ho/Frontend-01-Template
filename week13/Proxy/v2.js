let handlers = new Map

let usedReactivities = []

let obj = {
  a: 1,
  b: 2,
}

function reactive(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      usedReactivities.push([obj, prop])
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
}

function effect(handler) {
  if (!handler) return

  usedReactivities = []
  handler()
  console.log(usedReactivities)

  for (let useReactivity of usedReactivities) {
    let [obj, prop] = useReactivity
    console.log([obj, prop])

    if (!handlers.has(obj)) {
      handlers.set(obj, new Map)
    }

    if (!handlers.get(obj).has(prop)) {
      handlers.get(obj).set(prop, [])
    }

    handlers.get(obj).get(prop).push(handler)
  }
}

let dummy

let proxy = reactive(obj)

effect(() => dummy = proxy.a)
console.log(dummy)

proxy.a = 2
console.log(dummy)
