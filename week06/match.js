// find 'a'

function matchA(str) {
  for (let c of str) {
    if(c == 'a') return true
  }

  return false
}


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


// find 'abcdef'

function matchABCDEF(str) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false

  for (let c of str) {
    // error 'abcdeeeef' true
    console.log(c, foundA, foundB, foundC, foundD, foundE)
    if (c === 'a') {
      foundA = true
    } else if (foundA && c === 'b') {
      if (foundB) {
        reset()
      } else {
        foundB = true
      }
    } else if (foundB && c === 'c') {
      if (foundC) {
        reset()
      } else {
        foundC = true
      }
    } else if (foundC && c === 'd') {
      if (foundD) {
        reset()
      } else {
        foundD = true
      }
    } else if (foundD && c === 'e') {
      if (foundE) {
        reset()
      } else {
        foundE = true
      }
    } else if (foundE && c === 'f') {
      return true
    } else {
      reset()
    }
  }

  function reset() {
    foundA = false
    foundB = false
    foundC = false
    foundD = false
    foundE = false
  }

  return false
}


/// -------

function match(str) {
  let state = start

  for (let c of str) {
    state = state(c)
  }

  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  }
  return start
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') return foundB
  return start(c)
}

function foundB(c) {
  if (c === 'c') return foundC
  return start(c)
}

function foundC(c) {
  if (c === 'd') return foundD
  return start(c)
}

function foundD(c) {
  if (c === 'e') return foundE
  return start(c)
}

function foundE(c) {
  if (c === 'f') return end
  return start(c)
}


/// match 'abcabx'

/// match 'abababx'

/// match pattern  O(n + m)

function match(str, pattern) {}
