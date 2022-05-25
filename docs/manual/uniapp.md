# uni-app端

## 移动端代码编译与打包

### 1 准备工作

#### 安装HBuilderX

下载并安装HBuilderX：[https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html)

#### 安装nodejs

下载并安装nodejs：[http://nodejs.cn/](http://nodejs.cn/)

### 2 打开项目

- 进入到移动端代码目录 `module/Xxx/resources/mobile/`，安装依赖，运行 `npm install`
- 启动 HBuilderX 软件
- 点击 文件 → 打开目录，选择 `module/Xxx/resources/mobile/` 目录

### 3 配置项目

uni-app项目配置需要修改接口地址为您的网站地址，需要修改以下地方

> 文件 `src/config/setting.js`

![image-20220415181044708](https://ms-assets.modstart.com/data/image/2022/04/15/36646_uhtt_1570.png)

> 文件 `src/manifest.json`

![image-20220415181131645](https://ms-assets.modstart.com/data/image/2022/04/15/36692_nqv1_5571.png)

### 4 运行项目

#### H5页面

![image-20220415180602742](https://ms-assets.modstart.com/data/image/2022/04/15/36364_c0lu_4947.png)

#### 微信小程序

![image-20220415180634186](https://ms-assets.modstart.com/data/image/2022/04/15/36396_cq0b_3497.png)

#### Android/iOS客户端

连接的后继到电脑，打开USB调试模式

点击 运行 → 运行到手机或模拟器 → 选择连接的手机

### 5 项目发布

#### 发布H5端

> 提示：默认模块中打包好的前端静态文件位于 `module/Xxx/Asset/` 目录中

如果是 Linux或OSX 系统，H5发布只需要运行打包脚本

```shell
cd module/Xxx/resources/mobile/
php build_h5.php
```

#### 发布微信小程序

运行小程序项目后，在小程序IDE中点击发布。

#### 发布Android端

点击 发行 → 原生App，根据实际情况发布

#### 发布iOS端

点击 发行 → 原生App，根据实际情况发布


## 修改小程序主色调

- **图标**：图标为SVG图片，可编辑替换图片主色调
    - 路径 `module/Xxx/resources/mobile/src/static/image/`
- **样式**：修改Less文件主色调变量 `@color-primary`
    - 路径 `module/Xxx/resources/mobile/src/config/theme.less` 
- **变量**：修改JS配置主色调值 `SystemSetting.primaryColor`
    - 路径 `module/Xxx/resources/mobile/src/config/setting.js`

