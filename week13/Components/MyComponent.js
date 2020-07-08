class MyComponent {
  constructor(config) {
    // config 全局的 option
    // 一般不做修改
    this.state = {
      i: 1
    }
  }

  get prop1() { }

  set prop1() { }

  getAttribute(attr) { }

  setAttribute(attr, value) { }

  get children() { }
  set children() { }
}


myComponent = <MyComponent attr1="23" />

myComponent.attr1 = 44  // react 风格 可以修改

// ===
// let myComponent = new MyComponent()
// myComponent.class = 44

// -----
let myComponent = new MyComponent({ class: 444 }) // config
myComponent.setAttribute('class', '33')


// -----

myComponent = <MyComponent class="cls" />

myComponent.className = 'cls2'  // html 风格 可以修改

// ------ children react

let myComponent =
  <MyComponent>
    <div></div>
  </MyComponent>


// ----- children vue

let myComponent =
  <template>
    <MyComponent $ref="abc">
      <div></div>
    </MyComponent>
  </template>
  <script>
    export default {
      mounted() {
        this.$refs['abc'].class = 1
      }
    }
  </script>
