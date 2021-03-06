# AlloyTeam 面试经验分享

## 简要自我介绍
因为面试官手上都有简历，面试的自我介绍基本就是对个人亮点的一些补充。我主要怕撤出很多无关前端的问题，所以介绍技术栈的时候对其他方向说的比较保守。

## 如何看待前端与其他方向的区别和前景
自身角度，JS 作为动态语言，上手快，迭代快，可读性良好，开发成本低，能快速试错，适合原型模式下的软件开发；客观角度，客户端 Native 开发难度大，周期长，不易迭代，不易维护，而目前技术上已经逐渐允许使用 Web 做 App 开发，因此比较看好 Web 前端的发展前景。

## 一、语言方面

### JavaScript 相比传统编译型语言的优劣
动态性强就意味着灵活性强，冗余代码少；弱类型就意味着省去了类型声明和转换的操作。由此带来的缺点是不存在真正的编译期，多数错误无法预先发现。

### 如何规避上述的问题
类型安全方面可使用 TypeScript 书写，一方面有编译期可以检查类型安全，另一方面仍能编译成原生 JavaScript 且不影响性能；动态安全方面可使用 ESLint 进行静态检查。

### 列举使用过的JavaScript新特性
`async` `await` `import` `export` `class` 流式编程 解构赋值 默认参数…

### 如何在浏览器中使用这些新特性
使用Babel进行转译。

### 简述 `async` `await` 转译到 ES5 后的大致实现原理
根据其他语言的类似原理，猜测是使用 switch case 实现的，其根本原理是把无状态函数变成有状态的状态机。

### `async` `await` 和传统 `Promise` 相比的优势
彻底抛弃了回调机制，异步代码同步写，支持各种标准流程控制（循环，try/catch/finally等）

### 同步代码与 `setTimeout(.., 0)` 异步代码之间的执行顺序
本地同步代码先执行完，`EventLoop` 空闲时再去取出异步任务执行。

### 如何理解 `EventLoop` 的数据结构
FIFO 的队列结构。

### `setTimeout(.., 0)` 与立即 `resolve()` 的 `Promise` 的执行顺序

这个很遗憾不会，上次头条也考到了，但是上次也考到了很多，没记全，就没有再去探究。上次蒙了一个 `setTimeout()` 在前，似乎对方的反应不太对，这次就蒙了一个 `Promise` 在前……

