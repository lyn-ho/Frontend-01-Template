let draggable = document.getElementById('draggable')

let baseX = 0
let baseY = 0

draggable.addEventListener('mousedown', (evt) => {
  let startX = evt.clientX
  let startY = evt.clientY

  let move = (evt) => {
    // evt.clientX evt.clientY

    let x = evt.clientX
    let y = evt.clientY

    draggable.style.transform = `translate(${baseX + x - startX}px, ${baseY + y - startY}px)`
  }

  let up = (evt) => {
    baseX = baseX + evt.clientX - startX
    baseY = baseY + evt.clientY - startY

    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})

