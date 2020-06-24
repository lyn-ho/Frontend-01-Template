class Sorted {
  constructor(data, compare) {
    this.data = data
    this.compare = compare
  }

  take() {
    if (!this.data.length)
      return

    let min = this.data[0]
    let minIdx = 0

    for (let i = 1, l = this.data.length;i < l;i++) {
      if (this.compare(this.data[i], min) > 0) {
        min = this.data[i]
        minIdx = i
      }
    }

    this.data[minIdx] = this.data[this.data.length - 1]
    this.data.pop()
    return min
  }

  insert(val) {
    this.data.push(val)
  }

  get length() {
    return this.data.length
  }
}

async function findPath(map, start, end) {
  map = map.slice()

  function distance([x, y]) {
    return (x - end[0]) ** 2 + (y - end[1]) ** 2
  }

  let collection = new Sorted([start], (a, b) => distance(a) - distance(b))

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

    collection.insert([x, y])
  }

  while (collection.length) {
    let [x, y] = collection.take()

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
