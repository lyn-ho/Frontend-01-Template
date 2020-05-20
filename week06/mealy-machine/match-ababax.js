function match(str) {
  let state = start

  for (let c of str) {
    state = state(c)
  }

  return state === end
}

function start(c) {
  if (c === 'a') return foundA0
  return start
}

function end() {
  return end
}

function foundA0(c) {
  if (c === 'b') return foundB0
  return start(c)
}

function foundB0(c) {
  if (c === 'a') return foundA1
  return start
}

function foundA1(c) {
  if (c === 'b') return foundB1
  return start(c)
}

function foundB1(c) {
  if (c === 'a') return foundA2
  return start
}

function foundA2(c) {
  if (c === 'x') return end
  if (c === 'b') return foundB1
  return start(c)
}

