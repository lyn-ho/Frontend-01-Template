function createElement(Cls, attributes, ...children) {
  let o = new Cls({
    timer: {},
  })

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

class Parent {
  constructor(config) {
    console.log('config', config)

    this.children = []
    this.root = document.createElement('div')
  }

  set class(v) {
    // property
    console.log('Parent::class', v)
  }

  set id(v) {
    console.log('Parent::id', v)
  }

  setAttribute(name, value) {
    // attribute
    // console.log(name, value)
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    // children
    // console.log('Parent::appendChild', child)
    this.children.push(child)
    // child.mountTo(this.root)
  }

  mountTo(parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }
}

class Child {
  constructor() {
    this.children = []
    this.root = document.createElement('div')
  }

  appendChild(child) {
    // children
    // console.log('Parent::appendChild', child)
    this.children.push(child)
    // child.mountTo(this.root)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Div {
  constructor() {
    this.children = []
    this.root = document.createElement('div')
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
      child.mountTo(this.root)
    }
  }
}

class Text {
  
}

class Wrapper {
  constructor() {
    this.children = []
    this.root = document.createElement('div')
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
      child.mountTo(this.root)
    }
  }
}

// let component
// let component = <div id='a' class="b" />  // 小写处理成字符串
// let component = <Div id='a' class='b' /> // 大写处理成函数
let component = (
  <Div id='a' class='b' style='width: 100px; height: 100px; background: lightgreen;'>
    <Div />
    <Div />
    <Div />
  </Div>
)

/*
var component = createElement(Parent, {
  id: "a",
  "class": "b"
},
createElement(Child, null),
createElement(Child, null),
createElement(Child, null));
*/

component.class = 'c'
component.id = 'd'

component.mountTo(document.body)

console.log(component)
// component.setAttribute('id', 'a')
