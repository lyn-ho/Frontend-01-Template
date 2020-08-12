const { compileTemplate } = require('@vue/compiler-sfc')

let output = compileTemplate({filename: 'example.vue', source: '<div>Hello world!</div>'})

console.log(output)
