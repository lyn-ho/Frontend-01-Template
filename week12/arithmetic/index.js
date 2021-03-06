const regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g

const dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/']

function*  tokenize(source) {
  let result = null
  let lastIndex = 0

  while (true) {
    // 匹配
    lastIndex = regexp.lastIndex
    result = regexp.exec(source)

    // 判断
    if (!result) break
    if (regexp.lastIndex - lastIndex > result[0].length) throw new Error('Unexpected token "' + source.slice(lastIndex, regexp.lastIndex - result[0].length) + '"! ')

    // 生成 token
    let token = {
      type: null,
      value: null,
    }

    for (let i = 0;i < dictionary.length;i++) {
      if (result[i + 1]) {
        // console.log(dictionary[i])
        token.type = dictionary[i]
      }
    }

    // console.log(result[0])
    token.value = result[0]

    yield token
  }

  yield {type: 'EOF'}
}

function Expression(source) {
  if (source[0].type === 'AdditiveExpression' && source[1].type === 'EOF') {
    let node = {
      type: 'Expression',
      children: [source.shift(), source.shift()]
    }
    source.unshift(node)
    return node
  }
  AdditiveExpression(source)
  return Expression(source)
}

function AdditiveExpression(source) {
  if (source[0].type === 'Number') {
    MultiplicativeExpression(source)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression') {
    let node = {
      type: 'AdditiveExpression',
      children: [source.shift()]
    }
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression' && source.length > 1 && source[1].type === '+') {
    let node = {
      type: 'AdditiveExpression',
      children: [source.shift(), source.shift()]
    }
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression' && source.length > 1 && source[1].type === '-') {
    let node = {
      type: 'AdditiveExpression',
      children: [source.shift(), source.shift()]
    }
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if(source[0].type === 'AdditiveExpression') return source[0]
}

function MultiplicativeExpression(source) {
  if (source[0].type === 'Number') {
    let node = {
      type: 'MultiplicativeExpression',
      children: source.shift()
    }
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (source[0].type === "MultiplicativeExpression" && source.length > 1 && source[1].type === '*' ) {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source.shift(), source.shift(), source.shift()]
    }
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (source[0].type === "MultiplicativeExpression" && source.length > 1 && source[1].type === '/' ) {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source.shift(), source.shift(), source.shift()]
    }
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if(source[0].type === 'MultiplicativeExpression') return source[0]
}

let source = []

for (let token of tokenize('1024 + 10 * 25')) {
  // console.log(token)
  if(token.type !== 'Whitespace' && token.type !== 'LineTerminator')
    source.push(token)
}

console.log(Expression(source))

