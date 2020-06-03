function match(selector, el) {
  const reg = /([#\.\[])([\w\W]+)/i
  const m = selector.match(reg)

  let type, key, attrName, result
  if (m) {
    if (m[1] === '.') {
      type = 'class'
      key = m[2]
    } else if (m[1] === '#') {
      type = 'id'
      key = m[2]
    } else if (m[1] === '[') {
      type = 'attr'
      let ma = m[2].match(/(\w+)=(\w+)/i)
      attrName = ma[1]
      key = ma[2]
    }
  } else {
    type = 'tag'
    key = selector
  }

  function findChild(node) {
    for (let i = 0;i < node.childNodes.length;i++) {
      let c = node.childNodes[i]

      if (type === 'class' && c.className === key) {
        result = c
        return
      } else if (type === 'id' && c.id === key) {
        result = c
        return
      } else if (type === 'attr' && c.getAttribute && c.getAttribute(attrName) === key) {
        result = c
        return
      } else if (type === 'tag' && c.tagName && c.tagName.tLowerCase() === key) {
        result = c
        return
      }

      c.childNodes && findChild(c)
    }
  }

  el && el.childNodes && findChild(el)

  return result
}
