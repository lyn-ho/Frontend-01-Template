// find 'ab'

function matchAB(str) {
  let foundA = false

  for (let c of str) {
    if (c === 'a') {
      foundA = true
    } else if (foundA && c === 'b') {
      return true
    } else {
      foundA = false
    }
  }

  return false
}
