class Carousel {
  constructor() {
    this.root = null
    this.data = null
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    for (let d of this.data) {
      console.log(d)
      let ele = document.createElement('img')
      ele.src = d

      ele.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })

      this.root.appendChild(ele)
    }

    let position = 0

    this.root.addEventListener('mousedown', (evt) => {
      let startX = evt.clientX

      let nextPosition = (position + 1) % this.data.length
      let lastPosition = (position - 1 + this.data.length) % this.data.length

      let last = this.root.childNodes[lastPosition]
      let current = this.root.childNodes[position]
      let next = this.root.childNodes[nextPosition]

      last.style.transition = 'ease 0s'
      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'

      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`
      current.style.transform = `translateX(${-500 * position}px)`
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

      let move = (evt) => {
        last.style.transform = `translateX(${evt.clientX - startX - 500 - 500 * lastPosition}px)`
        current.style.transform = `translateX(${evt.clientX - startX - 500 * position}px)`
        next.style.transform = `translateX(${evt.clientX - startX + 500 - 500 * nextPosition}px)`
      }

      let up = (evt) => {
        let offset = 0

        if (evt.clientX - startX > 250) {
          offset = 1
        } else if (evt.clientX - startX < -250) {
          offset = -1
        }

        last.style.transition = ''
        current.style.transition = ''
        next.style.transition = ''

        last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
        current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
        next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

        position = (position - offset + this.data.length) % this.data.length

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
  }
}

// create
let carousel = new Carousel()

// update
carousel.data = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
]
carousel.render()

// mount
document.getElementById('container').appendChild(carousel.root)
