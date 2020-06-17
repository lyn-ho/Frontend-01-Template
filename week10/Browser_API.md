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

- new Range()

	- document.getSelection().getRangeAt(0)
	- range.setStart(el, 9)

		- Sets the start position of a Range.

	- range.setEnd(el, 4)

		- Sets the end position of a Range.

	- setStartBefore

		- Sets the start position of a Range relative to another Node.

	- setStartAfter

		- Sets the start position of a Range relative to another Node.

	- setEndBefore

		- Sets the end position of a Range relative to another Node.

	- setEndAfter

		- Sets the end position of a Range relative to another Node.

	- selectNode

		- Sets the Range to contain the Node and its contents.

	- selectNodeContents

		- Sets the Range to contain the contents of a Node.

	- collapse

		- Collapses the Range to one of its boundary points.

	- cloneContents

		- Returns a DocumentFragment copying the nodes of a Range.

	- deleteContents

		- Removes the contents of a Range from the Document.

	- extractConts

		- Moves contents of a Range from the document tree into a DocumentFragment.

	- insertNode

		- Insert a Node at the start of a Range.

	- surroundContents

		- Moves content of a Range into a new Node.

	- compareBoundaryPoints

		- Compares the boundary points of the Range with another Range.

	- cloneRange

		- Returns a Range object with boundary points identical to the cloned Range.

	- detach

		- Releases the Range from use to improve performance

	- toString

		- Returns the text of the Range.

- DocumentFragment

	- fragment = range.extractContents()

		- range.insertNode(document.createTextNode('aaa'))

## CSSOM

### CSSStyleSheet/StyleSheet

### Rules

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule('p { color : pink; }', 0)
- document.styleSheets[0].removeRule(0)

### Rule

- CSSStyleRule

	- https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule

- CSSCharsetRule

	- https://developer.mozilla.org/en-US/docs/Web/API/CSSRule

- CSSImportRule

	- https://developer.mozilla.org/en-US/docs/Web/CSS/@import

- CSSMediaRule

	- https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule

- CSSFontFaceRule

	- https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face

- CSSPageRule

	- https://developer.mozilla.org/en-US/docs/Web/API/CSSPageRule

- CSSNamespaceRule

	- https://developer.mozilla.org/zh-CN/docs/Web/API/CSSNamespaceRule

- CSSKeyframeRule

	- https://developer.mozilla.org/zh-CN/docs/Web/API/CSSKeyframeRule

- CSSSupportsRule

	- https://developer.mozilla.org/en-US/docs/Web/API/CSSSupportsRule

- CSSConditionRule

	- https://developer.mozilla.org/zh-CN/docs/Web/API/CSSConditionRule

- CSSCounterStyleRule

	- https://developer.mozilla.org/zh-CN/docs/Web/API/CSSCounterStyleRule

- CSSGroupingRule

	- https://developer.mozilla.org/zh-CN/docs/Web/API/CSSGroupingRule

- CSSKeyframesRule

	- https://developer.mozilla.org/zh-CN/docs/Web/API/CSSKeyframesRule

- CSSMarginRule
- CSSViewportRule

### StyleSheets

- document.styleSheets

### CssRules

- let cssRules = codument.styleSheets[0].cssRules

	- cssRules[0].style.fontSize = '40px'
	- cssRules[0].style.color = 'blue'

### getComputedStyle

- window.getComputedStyle(el, pseudoEl)

	- el 想要获取的元素
	- pseudoEl 伪元素

### view

- Window

	- open

		- window.open('about:blank', '_blank')
		- window.open('about:blank', '_blank', 'width=100,height=100,left=100,top=100')

	- moveBy
	- resizeBy
	- scrollX
	- scrollY
	- scroll
	- scrollBy
	- innerWidth
	- innerHeight
	- outerWidth/outerHeight
	- devicePixlRatio
	- document.documentElement.getBoundingClientRect()

- Scroll

	- scrollBy
	- scrollTo
	- scrollTop
	- scrollLeft
	- scrollHeight

- Element

	- getClientRects(): Array

		- inline 元素会产生多个盒
		- 伪元素不会被计算到 rects 中

	- getBoundingClientRect

## BOM

## Web Animation

## Crypto

## ...

