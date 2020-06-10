# CSS

## 动画 Animation

### @keyframes

- @keyframes mykf {
  from { background: red; }
  to { background: yellow; }
}

### animation

- div {
  animation: mykf 5s infinite;
}

### properties

- animation-name

	- 指定应用的一系列动画，每个名称代表一个由@keyframes定义的动画序列

- animation-duration

	- 指定一个动画周期的时长

- animation-timing-function

	- 定义CSS动画在每一动画周期中执行的节奏。可能值为一或多个 <timing-function>
	- bezier

- animation-delay

	- 定义动画于何时开始，即从动画应用在元素上到动画开始的这段时间的长度

- animation-iteration-count

	- 定义动画在结束前运行的次数 可以是1次 无限循环

- animation-direction

	- 指示动画是否反向播放

## 渲染

### 颜色

- CMYK

	- Cyan
	- Magenta
	- Yellow
	- blacK

- RGB

	- Red
	- Green
	- Blue

- HSL/HSV

	- Hue 色相

		- 色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等

	- Saturation 饱和度

		- 指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值

	- Lightness 亮度
Value 明度

		- 明度（V），亮度（L），取0-100%

### 形状

- border
- box-shadow
- border-radius
- data uri + svg

