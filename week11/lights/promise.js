function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

function go() {
  green()
  sleep(1000).then(() => {
    yellow()

    return sleep(200)
  }).then(() => {
    red()

    return sleep(500)
  }).then(go)
}