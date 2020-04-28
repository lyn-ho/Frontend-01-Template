for (var i = 0;i < 10;i++) {
  var btn = document.createElement('button')
  document.body.append(btn)

  btn.innerHTML = i

  btn.onclick = function () {
    console.log(i)
  }
}

for (var i = 0;i < 10;i++) {
  var btn = document.createElement('button')
  document.body.append(btn)

  btn.innerHTML = i

  void function (i) {
    btn.onclick = function () {
      console.log(i)
    }
  }(i)
}
