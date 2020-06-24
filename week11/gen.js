function* g() {
  yield 1
  yield 2
  yield 3
}

for (v of g()) {
  console.log(v)
}

// -----------

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

async function* g1() {
  var i = 0

  while (true) {
    await sleep(1000)
    yield i++
  }
}

for await (let v of g1()) {
  console.log(v)
}
