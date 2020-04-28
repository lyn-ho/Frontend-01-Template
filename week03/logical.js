function foo() {
  console.log('foo')
  return false
}

function bar() {
  console.log('bar')
}

foo() && bar()  // foo

foo() || bar()  // foo bar
