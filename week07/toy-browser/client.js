const net = require('net')

const { parseHTML } = require('./parser')

class Request {
  // method, url = host + port + path
  // body
  // headers
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'

    this.body = options.body || {}

    this.headers = options.headers || {}

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map((key => `${key}=${encodeURIComponent(this.body[key])}`)).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  open(method, url) {}

  send(connection) {
    const parser = new ResponseParser()

    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }

      connection.on('data', (data) => {
        parser.receive(data.toString())
        // console.log(parser.statusLine)
        // console.log(parser.headers)
        if (parser.isFinished) {
          resolve(parser.response)
        }
        // console.log(data.toString());
        // resolve(data.toString())
        connection.end();
      });

      connection.on('end', () => {
        console.log('disconnected from server');
      });

      connection.on('error', err => {
        // console.log(err)
        reject(err)
        connection.end()
      })
    })
  }

  toString() {
    // return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`

    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
  }
}

class Response {
  
}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.currentStatus = this.WAITING_STATUS_LINE

    this.statusLine = ''

    this.headers = {}
    this.headerName = ''
    this.headerValue = ''

    this.bodyParser = null
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }

  get response() {
    const reg = this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)

    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive(string) {
    for (let i = 0;i < string.length;i++) {
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar(char) {
    if (this.currentStatus === this.WAITING_STATUS_LINE) {
      if (char === '\r') this.currentStatus = this.WAITING_HEADER_LINE_END
      else this.statusLine += char
    } else if (this.currentStatus === this.WAITING_STATUS_LINE_END) {
      if(char === '\n') this.currentStatus = this.WAITING_HEADER_NAME
    } else if (this.currentStatus === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.currentStatus = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_BLOCK_END

        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new ChunkedBodyParser()
        }
      } else {
        this.headerName += char
      }
    } else if (this.currentStatus === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.currentStatus = this.WAITING_HEADER_VALUE
      }
    } else if (this.currentStatus === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_LINE_END

        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.currentStatus === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
      }
    } else if (this.currentStatus === this.WAITING_HEADER_BLOCK_END) {
      if(char === '\n') this.currentStatus = this.WAITING_BODY
    } else if (this.currentStatus === this.WAITING_BODY) {
      this.bodyParser && this.bodyParser.receiveChar(char)
    }
  }
}

class ChunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_CHUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4

    this.currentStatus = this.WAITING_LENGTH
    this.length = 0
    this.content = []
    this.isFinished = false
  }

  receiveChar(char) {
    // console.log(this.currentStatus)
    // console.log(JSON.stringify(char))
    if (this.currentStatus === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          // console.log(this.content)
          // console.log('/////////')
          this.isFinished = true
        }
        this.currentStatus = this.WAITING_LENGTH_LINE_END
      } else {
        this.length *= 16
        this.length += parseInt(char, 16)
        // this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
      }
    } else if (this.currentStatus === this.WAITING_LENGTH_LINE_END) {
      if(char === '\n') this.currentStatus = this.READING_CHUNK
    } else if (this.currentStatus === this.READING_CHUNK) {
      if (this.length === 0) {
        this.currentStatus = this.WAITING_NEW_LINE
      } else {
        this.content.push(char)
        this.length--
      }
    } else if (this.currentStatus === this.WAITING_NEW_LINE) {
      if(char === '\r') this.currentStatus = this.WAITING_NEW_LINE_END
    } else if (this.currentStatus === this.WAITING_NEW_LINE_END) {
      if(char === '\n') this.currentStatus = this.WAITING_LENGTH
    }
  }
}

void async function () {

  let req = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',

    headers: {'X-Foo2': 'custom'},

    body: {name: 'lyn'}
  })

  // console.log(req.toString())
  const response = await req.send()

  // console.log(response)

  let dom = parseHTML(response.body)
  console.log(dom)
}()

// const client = net.createConnection({
//     host: '127.0.0.1',
//     port: 8088
//   }, () => {
//     // 'connect' listener.
//     console.log('connected to server!');

//     client.write(req.toString())

//     // client.write('POST / HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 11\r\n\r\nname=winter')
//     // client.write(`
//     // POST / HTTP/1.1\r
//     // Content-Type: application/x-www-form-urlencoded\r
//     // Content-Length: 11\r
//     // \r
//     // name=winter`)  //  400 多余空格?
// //     client.write(`
// // POST / HTTP/1.1\r
// // Content-Type: application/x-www-form-urlencoded\r
// // Content-Length: 11\r
// // \r
// // name=winter`)

// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end', () => {
//   console.log('disconnected from server');
// });

// client.on('error', err => {
//   console.log(err)
//   client.end()
// })
