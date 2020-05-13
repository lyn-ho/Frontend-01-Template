# Week05

## 课堂笔记

- [2020-05-07](./2020-05-07.md)

- [2020-05-09](./2020-05-09.md)


## 习题

- toy-browser
  - [client](./toy-browser/client.js)
  - [server](./toy-browser/server.js)

- [global-properties](./objects-g6.html)


## 个人总结

### 结构化

#### 闭包

> 闭包是指那些能够访问自由变量的函数。

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

> 闭包 = 函数 + 函数能够访问的自由变量

#### 执行上下文

- ES3
  - scope： 作用域，也常被叫做作用域链
  - variable object：变量对象，用于存储变量的对象
  - this：this 值

- ES5
  - lexical environment：词法环境，当获取变量时使用
  - variable environment：变量环境，当声明变量时使用
  - this：this 值

- ES2018
  - lexical environment：词法环境，当获取变量或者 this 值时使用。
  - variable environment：变量环境，当声明变量时使用。
  - code evaluation state：用于恢复代码执行位置。
  - Function：执行的任务是函数时使用，表示正在被执行的函数。
  - ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。- - Realm：使用的基础库和内置对象实例。
  - Generator：仅生成器上下文有这个属性，表示当前生成器。


### 浏览器工作原理

#### URL 到显示

1. 浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务端请求页面；
2. 2. 把请求回来的 HTML 代码经过解析，构建成 DOM 树；
3. 计算 DOM 树上的 CSS 属性；
4. 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图；
5. 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度；
6. 合成之后，再绘制到界面上。


#### HTTP 协议

- HTTP/0.9 -- 1990，并没有作为正式标准
- HTTP/1.0 -- 1996，RFC1945
- HTTP/1.1 -- 1997，RFC2616
- HTTP/2 -- 2015，RFC7540

- 请求响应
- 无状态

#### HTTP 方法

- GET（获取资源）

	指定的资源经服务器端解析后返回响应内容

- POST（传输实体主体）

- PUT（传输文件）

	在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置

- HEAD（获得报文首部）

- DELETE（删除文件）

  按请求 URI 删除指定资源

- OPTIONS（询问支持的方法）

- TRACE（追踪路径）

  让 Web 服务器端将之前的请求通信路径返回给客户端
	在 Max-Forwards 首部字段中填入数值，每经过一个服务器就将该数值减 1，当数值减到 0 时，就停止继续传输，最后接收到请求的服务器端则返回状态码 200 OK 的响应

- CONNECT（要求用隧道协议连接代理）

  实现用隧道协议进行 TCP 通信
	主要使用 SSL（Secure Sockets Layer，安全套接层）和 TLS（Transport Layer Security，传输层安全）协议把通信内容加密后经网络隧道传输

#### TCP/IP 分层管理

- 应用层
- 传输层
- 网络层
- 数据链路层

