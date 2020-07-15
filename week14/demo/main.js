function createElement(Cls, attributes, ...children) {
  console.log(Cls)
  let o

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer: {},
    })
  }

  // debugger
  for (let name in attributes) {
    // o[name] = attributes[name]
    o.setAttribute(name, attributes[name])
  }

  // console.log(children)
  for (let child of children) {
    o.appendChild(child)
  }

  return o
}

class MyComponent {
  constructor() {
    this.children = []
    this.attributes = new Map()
  }

  render() {
    return (
      <article>
        <h1>{this.attributes.get('title')}</h1>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    )
  }

  setAttribute(name, value) {
    this.attributes.set(name, value)
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    this.slot = <div />
    for (let child of this.children) {
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
  }
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Wrapper {
  constructor(type) {
    console.log(type)
    this.children = []
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      if (typeof child === 'string') child = new Text(child)
      child.mountTo(this.root)
    }
  }
}

// let component = (
//   <div id='a' class='b' style='width: 100px; height: 100px; background: lightgreen;'>
//     <div />
//     <p />
//     <div />
//     <div />
//   </div>
// )

// let component = <div>text</div>
// let component = <div>{1}</div>
// let component = <div>{new Wrapper('span')}</div>

let component = (
  <MyComponent title="I'am a title">
    <p>text text</p>
    <div>{new Wrapper('span')}</div>
  </MyComponent>
)

component.class = 'c'
component.id = 'd'

component.mountTo(document.body)

console.log(component)
// component.setAttribute('id', 'a')
