const EOF = Symbol('EOF')

const letterReg = /^[a-zA-Z]$/
const spaceReg = /^[\t\n\f ]$/

let currentToken = {}
let currentAttribute = {}

function emit(token) {
  // console.log(token)
  if(token.type !== 'text') console.log(token)
}

function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit({ type: 'EOF' })
    return
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(letterReg)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    emit({
      type: 'text',
      content: c
    })
    return
  }
}

function endTagOpen() {
  if (c.match(letterReg)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '>') {
    
  } else if (c === EOF) {
    
  } else {

  }
}

function tagName() {
  if (c.match(spaceReg)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c.match(letterReg)) {
    currentToken.tagName += c
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(spaceReg)) {
    return beforeAttributeName
  } else if (c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }

    return attributeName(c)
  }
}

function afterAttributeName(c) {
  if (c.match(spaceReg)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value

    emit(currentToken)

    return data
  } else if (c === EOF) {
    
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value

    currentAttribute = {
      name: '',
      value: ''
    }

    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(spaceReg) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '\u0000') {
    
  } else if (c === '"' || c === '\'' || c === '<') {
    
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(spaceReg) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue
  } else if (c === '"') {
    return doubleQuotedAttributeValue
  } else if (c === '\'') {
    return singleQuotedAttributeValue
  } else if (c === '>') {
    
  } else {
    return unquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {
    
  } else if (c === EOF) {
    
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {
    
  } else if (c === EOF) {
    
  } else {
    currentAttribute.value += c
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(spaceReg)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value

    emit(currentToken)

    return data
  } else if (c === EOF) {
    
  } else {
    currentAttribute.value += c
    return afterQuotedAttributeValue  // diff doubleQuotedAttributeValue
  }
}

function unquotedAttributeValue(c) {
  if (c.match(spaceReg)) {
    currentToken[currentAttribute.name] = currentAttribute.value

    return beforeAttributeName
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value

    return selfClosingStartTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') {
    
  } else if (c === '"' || c === '\'' || c === '<' || c === '=' || c === '`') {
    
  } else if (c === EOF) {
    
  } else {
    currentAttribute.value += c
    return unquotedAttributeValue
  }
}

function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    return data
  } else if (c === EOF) {
    
  } else {

  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data

  for (let c of html) {
    state = state(c)
  }

  state = state(EOF)
}
