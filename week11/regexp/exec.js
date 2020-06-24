`function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}`

let lastIdx = 0
let token

do {
  token = inputElement.exec(source)
  console.log(token)
} while(inputElement.lastIdx - lastIdx === token.length)
