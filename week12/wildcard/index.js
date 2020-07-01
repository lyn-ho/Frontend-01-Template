function find(source, pattern) {
  let startCount = 0

  for (let i = 0, l = pattern.length;i < l;i++) {
    if(pattern[i] === '*') startCount++
  }

  if (startCount === 0) {
    for (let i = 0, l = pattern.length;i < l;i++) {
      if (pattern[i] !== source[i]) return false
    }
  }

  let i = 0

  for (i = 0;pattern[i] !== '*';i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false
    }
  }

  let lastIndex = i

  for (let p = 0;p < startCount - 1;p++) {
    i++

    let subPattern = ''
    while (pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }

    let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'))
    reg.lastIndex = lastIndex

    reg.exec(source)

    lastIndex = reg.lastIndex
  }

  for (let j = source.length - 1;j >= lastIndex && pattern[pattern.length - j] !== '*';j--) {
    if (pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== '?')
      return false
  }
  return true
}
