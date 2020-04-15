# 前端技术

> [前端技术.xmind](./前端技术.xmind)

## HTML

### 通用的计算机语言

- 语法

  https://html.spec.whatwg.org/multipage/parsing.html#tree-construction

- 词法

  https://html.spec.whatwg.org/multipage/parsing.html#tokenization

### SGML

- DTD
- Entity

  https://www.w3.org/TR/WD-html40-970708/sgml/entities.html

### XML

- namespace

	- svg
	- mathml
	- aria

- Tag

  https://html.spec.whatwg.org/multipage/semantics.html#semantics

## JavaScript

### 语法 (Grammar)

- 词法 (Lex)

  InputElement
  	WhiteSpace
  	LineTerminator
  	Comment
  	Token

	- WhiteSpace
	- LineTerminator
	- Comment
	- Token

	  有效的输入元素

		- Identifier
		- Keywords
		- Punctuator
		- NumericLiteral
		- StringLiteral
		- RegularExpressLiteral
		- Template

- 语法 (Syntax)

	- Atom
	- Expression
	- Structure
	- Script & Module

### 语义 (Semantics)

### 运行时 (Runtime)

RunJobs()

- Type

	- Undefined
	- Null
	- Number
	- String
	- Boolean
	- Symbol
	- Object
	- 内部类型

		- Reference

		  这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。

		- Completion Record
		- ...

- 执行过程

	- Job
	- Script/Module
	- Promise
	- Function
	- Statement
	- Expression
	- Literal
	- Identifier

## CSS

### 语法/词法

### @规则

### 普通规则

- 选择器

	- 简单选择器

		- class
		- id
		- tag
		- [attr=v]
		- *

	- 复合选择器
	- 复杂选择器
	- 选择器列表

- 属性 (property)
- 值 (value)

### 机制

- 排版
- 伪元素
- 动画
- 优先级

## API

### Browser

- DOM

	- Nodes
	- Ranges
	- Events

### Node

### Electron

### 小程序

