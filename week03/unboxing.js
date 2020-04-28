1 + {}  // '1[object Object]'

1 + { valueOf() { return 2 } }  // 3

1 + { toString() { return '2' } } // '12'

1 + { toString() { return 2 } } // 3

1 + { valueOf() { return 2 }, toString() { return '2' } } // 3

'1' + { valueOf() { return 1 }, toString() { return '2' } } // '11'

1 + { [Symbol.toPrimitive]() { return 1 }, valueOf() { return 2 }, toString() { return '3' } }  // 2

1 + { valueOf() { return }, toString() { return '2' } } // NaN

'1' + { valueOf() { return }, toString() { return '2' } } // '1undefined'

'1' + { [Symbol.toPrimitive]() { return {} }, valueOf() { return 2 }, toString() { return '3' } }  // Uncaught TypeError: Cannot convert object to primitive value

'1' + { valueOf() { return {} }, toString() { return '2' } } // '12'

new Date().toJSON()

