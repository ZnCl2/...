# rikumi ❤ JavaScript

rikumi 自述文档系列之一

> 4 年 Web 前端学习经验，2 年业务开发经验；
>
> 熟悉 `ES5`/`ES6`/`ESNext` 语法；熟悉 `CSS3`，熟悉最新 `FlexBox` 布局；
>
> 会使用 `JQuery`/`Vue.js` 等框架，会使用 `NPM`/`Yarn`/`Webpack`/`Travis CI` 辅助构建。

项目经历：

- 「达人荟live」微信小程序（20+个业务页面，4个月）
- 「小猴偷米」微信小程序（10+个业务页面，1个聚合页面，已迭代半年）
- 「Blox」多人在线实时像素化瓷砖画板前后端（Vue，WebSocket，1周）
- 「玩味生活美学」微信 Web 项目（Vue + Webpack，10+个业务页面，1个月）
- 「格物东南」微信 Web 项目（Vue + Webpack，5个业务页面，2周）
- 「金钥匙计划」选课系统前后端（Vue + Webpack，2个业务页面，3天）
- 「计软网安红包雨」红包抽奖系统前端（Vue + Webpack，2个业务页面，1周）
- 「雫 Shizuku」Typora 主题（CSS3 作品）
- 「小猴偷米」Web PWA 版（Vue + Webpack，10+个组件，1周）
- 「Clomi」基于 Electron 的网易云播放器（Vue + Webpack，5个组件，3天）

♪26131696

本期 **BGM** 来自「Rewrite」：风祭城的阳光似乎每天都一样的好。早已厌倦了每天不断重复的日常，可那时的我从未想过，这样平淡无奇的日常，竟会成为未来的我所深深怀念着的日子。

---

初识前端是在2010年：那时我才初二，诺基亚还在屹立不倒，学习机是当时的新鲜事物，`PHP` 还没凉，`Discuz!` 论坛还处在它的全盛时期，最早接触互联网的孩子们还在以搭建一个自己的论坛为梦想。

我也是那群孩子之一。那段日子，我得到了自己的第一个（也是最后一个）真正意义上的学习机，不知为什么，在短暂的使用和娱乐过后，我开始厌倦它的 UI 和操作——这已经不是我第一次产生这种念头了。

课余的时间，喜欢浏览学习机的交流论坛，偶然间看到大神发布的破解工具，尝试着使用。现在看来，大概是从刷机包里提取出学习机自带的文件管理器，对里面的二进制做一些修改，把文件管理器破解成可以读写系统分区，再把修改后的文件管理器改成卡刷程序的名字，欺骗系统启动，得到系统分区的读写权限。

得到权限后，系统分区里的程序就任你摆布了。这些程序的代码段对于当时的我们来说几乎没法破译，但资源段的文本和图片都很方便修改。用下载到的一套修改工具，配合 Windows 画图，一遍遍地调整、替换、刷入、重启，成了当时打发时光的乐事。

当时的另一个业余爱好当然是搭论坛。从免费提供 `Discuz 7` 论坛搭建服务的 `5d6d` 网出发，我们这些付不起钱的穷孩子也能开启一段自己管理一个论坛的神奇旅程，虽然论坛里可能无人问津，但折腾那些神奇的后台设置项已经是很好玩的一件事了。

做学习机修改的时候，在步步高论坛结识了**大狗**和**猪猪**两个伙伴，以及他们所管理的**悦艺学习分享站**——他们在那里做「版主」（现在这个词已经足够古老到可以打引号了）；之后又在维护中结识了**老杨**，我们四个从此成为这个网站的管理组，在运营维护和谈天说地中逐渐成长起来。一次次的发布，一段段幼稚到每句话都足以成为黑历史的介绍文字，一个达到两位数就会很开心的下载量值，以及越来越多的朋友们，是在我成长中前所未有的一种快乐。

朋友有了，论坛也有了，这两份快乐开始重叠在一起~~（喂）~~：跟朋友一起搭论坛。当时的悦艺主要做一些电影分享、学习机资源分享等等，我们就从那里起步，在免费的虚拟主机服务商之间一次次搬迁，数据迁移，网站重建，主题编辑，主题制作，最后在那段反复无常的日常中学会了 HTML，学会了 CSS （万幸的是，没有学会 PHP）；而在不断的宣传和内容建设中，网站的用户量也逐渐增加到了千人——这个数字是在当时日日夜夜的迁站和重建之中，给我们最大的慰藉。

