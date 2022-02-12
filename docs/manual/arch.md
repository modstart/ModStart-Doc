# 系统架构



## 系统加载流程

ModStart的启动通过 `ModStart\ModStartServiceProvider` 类来管理，具体的加载过程参考相关实现逻辑。


## 路由加载流程

### Web前台

系统会按照如下的顺序加载路由文件。

- `module/Xxx/Web/routes.php`：所有模块中的Web前台路由
- `app/Web/routes.php`：系统应用Web前台路由

### Admin后台

系统会按照如下的顺序加载路由文件。

- `module/Xxx/Admin/routes.php`：所有模块中的Admin后台路由
- `app/Admin/routes.php`：系统应用Admin后台路由



### Api接口

系统会按照如下的顺序加载路由文件。

- `module/Xxx/Api/routes.php`：所有模块中的Api接口路由
- `app/Api/routes.php`：系统应用Api接口路由



### OpenApi开放接口

系统会按照如下的顺序加载路由文件。

- `module/Xxx/OpenApi/routes.php`：所有模块中的OpenApi开放接口路由
- `app/OpenApi/routes.php`：系统应用OpenApi开放接口路由



## Composer安装第三方依赖包

现支持 PHP5.6、PHP7.0，部分依赖有改造，如需手动安装 Composer 第三方包，需要将 ModStart 私有源加入到 `composer.json` 中，避免 ModStart 更新时的私有包获取失败。

```json
{
  // ...
  "repositories": [
    {
      "type": "composer",
      "url": "https://modstart.com/composer"
    }
  ]
  // ...
}
```

> ModStartCMS 默认已添加该私有源



## 请求会话保持机制

在Web应用程序中，我们经常要跟踪用户身份。当一个用户登录成功后，如果他继续访问其他页面，程序需要继续记录他的身份。

HTTP协议是一个无状态协议，即Web应用程序无法区分收到的两个HTTP请求是否是同一个浏览器发出的。为了跟踪用户状态，服务器可以向浏览器分配一个唯一ID，并以Cookie的形式发送到浏览器，浏览器在后续访问时总是附带此Cookie，这样，服务器就可以识别用户身份。

### Web 请求

Web 目录中的请求，通过使用 Laravel 自带的 Session 机制，可以很方便的管理会话。后台只需要通过如下方法获取：

- `Session::get` 获取会话变量
- `Session::put` 设置会话变量
- `Session::forget` 删除会话变量

> 具体可参考 Laravel Session

### Api 请求

Api目录中的请求，需要携带 `api-token` 请求头。

- 第一次发起请求该值留空即可，返回的响应头中会在服务端生成 `api-token` 。
- 在所有接口交互过程中，当响应头中存在 `api-token` 时，需要覆盖客户端的 `api-token` 值。
- 通常第一个请求接口无需携带 `api-token` 信息，如配置接口 `/api/config` 、登录接口 `/api/login`。

> 具体可参考 `vendor/modstart/modstart/src/App/Api/Middleware/SessionMiddleware.php`




## 名词解释

| 名词 | 含义 | 备注 |
| ---- | ---- | ---- |
| Web  | 前台管理 | 用户处理用户前台相关功能 |
| Admin | 后台管理 | 用于处理后台管理相关功能 |
| Api | Api接口 | 用于处理用户端前台界面、手机端、小程序等请求 |
| OpenApi | OpenApi开放接口 | 用户处理系统对外提供的标准接口，通常同时AppId和AppSecret授权调用 |



