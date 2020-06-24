async function findPath(map, start, end) {
  map = map.slice()

  let queue = [start]

  container.children[100 * start[1] + start[0]].style.backgroundColor = 'lightgreen'
  container.children[100 * end[1] + end[0]].style.backgroundColor = 'red'

  async function insert([x, y], pre) {

    if (map[100 * y + x] !== 0) {
      return
    }

    if (x < 0 || y < 0 || x >= 100 || y >= 100) {
      return
    }

    map[100 * y + x] = pre

    //
    container.children[100 * y + x].style.backgroundColor = 'lightgreen'
    await sleep(1)

    queue.push([x, y])
  }

  while (queue.length) {
    let [x, y] = queue.shift()  // pop unshift / push shift

    // console.log(x, y)

    if (x === end[0] && y === end[1]) {
      let path = [end]
      let tmp = map[100 * y + x]
      x = tmp[0]
      y = tmp[1]
      while (x !== start[0] || y !== start[1]) {
        path.push([x, y])
        container.children[100 * y + x].style.backgroundColor = 'pink'
        let tmp = map[100 * y + x]
        x = tmp[0]
        y = tmp[1]
      }

      return path
    }

    await insert([x - 1, y], [x, y])
    await insert([x + 1, y], [x, y])
    await insert([x, y - 1], [x, y])
    await insert([x, y + 1], [x, y])

    await insert([x - 1, y - 1], [x, y])
    await insert([x + 1, y - 1], [x, y])
    await insert([x - 1, y + 1], [x, y])
    await insert([x + 1, y + 1], [x, y])
  }

  return null
}

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

// findPath(map, [0, 0], [50, 50])
