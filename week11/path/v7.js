class BinaryHeap {
  // 数组模拟二叉堆
  constructor(data, compare) {
    this.data = data
    this.compare = compare
  }

  take() {
    if (!this.data.length)
      return

    let min = this.data[0]
    let idx = 0
    let len = this.data.length

    // fix heap
    while (idx < len) {
      if (idx * 2 + 1 >= len) break

      if (idx * 2 + 2 >= len) {
        this.data[idx] = this.data[idx * 2 + 1]
        idx = idx * 2 + 1
        break
      }

      if (this.compare(this.data[idx * 2 + 1], this.data[idx * 2 + 2]) < 0) {
        this.data[idx] = this.data[idx * 2 + 1]
        idx = idx * 2 + 1
      } else {
        this.data[idx] = this.data[idx * 2 + 2]
        idx = idx * 2 + 2
      }
    }

    if(idx < len - 1)
      this.insertAt(idx, this.data.pop())
    else
      this.data.pop()

    return min
  }

  insertAt(idx, val) {
    this.data[idx] = val
    while (idx > 0 && this.compare(val, this.data[Math.floor((idx - 1) / 2)]) < 0) {
      this.data[idx] = this.data[Math.floor((idx - 1) / 2)]
      this.data[Math.floor((idx - 1) / 2)] = val
      idx = Math.floor((idx - 1) / 2)
    }
  }

  insert(val) {
    this.insertAt(this.data.length, val)
  }

  get length() {
    return this.data.length
  }
}

// let heap = new BinaryHeap([], (a, b) => a - b)

// heap.insert(3)
// heap.insert(2)
// heap.insert(1)
// heap.insert(6)
// heap.insert(7)
// heap.insert(9)
// heap.insert(0)

async function findPath(map, start, end) {
  map = map.slice()

  function distance([x, y]) {
    return (x - end[0]) ** 2 + (y - end[1]) ** 2
  }

  let collection = new BinaryHeap([start], (a, b) => distance(a) - distance(b))

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
