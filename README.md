# uni-bimitv

#### 介绍
uniapp使用demo

uniapp是一个使用 Vue.js 开发小程序、H5、App的统一前端框架。官网地址：https://uniapp.dcloud.io
开发者使用 Vue 语法编写代码，uni-app 框架将其编译到 小程序（微信/支付宝/百度/字节跳动/QQ/钉钉）、App（iOS/Android）、H5等多个平台，保证其正确运行并达到优秀体验。
#### 软件架构
使用uni-app以及ColorUI插件


#### 安装教程

1. git clone [](https://github.com/GriMu/uni-bimitv.git)
2. 使用HBuilderX[](https://uniapp.dcloud.io/quickstart?id=_1-%e9%80%9a%e8%bf%87-hbuilderx-%e5%8f%af%e8%a7%86%e5%8c%96%e7%95%8c%e9%9d%a2)导入项目
3. 选择运行到浏览器，小程序模拟器，手机模拟器进行查看

#### 使用说明

1. 新增首页
2. 新增短视频
3. 新增频道
4. 新增我的

#### 2019-10-18 Todo
1. 首页搜索
2. 历史记录
3. 缓存清理
4. 真实地址处理
5. vip
6. 我的看单 like
7. api animateDetail 需要新增返回图
#### 2019-10-31 Todo
1. 打包h5替换
function getUri(sever,url)
{
	var linkurl = url;
	// linkurl = sever+url;
	return linkurl;
}

function getUri(sever,url)
{
	var linkurl = url;
	// #ifndef H5
		linkurl = sever+url;
	// #endif
	return linkurl;
}
