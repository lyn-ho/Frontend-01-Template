/**
 * Encode character or code point to UTF32, UTF16, UTF8
 * @param x  {String} Use first character
 *           {Number} Code Point
 */
function encode(x) {

  let cp = typeof x === 'string' ? x.codePointAt(0) : Math.floor(x);
  if (typeof cp !== 'number' || cp < 0 || cp > 0x10FFFF) {
    throw new TypeError('Invalid Code Point!');
  }

  let UTF32LE, UTF32BE, UTF16LE, UTF16BE, UTF8;

  if (cp > 0xFFFF) {
    UTF32LE = combine(0, cp << 8 >>> 24, cp << 16 >>> 24, cp & 0xFF);
  } else {
    UTF32LE = combine(0, 0, cp >>> 8, cp & 0xFF);
  }
  UTF32BE = convertBOM(UTF32LE);

  if (cp > 0xFFFF) {
    let c = cp - 0x10000;
    let sh = (c >>> 10) + 0xD800;
    let sl = (c & 0xFFF) + 0xDC00;
    UTF16LE = combine(sh >>> 8, sh & 0xFF, sl >>> 8, sl & 0xFF);
  } else {
    UTF16LE = combine(cp >>> 8, cp & 0xFF);
  }
  UTF16BE = convertBOM(UTF16LE);

  if (cp < 0x80) {
    UTF8 = combine(cp);
  } else if (cp < 0x800) {
    UTF8 = combine((cp >>> 6) | 0xC0, cp & 0x3F | 0x80);
  } else if (cp < 0x10000) {
    UTF8 = combine(
      (cp >>> 12) | 0xE0,
      ((cp & 0xFC0) >>> 6) | 0x80,
      cp & 0x3F | 0x80,
    );
  } else {
    UTF8 = combine(
      (cp >>> 18) | 0xF0,
      ((cp & 0x3F000) >>> 12) | 0x80,
      ((cp & 0xFC0) >>> 6) | 0x80, cp & 0x3F | 0x80,
    );
  }

  return { UTF32LE, UTF32BE, UTF16LE, UTF16BE, UTF8 };

  function combine() {
    return [...arguments].map(function (n) {
      let hex = n.toString(16).toUpperCase();
      return n < 0x10 ? ('0' + hex) : hex;
    }).join(' ');
  }

  function convertBOM(str) {
    return str.replace(/(\w\w) (\w\w)/g, '$2 $1');
  }

}

const { UTF32LE, UTF32BE, UTF16LE, UTF16BE, UTF8 } = encode('好')

console.log('UTF32LE: ', UTF32LE, '\nUTF32BE: ', UTF32BE, '\nUTF16LE: ', UTF16LE, '\nUTF16BE: ', UTF16BE, '\nUTF8: ', UTF8)