查了一下原理，还真蒙对了，具体的解释参见[Promise的队列与setTimeout的队列有何关联？ - 元芳的回答 - 知乎](
https://www.zhihu.com/question/36972010/answer/257434523)，因为有两个不同的事件队列「宏任务」`macrotask` 和「微任务」`microtask`，程序运行时，脚本本身的同步代码进入宏任务队列并被执行，执行过程中产生的 `Promise` 决议将加入微任务队列，`setTimeout` 加入宏任务队列；每个宏任务执行完成后，都会清空微任务队列中等待的所有微任务，然后才会继续执行下一个宏任务，换句话说，微任务队列的优先级 > 宏任务队列的优先级，因此先执行 `Promise`，后执行 `setTimeout`；另外，如果有 `process.nextTick` 回调，将在清空微任务队列之前执行，所以 `process.nextTick` 回调的优先级最高。

## 二、后端方面

### Koa 后端开发遇到的问题

Koa 是基于中间件，与以前 Python 中用到的类继承模式区别很大，主要因为中间件模式的任务链是静态的、事先定义好的，在具体路由中无法根据需要动态选择执行哪些中间件，例如对用户身份信息的获取等。开发时，尝试在遵循中间件设计模式的前提下，适当将部分可选耗时操作由中间件直接执行改为中间件向下提供异步 API，下游中间件可选择性进行调用。对于 `bodyparser` 一类几乎始终需要使用的操作，仍然在中间件中直接执行。

### 后端环境下常使用哪些方式组织异步代码
`Promise.all()` 和 `Promise.race()`。

### 后端性能的评估指标
响应速度，请求成功率，容错性，出错情况下的返回格式，日志完整程度，数据库安全性等。

### 后端如何性能测试
主要通过测试脚本进行模拟请求，统计请求的响应情况。

### 后端性能瓶颈主要原因
不太会答了，说了一下上次红包雨项目由于前后端放在一个服务器上，导致前端脚本跑满带宽的问题。

### 后端访问突增时的优化方案
前后端服务器分离，或者使用 CDN 等等。

### 常用的 HTTP 状态码
200, 301, 302, 400, 401, 403, 404, 405, 408, 500, 502, 503

### 前后端开发中验证程序满足需求的常见做法
前端常用 Puppeteer / PhantomJS 模拟浏览器环境做自动化测试；后端常用自动化测试平台 Travis CI 配合测试脚本进行自动化测试。

## 前端方面

### 熟悉的前端框架
熟悉 Vue，另外了解 React、Angular 等。

### Vue 和 React 在技术层面的优劣比较
Vue + Webpack 常用单文件模板形式，格式较为独特，需要 Webpack 额外将 `template` 和 `style` 进行抽取，偏入门；React 以 JSX 为主，格式较规范，偏专业。

### 为何 Vue 和 React 比 DOM 操作的传统 Web 性能高
Vue 和 React 等前端框架使用了 DOM 复用。

### 对 DOM 复用的理解
DOM 复用可将暂时不用的 DOM 节点回收保存，下次需要渲染相似结构时直接在原 DOM 上修改并重新挂载，节省垃圾回收和 DOM 重新构造的时间。

### DOM 操作性能低下的原因
当时猜测是由于 DOM 操作会反映到 HTML 层的字符串操作，而大量的字符串操作会降低性能。后来查了一下恰恰相反，DOM 操作性能差是因为 JS 层的 DOM 内部有很多属性、事件、方法需要构造；DOM 的性能低下也因此催生了 Virtual DOM 的技术。详见[如何理解虚拟DOM? - 戴嘉华的回答 - 知乎](https://www.zhihu.com/question/29504639/answer/73607810)

### 从输入 URL 到显示页面过程中浏览器的工作
1. 将 URL 解析为 `protocol://host:port/route?search#hash`；
2. TCP 连接 `host:port`；
3. 发出请求报文 `GET /route?search HTTP/1.1`；
4. 根据 `Content-Type` 接收响应 HTML；
5. 对 HTML 进行解析，构建 DOM 树，结合 CSS 样式渲染到页面；
6. 顺序执行 `script` 标签。

### 构建好的 DOM 树被渲染到网页界面上的具体过程
1. 将 DOM 树按照 `BFC`、`IFC` 等渲染上下文进行分块；
2. 对于各块，解析内部各元素的层级关系和样式参数，交给 CPU/GPU 渲染；
3. 接收渲染结果，根据各块的绝对位置进行贴图。

### 列举移动端 Web 与桌面端在实际开发过程中遇到的差异
1. 屏幕尺寸、操作方式本身不同，导致交互体验不一致；
2. 各平台的浏览器有不同的实现，例如 iOS 端的 `input` 聚焦时有蓝色外框，iOS 忽略了 HTML 对缩放的禁用，需要在 JS 中监听触摸事件加以控制等。

### 对响应式 Web 的理解
包括 CSS 响应式开发，例如用 CSS3 `@media` 选择器对不同尺寸屏幕区分样式；JS 响应式开发，例如通过判断 `User-Agent` 对不同平台执行不同的代码。

### 对微信小程序运行环境的理解
微信小程序实质上包含两层运行环境，用户提供的 JS 代码运行在类似 Node.js 运行时的进程中，渲染进程运行在基于 Webkit 的 WebView 中，两个进程之间通过 IPC 进行通讯；微信对这一套运行环境做了封装，其中 WebView 层内置了模板引擎，用户可以通过 `setData()` 将 JSON 安全的数据传输给 WebView 层进行渲染，反过来也可以注册监听 WebView 层中的事件。实质上，用户代码均只能直接与类似 Node.js 的独立环境进行交互。

### 微信小程序为何不直接采用纯 WebView 实现
一方面是小程序团队出于安全考虑，提供带有 IPC 机制的两层结构显然比直接允许用户在 WebView 中执行代码要安全；另一方面也是出于小程序生态和用户体验考虑，禁止开发者直接照搬照抄原有 H5 项目代码，而是专为小程序平台开发，能够帮助微信形成封闭生态，同时用户体验也更佳。（面试时没有答到第二点）

### 简述微信小程序 JS 被编译时的处理过程
JS 代码首先被封装在严格模式下的 ES6 函数中，作为模块定义，然后对各个模块进行链接，再与小程序标准库 SDK 相链接，最后进行 minify 压缩并上传。

### 简述微信小程序开发过程中遇到的坑
一是对语言新特性支持较差，目前还不支持 `async` `await` 语义，需要使用 Babel 手动转译并引入 `regenerator-runtime`；二是小程序提供的 API 全局对象 `wx` 经常添加只读的新功能 API，因此开发者不能贸然在 `wx` 中植入自己的函数，以防日后小程序版本更新发生重名冲突；三是由于部分初创团队的错误认识，小程序开发偶尔不由专业的前端开发者担任，导致对小程序的运行环境、布局方式可能有一定的误解，例如可能把根对象 `page` 理解为类似 Native 端的有固定尺寸的容器控件，试图轻易在其中嵌套 `scroll-view` 等。

### 列举 Webpack 常见的功能
1. 语言转译（ES6/ES7 → ES5，pug → HTML，sass/scss/stylus → CSS 等）
2. 分离资源（从 JS 中抽取出导入的 CSS 等）
3. 压缩混淆（minifyJS 等）

### JS 模块过多时如何优化 Webpack 构建时间
这个就不太会了，大概说了一下把第三方模块和自己业务模块分开打包、配置增量更新等等。

### 除Webpack外其他的自动化构建工具
没说出来（Gulp、Grunt 就在嘴边）

### 对浏览器缓存资源的理解
浏览器对 HTML、CSS、JS、图片等资源都有缓存，重复请求且缓存不过期时将优先使用缓存。

### 如何避免资源被缓存
没答上来（貌似应该是 `Cache-Control: no-cache`）

### 网页白屏的可能原因
？？？（没答上来也没查到）

## 其他
最近在学习的技术；以Electron为例简述学习过程；最近在看的书籍，举例说明从中得到的启发
