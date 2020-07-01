function* tokenize(source) {
  const reg = /(0|[1-9]\d*)|([ ]+)|([\r\n]+)|([*])|([/])|([+])|([-])|(\()|(\))/g
  const types = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-', '(', ')']

  let res
  let lastIdx = 0

  while (true) {
    lastIdx = reg.lastIndex
    res = reg.exec(source)

    if (!res) break

    if (reg.lastIndex - lastIdx > res[0].length) {
      throw new Error(`Unexpected token "${source.slice(lastIndex, re.lastIndex - result[0].length)}"!`)
    }

    for (let idx = 0;idx < types.length;idx++) {
      if (res[idx + 1]) {
        yield { type: types[idx], value: res[idx + 1] }
        break
      }
    }
  }

  yield {type: 'EOF'}
}

function createAST(tokens) {
  function exp() {
    return add()
  }

  function add() {
    let astNode = multi()

    while (tokens.length > 1 && /^[+-]$/.test(tokens[0].type)) {
      astNode = {
        type: tokens.shift().type,
        children: [astNode, multi()]
      }
    }
    return astNode
  }

  function multi() {
    let astNode = pri()

    while (tokens.length > 1 && /^[*/]$/.test(tokens[0].type)) {
      astNode = {
        type: tokens.shift().type,
        children: [astNode, pri()]
      }
    }

    return astNode
  }

  function pri() {
    let astNode = tokens.shift()

    if (astNode.type === 'Number') {
      return astNode
    } else if (astNode.type === '(') {
      astNode = exp()
      if (tokens[0].type === ')') {
        tokens.shift()
        return astNode
      }
    }

    throw TypeError('Unexpected Token Type')
  }

  return exp()
}

function calc(ast) {
  if (ast.value !== void 0) {
    return ast.value
  }

  const [value1, value2] = ast.children.map(c => calc(c))

  return eval(`${value1} ${ast.type} ${value2}`)
}

const input = '(2 + 3) * 3 / (10 / 5)'
const tokens = [...tokenize(input)].filter(t => !['Whitespace', 'LineTerminator'].includes(t.type))
const ast = createAST(tokens)

console.log(input, ' = ', calc(ast))
