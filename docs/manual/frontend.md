# 前端开发

ModStart框架使用了 jQuery 等基础前端技术，页面不限于使用 Vue、React 作为前端技术集成。



## 前端代码位置

- ModStart基础前端代码位于 `vendor/modstart/modstart/resources/asset/`。
- 不同模块的前端代码位于 `module/Xxx/resources/asset/`

前端代码需要使用 nodejs 构建，需要预先了解前端使用 webpack, gulp 打包的基础知识。



## 前端代码如何编译

### Windows

1. 安装 nodejs

进入官网 [http://nodejs.cn/](http://nodejs.cn/) ，下载对应的nodejs安装包下载，完成安装。

> 推荐安装 node 14 ，其他版本未完全测试验证 

2. 打开 nodejs 命令窗口

安装完成后，点击windows启动，打开 `Node.js command prompt` 命令窗口

3. 安装 cnpm 和打包依赖

> 安装 cnpm 主要是为了解决国内访问 npm 速度太慢的问题，可根据自己的情况自行选择

**安装cnpm**

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```

**安装webpack和gulp依赖**

```shell
cnpm install -g webpack-cli@4 webpack@4 gulp@4
```

4. 编译前端代码

**编译ModStart代码**

> 通常情况下系统的前端代码无需修改

```shell
# 进入到系统静态资源根目录
cd c:\xxx\vendor\modstart\modstart\resources\asset\
# 安装依赖
cnpm install
# 打包前端CSS、图片等静态资源
gulp
# 调试模式：打包前端JS单页静态资源
webpack --env dev
# 生产模式：打包前端JS单页静态资源
webpack
# 开发模式：打包前端JS单页静态资源，边开发边刷新
webpack --env dev --watch
```

**编译模块代码**

> 编译模块前端代码前，请确保ModStart的静态资源已经安装过依赖（cnpm install）

```shell
# 进入到模块静态资源根目录
cd c:\xxx\module\Xxx\resources\asset\
# 安装依赖
cnpm install
# 打包前端CSS、图片等静态资源
gulp
# 调试模式：打包前端JS单页静态资源
webpack --env dev
# 生产模式：打包前端JS单页静态资源
webpack
# 开发模式：打包前端JS单页静态资源，边开发边刷新
webpack --env dev --watch
```

### OSX / Linux

1. 安装 nodejs

进入官网 [http://nodejs.cn/](http://nodejs.cn/) ，下载对应的nodejs安装包下载，完成安装。

> 推荐安装 node 14 以上版本

2. 安装 cnpm 和打包依赖

> 安装 cnpm 主要是为了解决国内访问 npm 速度太慢的问题，可根据自己的情况自行选择

**安装cnpm**

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```

**安装webpack和gulp依赖**

```shell
cnpm install -g webpack-cli@4 webpack@4 gulp@4
```

4. 编译前端代码

**编译ModStart代码**

> 通常情况下系统的前端代码无需修改

```shell
# 进入到系统静态资源根目录
cd vendor/modstart/modstart/resources/asset/
# 安装依赖
cnpm install
# 打包前端CSS、图片等静态资源
gulp
# 调试模式：打包前端JS单页静态资源
webpack --env dev
# 生产模式：打包前端JS单页静态资源
webpack
# 开发模式：打包前端JS单页静态资源，边开发边刷新
webpack --env dev --watch
```

**编译模块代码**

> 编译模块前端代码前，请确保ModStart的静态资源已经安装过依赖（cnpm install）

```shell
# 进入到模块静态资源根目录
cd module/Xxx/resources/asset
# 安装依赖
cnpm install
# 打包前端CSS、图片等静态资源
gulp
# 调试模式：打包前端JS单页静态资源
webpack --env dev
# 生产模式：打包前端JS单页静态资源
webpack
# 开发模式：打包前端JS单页静态资源，边开发边刷新
webpack --env dev --watch
```

## 前端开发组件

### 弹窗功能

通过增加 `data-dialog-request` 可以快速创建一个弹窗（ iframe 模式 ）。

```html
<a href="javascript:;" data-dialog-request="/path/to/dialog">弹窗</a>
```

> 在弹窗页面通过调用 `parent.layer.closeAll()` 可以关闭操作

具体实现方式可参考 [源代码](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/resources/asset/src/lib/convenient.js)

### Ajax请求

构造一个Ajax请求按钮，点击按钮时，会发送一个请求到接口。

```html
<a href="javascript:;" data-ajax-request="/path/to/url" data-ajax-request-loading data-method="get" data-confirm="确定请求？">
    模拟发送一个请求
</a>
```

- `data-ajax-request`：定义一个快速Ajax请求
- `data-ajax-request-loading`：请求时显示 Loading
- `data-method` ：请求方式，默认为 `post`，可以显式定义为 `get` 或 `post`
- `data-confirm`：弹出二次确认弹窗

具体实现方式可参考 [源代码](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/resources/asset/src/lib/convenient.js)

### Ajax表单

构造一个Ajax表单，在点击提交时，表单会以Ajax的方式请求到后台接口。

```html
<form data-ajax-form action="/path/to/url" method="post">
  <input name="username" value="" />
  <button type="submit">提交</button>
</form>
```

- `data-ajax-form`：表示当前表单是一个Ajax请求表单

具体实现方式可参考 [源代码](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/resources/asset/src/lib/form.js)

## 图片预览

构造一个图片预览，点击预览后会弹出图片预览大图。

```html
<a href="javascript:;" data-image-preview="图片地址">预览</a>
```

具体实现方式可参考 [源代码](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/resources/asset/src/lib/convenient.js)

## 实例参考

Vue单页应用集成：

- [Corp模块](https://modstart.com/m/Corp)
- [Doc模块](https://modstart.com/m/Doc)

Vue普通方式集成：

- [Question模块](https://modstart.com/m/Question)

