export function createElement(Cls, attributes, ...children) {
  let o

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({})
  }

  // debugger
  for (let name in attributes) {
    // o[name] = attributes[name]

    o.setAttribute(name, attributes[name])
  }

  // console.log(children)
  let visit = (children) => {
    for (let child of children) {
      if (child instanceof Array) {
        visit(child)
      } else {
        o.appendChild(child)
      }
    }
  }

  visit(children)

  return o
}

export class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }

  get style() {
    return this.root.style
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    this.children.push(child)
  }

  addEventListener() {
    this.root.addEventListener(...arguments)
  }

  mountTo(parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      if (typeof child === 'string') child = new Text(child)
      child.mountTo(this.root)
    }
  }
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Carousel {
  constructor(config) {
    this.children = []

    this.attributes = new Map()
    this.properties = new Map()
  }

  render() {
    let children = this.data.map((url) => {
      let ele = <img src={url} />
      ele.addEventListener('dragstart', (evt) => evt.preventDefault())
      return ele
    })

    let root = <div class='carousel'>{children}</div>

    let position = 0

    root.addEventListener('mousedown', (evt) => {
      let startX = evt.clientX

      let nextPosition = (position + 1) % this.data.length
      let lastPosition = (position - 1 + this.data.length) % this.data.length

      let last = children[lastPosition]
      let current = children[position]
      let next = children[nextPosition]

      last.style.transition = 'ease 0s'
      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'

      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`
      current.style.transform = `translateX(${-500 * position}px)`
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

      let move = (evt) => {
        last.style.transform = `translateX(${evt.clientX - startX - 500 - 500 * lastPosition}px)`
        current.style.transform = `translateX(${evt.clientX - startX - 500 * position}px)`
        next.style.transform = `translateX(${evt.clientX - startX + 500 - 500 * nextPosition}px)`
      }

      let up = (evt) => {
        let offset = 0

        if (evt.clientX - startX > 250) {
          offset = 1
        } else if (evt.clientX - startX < -250) {
          offset = -1
        }

        last.style.transition = ''
        current.style.transition = ''
        next.style.transition = ''

        last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
        current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
        next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

        position = (position - offset + this.data.length) % this.data.length

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })

    // let nextPic = () => {
    //   let nextPosition = (position + 1) % this.data.length

    //   let current = children[position]
    //   let next = children[nextPosition]

    //   current.style.transform = `translateX(${-100 * position}%)`
    //   next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

    //   current.style.transition = 'ease 0s'
    //   next.style.transition = 'ease 0s'

    //   requestAnimationFrame(() => {
    //     requestAnimationFrame(() => {
    //       current.style.transition = 'ease 0.5s'
    //       next.style.transition = 'ease 0.5s'

    //       current.style.transform = `translateX(${-100 - 100 * position}%)`
    //       next.style.transform = `translateX(${-100 * nextPosition}%)`
    //       position = nextPosition
    //     })
    //   })

    //   setTimeout(nextPic, 1000)
    // }

    // nextPic()

    return root
  }

  setAttribute(name, value) {
    this.attributes.set(name, value)
    this[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}
