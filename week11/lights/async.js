function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

async function go() {
  while(true) {
    green()

    await sleep(1000)
    yellow()

    await sleep(200)
    red()

    await sleep(500)
  }
}
