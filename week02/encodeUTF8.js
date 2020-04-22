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
