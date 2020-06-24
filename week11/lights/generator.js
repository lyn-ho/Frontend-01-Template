function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}


function* go() {
  while(true) {
    green()

    yield sleep(1000)
    yellow()

    yield sleep(200)
    red()

    yield sleep(500)
  }
}

// function co(iterator) {
//   let {value, down} = iterator.next()

//   if(down) {
//     return
//   }

//   value.then && value.then(() => {
//     co(iterator)
//   })
// }
// co(go())

function run(iterator) {
  let {value, done} = iterator.next()

  if(done) return

  value.then && value.then(() => {
    run(iterator)
  })
}

function co(generator) {
  return function() {
    return run(generator())
  }
}

let start = co(go)
