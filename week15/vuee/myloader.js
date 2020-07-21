const parser = require('./parser')

module.exports = function(source, map) {
  // console.log(source)
  const tree = parser.parseHTML(source)
  // console.log(tree.children[2].children[0].content)
  // console.log('my loader is running!!!!!!!!!!!!!!!!\n', this.resourcePath)

  let template = null
  let script = null

  for (let node of tree.children) {
    // if (node.tagName === 'template') template = node
    if(node.tagName === 'template') template = node.children.filter(e => e.type !== 'text')[0]

    if (node.tagName === 'script') script = node.children[0].content
  }

  // console.log(template)
  // console.log(script)

  let visit = (node) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content)
    }

    let attrs = {}

    for (let attr of node.attributes) {
      attrs[attr.name] = attr.value
    }

    let children = node.children.map((node) => visit(node))

    return `createElement('${node.tagName}', ${JSON.stringify(attrs)}, ${children})`
  }

  let res = `
import { createElement, Wrapper, Text } from './lib/createElement'

export class Carousel {
  setAttribute(name, value) {
    this[name] = value
  }

  render() {
    return ${visit(template)}
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}
  `

  console.log(res)

  return res
}