再后来，悦艺网在一次迁移中永久丢失了数据库；再后来，我们开始寻觅各种各样的开源网站系统，逐渐看到了 PHP 的尽头，也见证了 Python 和 Node 的苗头；再后来，原悦艺网的四人群成了我们无话不说的秘密基地，一直保留至今。

---

这中间经过的高中和大学初期，前端开发方面并没有太多涉足，基本就搁置了，停留在会 `HTML` 会 `CSS` 不会 `JS` 的阶段，也一直心心念念想要继续学下去。

大二上学期的时候，创业团队达人荟的李度洋学长来小猴偷米工作室做客，一方面希望小猴加入创业的大潮，另一方面也想挖一两个人去做开发。几个月后，我以 iOS 开发的身份加入达人荟。然而计划赶不上变化，2017年1月，微信小程序发布，团队决定全员投入小程序开发。大二的寒假，我跟随之前担任 Android 开发的刘继龙学长开始开发微信小程序；一个月后，刘继龙学长研究生毕业，就职腾讯，小程序开发的重担交给我自己接替。

刚接手的时候经常以为小程序的架构更接近原生开发，后来踩了很多坑之后才发现，小程序其实就是 Web（确切的说还是跟 Web 有一定区别，是一个类似于 Electron 的架构，它的逻辑全都在 Node 层，Webkit 层则只负责渲染），所以在开发小程序的过程中，一不小心就再一次入了前端开发的坑。

创业公司的氛围很好，因此在小程序第一版上线之后的一个月内，我开始尝试自己做一些架构上的事情，用运行时注入的方式，写了一套自用的小程序开发轮子 `wx.js`，经历过一次大 bug 之后日趋完善，后来应用到了小猴偷米小程序的开发中；在这段时间，还基于自己原来的 CSS 基础，做了一些不一样的东西，比如有一次突然需求有变，需要加一个兴趣标签的选择器，产品直接提出不做 UI，让我自己把握，我就客串了一次 UI 小姐姐，做了一个带类似 Material Design 水波效果的标签选择器；另外还有一个同样仿 Material Design 写的，带 CSS3 过渡动画的浮动动作按钮，可以根据需求动态改变图标的形状，比如加号可以旋转成叉号，再旋转平移成箭头。

刚升大三的暑假，跟达人荟团队一起留校，带了一批同学在计算机楼的办公室做客户端开发。先是暑假前期做 iOS 端，周一到周五朝九晚九。

写了两周左右，每天早上带食堂的早餐来，中午和晚上也渐渐开始点固定几家的外卖，曾经觉得不可思议的生活就这样成为了日常。后来一起做的同学们陆续回家了，天气异常炎热，我就自己在宿舍吹着空调，度过了漫长的后半个暑假。

等他们一个个回到学校，真正的暑期实训开始，本来是打算拿暑假前写的东西去糊一下学校的暑期实训，然而已经写完的东西显然不能在老师眼皮底下蒙混过关。恰好这时候达人荟团队接了个跟达人荟本身业务非常类似的 Web 前端的外包。因为受众几乎没有重叠，不构成竞争关系，达人荟就接了这个外包，经过我们的讨论，把这个项目兼作为暑期实训的内容。

于是同样的场景再次上演，在计算机楼的另一个实验室，每天早上带食堂的早餐来，中午和晚上还是继续点固定几家的外卖，不同的是朝九晚九变成了朝九晚五。

做完那个外包，也是第一次完整地用 Vue.js + Webpack 做完一个业务应用。万事开头难，用过第一次之后，一切都变得方便起来，于是之后再也离不开 Vue.js + Webpack 这个组合。小猴为学生处写的贫困生选课系统，圣诞的计软网安迎新晚会的红包雨前端，以及再后来的小猴偷米 PWA 版，Electron 写的网易云播放器 Clomi，都在一次次的 NPM Build 中走向成熟。

rikumi 酱，作为前端开发者的身份，也在日复一日的日常中走向成熟。

「全文完」

2018/2/8
