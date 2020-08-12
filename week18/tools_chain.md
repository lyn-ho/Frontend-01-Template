# Dev 工具

## Server

- build: webpack babel jsx postcss ...
- watch: fsevent
- mock
- http: ws


## Client

### Debugger

为什么 vscode 可以给 node 打断点

  Debugger listening on ws://127.0.0.1:53497/01b19762-34f2-47ef-a09f-aa1daaf68925
  For help, see: https://nodejs.org/en/docs/inspector

  1. node 启动一个 Debugger 的 server，这个 server 和 v8 在同一个进程中，所以它可以控制 v8
  2. vscode 作为一个 client，和这个 server 以 websocket 进行通信，它们直接传递我们在客户端【打断点，debugger】等命令，v8 执行到这些命令标记的语句时，就会在 ws 发送对应的事件 ，


#### Server

- node
- browser
- electron

- v8
- jsc

#### Client

- debugger client

- Client DevTools
  - Chrome DevTools Protocol Client


### source map
