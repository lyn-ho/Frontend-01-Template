const assert = require('assert')
// import {parseHTML} from '../src/parser'
const {parseHTML} = require('../src/parser')

it('parse a single element', () => {
  const doc = parseHTML('<div></div>')

  const div = doc.children[0]

  // console.log(div)
  assert.equal(div.tagName, 'div')
  assert.equal(div.type, 'element')
  assert.equal(div.children.length, 0)
  assert.equal(div.attributes.length, 2)
})

it('parse a single element with text content', () => {
  const doc = parseHTML('<div>hello</div>')

  const text = doc.children[0].children[0]

  // console.log(doc)
  assert.equal(text.type, 'text')
  assert.equal(text.content, 'hello')
})

it(`tag mismatch`, () => {
  try {
    parseHTML('<div></vid>')
  } catch (e) {
    // console.log(e)
    assert.equal(e.message, `Tag start end doesn't match!`)
  }
})

it('text with <', () => {
  const doc = parseHTML('<div>a < b</div>')

  const text = doc.children[0].children[0]

  assert.equal(text.type, 'text')
  assert.equal(text.content, 'a < b')
})

// it('self close', () => {
//   const doc = parseHTML('<img />')

//   const img = doc.children[0]

//   console.log(img)

//   assert.equal(img.children.length, 0)
// })

it('with property', () => {
  const doc = parseHTML(`<div id=a class='cls' data="abc"></div>`)

  const div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }

    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }

    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.equal(count, 3)
})

it('with property 2', () => {
  const doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>")

  const div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }

    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }

    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.equal(count, 3)
})

it('with property 3', () => {
  const doc = parseHTML("<div id=a class='cls' data=\"abc\" />")

  const div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }

    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }

    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.equal(count, 3)
})

it('attribute with no value', () => {
  const doc = parseHTML("<div id=a class='cls' data=\"abc\" />")

  const div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }

    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, 'cls')
    }

    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }

  assert.equal(count, 3)
})

it('script', () => {
  const content = `
  <div>abc</div>
    <span></span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script
  `

  const doc = parseHTML(`<script>${content}</script>`)

  const text = doc.children[0].children[0]
  console.log(text)

  assert.equal(text.type, 'text')
  assert.equal(text.content, content)
})
