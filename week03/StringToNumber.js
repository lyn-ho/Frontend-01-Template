function convertStringToNumber(string, scale = 10) {
  let chars = string.split('');
  const len = string.length;

  let res = 0;

  let i = 0;

  while (i < len && chars[i] !== '.') {
    res = res * scale;
    res += chars[i].codePointAt(0) - '0'.codePointAt(0);

    i++;
  }

  (chars[i] === '.') && i++;

  let fraction = 1;

  while (i < len) {
    fraction = fraction / scale;
    res += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;

    i++;
  }

  return res
}

