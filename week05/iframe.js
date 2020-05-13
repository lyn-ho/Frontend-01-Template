var iframe = document.createElement('iframe')

document.body.appendChild(iframe)

iframe.contentWindow.Object.prototype

// iframe.contentWindow.document.body.innerHTML = "<script>window.o = {}</script>"

iframe.contentWindow.eval('this.o = {}')

var io = iframe.contentWindow.o

Object.getPrototypeOf(io) === Object.prototype  // false

Object.getPrototypeOf(io) === iframe.contentWindow.Object.prototype   // true
