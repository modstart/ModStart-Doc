# 前端开发

ModStart框架使用了 jQuery 等基础前端技术，页面不限于使用 Vue、React 作为前端技术集成。

## 前端代码位置

- ModStart基础前端代码位于 `vendor/modstart/modstart/resources/asset/`。
- 不同模块的前端代码位于 `module/Xxx/resources/asset/`

前端代码需要使用 nodejs 构建，需要预先了解前端使用 webpack, gulp 打包的基础知识。

## 前端代码如何编译

### Windows版

1. 安装 nodejs

进入官网 [http://nodejs.cn/](http://nodejs.cn/) ，下载对应的nodejs安装包下载，完成安装。

> 推荐安装 node 14 以上版本

2. 打开 nodejs 命令窗口

安装完成后，windows启动，打开 `Node.js command prompt` 命令窗口

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

### OSX

> 待补充...

## 举个例子

Vue单页应用集成：

- [Corp模块](https://modstart.com/m/Corp)
- [Doc模块](https://modstart.com/m/Doc)

Vue普通方式集成：

- [Question模块](https://modstart.com/m/Question)

