let draggable = document.getElementById('draggable')

let baseX = 0
let baseY = 0

draggable.addEventListener('mousedown', (evt) => {
  let startX = evt.clientX
  let startY = evt.clientY

  let move = (evt) => {
    // evt.clientX evt.clientY

    let range = nearest(evt.clientX, evt.clientY)
    // console.log(range)

    range.insertNode(draggable)

    // let x = evt.clientX
    // let y = evt.clientY

    // draggable.style.transform = `translate(${baseX + x - startX}px, ${baseY + y - startY}px)`
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

let ranges = []

let container = document.getElementById('container')

for (let i = 0, l = container.childNodes[0].textContent.length;i < l;i++) {
  let range = document.createRange()
  range.setStart(container.childNodes[0], i)
  range.setEnd(container.childNodes[0], i)

  // console.log(range.getBoundingClientRect())
  ranges.push(range)
}

function nearest(x0, y0) {
  let nearestRange = null
  let distance = Infinity

  for (let range of ranges) {
    let { x, y } = range.getBoundingClientRect()
    let d = (x0 - x) ** 2 + (y0 - y) ** 2

    if (d < distance) {
      nearestRange = range
      distance = d
    }
  }

  return nearestRange
}

document.addEventListener('selectstart', evt => evt.preventDefault())

