function happen(element, eventName) {
  return new Promise((resolve, reject) => {
    element.addEventListener(eventName, resolve, {once: true})
  })
}

async function go() {
  while(true) {
    green()

    await happen(document.getElementById('next'), 'click')
    yellow()

    await happen(document.getElementById('next'), 'click')
    red()

    await happen(document.getElementById('next'), 'click')
  }
}
