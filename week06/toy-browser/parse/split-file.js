const EOF = Symbol('EOF') // EOF: End Of File

function data(c) {}

module.exports.parseHTML = function (html) {
  console.log('parseHTML -------  \n')
  console.log(html)

  let state = data

  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
}
