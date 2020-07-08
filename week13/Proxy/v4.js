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

let p = reactive({ r: 100, g: 100, b: 100 })

effect(() => {
  document.getElementById('r').value = p.r
})

effect(() => {
  document.getElementById('g').value = p.g
})

effect(() => {
  document.getElementById('b').value = p.b
})

document.getElementById('r').addEventListener('input', (evt) => {
  p.r = evt.target.value
})
document.getElementById('g').addEventListener('input', (evt) => {
  p.g = evt.target.value
})
document.getElementById('b').addEventListener('input', (evt) => {
  p.b = evt.target.value
})

effect(() => {
  document.getElementById('color').style.backgroundColor = `rgb(${p.r}, ${p.g}, ${p.b})`
})

let range = document.createRange()
const textEl = document.getElementById('text')
range.setStart(textEl.childNodes[0], 6)
range.setEnd(textEl.childNodes[0], 14)

let data = reactive({ text: 'world' })

effect(() => {
  range.extractContents()
  range.insertNode(document.createTextNode(data.text))
})

