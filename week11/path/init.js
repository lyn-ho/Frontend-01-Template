var map = localStorage.getItem('_path_map') ? JSON.parse(localStorage.getItem('_path_map')) : new Array(10000).fill(0)

const container = document.getElementById('container')

for(let y = 0; y < 100; y++) {
  for(let x = 0; x < 100; x++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')

    if(map[100 * y + x] === 1) {
      cell.style.backgroundColor = 'black'
    }

    cell.addEventListener('mousemove', () => {
      if(mousedown) {
        if(clear) {
          cell.style.backgroundColor = ''
          map[100 * y + x] = 0
        } else {
          cell.style.backgroundColor = 'black'
          map[100 * y + x] = 1
        }
      }
    })

    container.appendChild(cell)
  }
}

let mousedown = false
let clear = false

document.addEventListener('mousedown', (e) => {
  mousedown = true
  clear = (e.which === 3)
})

document.addEventListener('mouseup', () => {
  mousedown = false
})

document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

function save() {
  localStorage.setItem('_path_map', JSON.stringify(map))
}

function clearMap() {
  localStorage.removeItem('_path_map')
  window.location.reload()
}


