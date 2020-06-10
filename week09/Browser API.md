# Browser API

## DOM

### DOM Tree

- Node

	- Element: 元素型节点，跟标签相对应

		- HTMLElement

			- HTMLAnchorElement
			- HTMLAppletElement
			- HTMLAreaElement
			- HTMLAudioElement
			- HTMLBaseElement
			- HTMLBodyElement
			- ...

		- SVGElement

			- SVGAElement
			- SVGAltGlypphElement
			- ...

	- Document: 文档根节点
	- CharacterData: 字符数据

		- Text: 文本节点

			- CDATASection: CDATA节点

		- Comment: 注释
		- ProcessingInstruction: 处理信息

	- DocumentFragment: 文档片段
	- DocumentType: 文档类型

- Operation

	- 导航类操作

		- parentNode
		- childNodes

			- living collection: 修改操作会实时改变 childNodes 值，即使使用变量存储，该变量也会跟着改变

		- firstChild
		- lastChild
		- nextSibling
		- previousSibling

	- 修改操作

		- appendCHild
		- insertBefore
		- removeChild
		- replaceChild

	- 高级操作

		- compareDocumentPosition

			- 用于比较两个节点关系

		- contains

			- 检查一个节点是否包含另一个节点

		- isEqualNode

			- 检查两个节点是否完全相同

		- isSameNode

			- 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用 ‘===’

		- cloneNode

			- 复制一个节点，如果传入参数 true ，则会连同子元素做深拷贝

### Events

- EventTarget

	- addEventListener

		- parameters

			- type
			- listener

				- function
				- { handleEvent: function() {} }

			- options

				- capture

					- 先捕获 后冒泡

				- once

					- if true, automatically removed when invoked

				- passive

					- if true, will never call preventDefault()
					- touchmove event  default true

### Range

## CSSOM

## BOM

## Web Animation

## Crypto

## ...

