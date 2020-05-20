function match(str) {
  let state = start

  for (let c of str) {
    state = state(c)
  }

  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA0
  }

  return start
}

function end(c) {
  return end
}

function foundA0(c) {
  if (c === 'b') return foundB0
  return start(c)
}

function foundB0(c) {
  if (c === 'c') return foundC
  return start(c)
}

function foundC(c) {
  if (c === 'a') return foundA1
  return start(c)
}

function foundA1(c) {
  if (c === 'b') return foundB1
  return start(c)
}

function foundB1(c) {
  if (c === 'x') return end
  if (c === 'c') return foundC
  return start(c)
}

match('abcabcabx')  // true

match('abcaabcaabx')  // false

match('abcaabcabx') // true

