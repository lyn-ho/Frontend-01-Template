function convertNumberToString(number, scale = 10) {
  let integer = Math.floor(number);
  let fraction = number - integer;

  let str = '';

  while (integer > 0) {
    str = String(integer % scale) + str;
    integer = Math.floor(integer / scale)
  }

  return str;
}
