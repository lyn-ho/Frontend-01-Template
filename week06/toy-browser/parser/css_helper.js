function match(element, selector) {
  if (!selector || !element.attributes) return false

  // console.log(selector, element.attributes)

  if (selector.charAt(0) === '#') {
    const attr = element.attributes.filter(attr => attr.name === 'id')[0]

    if(attr && attr.value === selector.replace('#', '')) return true
  } else if (selector.charAt(0) === '.') {
    // TODO class array
    const attr = element.attributes.filter(attr => attr.name === 'class')[0]

    if(attr && attr.value === selector.replace('.', '')) return true
  } else {
    if(element.tagName === selector) return true
  }

  return false
}

function specificity(selector) {
  const p = [0, 0, 0, 0]

  const selectorParts = selector.split(' ')

  for (let part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }

  return p
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0])
    return sp1[0] - sp2[0]
  if (sp1[1] - sp2[1])
    return sp1[1] - sp2[1]
  if (sp1[2] - sp2[2])
    return sp1[2] - sp2[2]

  return sp1[3] - sp2[3]
}

module.exports = { match, specificity, compare }
