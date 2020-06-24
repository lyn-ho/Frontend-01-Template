async function findPath(map, start, end) {
  map = map.slice()

  let queue = [start]

  async function insert(x, y) {

    if (map[100 * y + x] !== 0) {
      return
    }

    if (x < 0 || y < 0 || x >= 100 || y >= 100) {
      return
    }

    map[100 * y + x] = 2

    //
    container.children[100 * y + x].style.backgroundColor = 'lightgreen'
    await sleep(1)

    queue.push([x, y])
  }

  while (queue.length) {
    let [x, y] = queue.shift()  // pop unshift / push shift

    // console.log(x, y)

    if (x === end[0] && y === end[1])
      return true

    await insert(x - 1, y)
    await insert(x + 1, y)
    await insert(x, y - 1)
    await insert(x, y + 1)
  }

  return false
}

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

// findPath(map, [0, 0], [50, 50])
