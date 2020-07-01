function find(source, pattern) {
  let j = 0
  for (let i = 0, l = source.length;i < l;i++) {
    if (source[i] === pattern[j]) {
      j++
    } else {
      j = 0
      if (source[i] === pattern[j]) {
        j++
      }
    }

    if(j === pattern.length) return true
  }

  return false
}
