async function findPath(map, start, end) {
  map = map.slice()

  let stack = [start]

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
    await sleep(5)

    stack.push([x, y])
  }

  while (stack.length) {
    let [x, y] = stack.pop()  // pop unshift / push shift

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
