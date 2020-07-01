function find(source, pattern) {
  let table = new Array(pattern.length).fill(0)

  let k = 0
  for (let j = 1, l = pattern.length;j < l;j++) {
    if (pattern[j] === pattern[k]) {
      k++
    } else {
      k = 0
    }
    table[j] = k
  }

  let j = 0
  for (let i = 0, l = source.length;i < l;i++) {
    if (source[i] === pattern[j]) {
      j++
    } else {
      j = table[j - 1]
      if(source[i] === pattern[j]) j++
    }

    if(j === pattern.length) return true
  }

  return false
}
