function go() {
  green()
  // setTimeout(yellow, 1000)
  // setTimeout(red, 1200)

  // setTimeout(go, 1700)

  setTimeout(function() {
    yellow()
    setTimeout(function() {
      red()
      setTimeout(go, 500)
    }, 200)
  }, 1000)
}