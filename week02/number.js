var a = 0.1
var b = 0.2

const memory = new Float64Array(1)
memory[0] = a

const intArr = new Uint8Array(memory.buffer)

for (let i = 0;i < 8;i++) {
  console.log(intArr[i].toString(2), '\n')
}

console.log(intArr)

Number.MAX_SAFE_INTEGER.toString(16)  // '1fffffffffffff'

Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON

97 .toString(2)

