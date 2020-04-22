# Week02 Homework


## 写一个正则表达式 匹配所有 Number 直接量

* BinaryIntegerLiteral (二进制)

`/^0[bB][01]+$/`


* OctalIntegerLiteral (八进制)

`/^0[oO][0-7]+$/`


* HexIntegerLiteral (十六进制)

`/^0[xX][0-9A-Fa-f]+$/`


* DecimalLiteral (十进制)

`/^(\.[0-9]+|(0|[1-9][0-9]*)(\.[0-9]*)?)([eE][-\+]?[0-9]*)?$/`

	* DecimalIntegerLiteral

	`/^\.[0-9]+$/`

	`/^(0|[1-9][0-9]*)$/`	

	`/^(0|[1-9][0-9]*)(\.[0-9]*)?$/`

	* ExponentPart

	`/^[eE][-\+]?[0-9]+$/`

	
**答案**

`/^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9A-Fa-f]+$|/^(\.[0-9]+|(0|[1-9][0-9]*)(\.[0-9]*)?)([eE][-\+]?[0-9]*)?$`



## 写一个 UTF-8 Encoding 的函数

```js
/**
 * Encode character or code point to utf8
 * @param x  {String} Use first character
 *           {Number} Code Point
 */
function encode(x) {

  let cp = typeof x === 'string' ? x.codePointAt(0) : Math.floor(x);
  if (typeof cp !== 'number' || cp < 0 || cp > 0x10FFFF) {
    throw new TypeError('Invalid Code Point!');
  }

  let utf8;

  if (cp < 0x80) {
    utf8 = combine(cp);
  } else if (cp < 0x800) {
    utf8 = combine((cp >>> 6) | 0xC0, cp & 0x3F | 0x80);
  } else if (cp < 0x10000) {
    utf8 = combine(
      (cp >>> 12) | 0xE0,
      ((cp & 0xFC0) >>> 6) | 0x80,
      cp & 0x3F | 0x80,
    );
  } else {
    utf8 = combine(
      (cp >>> 18) | 0xF0,
      ((cp & 0x3F000) >>> 12) | 0x80,
      ((cp & 0xFC0) >>> 6) | 0x80, cp & 0x3F | 0x80,
    );
  }

  return utf8

  function combine() {
    return [...arguments].map(function (n) {
      let hex = n.toString(16).toUpperCase();
      return n < 0x10 ? ('0' + hex) : hex;
    }).join(' ');
  }
}

const  utf8  = encode('好')

console.log(utf8)
```

**[Encode character or code point to UTF32, UTF16, UTF8](./encode.js)**


## 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

`/(['"])(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*?\1/`

TODO:








