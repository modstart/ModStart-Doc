# 开发必看

ModStart 基于原生 Laravel 开发，独创了方便易扩展的模块开发架构，通过配置式的开发过程，可以快速实现系统搭建。



## 开发流程

强烈推荐如下的开发流程开展系统开发工作：

1. 本地安装 ModStart 框架，搭建开发环境；
2. 在开发环境安装模块，同时进行二次开发和测试；
3. 使用代码管理工具同步代码到仓库（ [git](https://git-scm.com/)、[svn](https://tortoisesvn.net/)）；
4. 使用代码仓库的代码部署到生产服务器。



## 代码结构

系统代码结构参照 Laravel 的目录结构，开发前必须了解以下目录

| 目录                     | 介绍                           |
| ------------------------ | ------------------------------ |
| `app/` | 应用代码目录，包含了应用的主要业务代码 |
| `config/` | 包含了应用所有的配置文件，建议通读一遍这些配置文件以便熟悉 Laravel 所有默认配置项 |
| `database/` | 包含了数据库迁移文件及填充文件 |
| `module/`                  | 模块代码目录，每个模块一个目录 |
| `public/`                  | 目录包含了应用入口文件 index.php 和前端资源文件（图片、JavaScript、CSS等 |
| `public/data/`             | 上传的图片、文件、视频等静态资源会存储在该目录 |
| `public/vendor/`           | 模块静态资源目录               |
| `vendor/modstart/modstart` | ModStart核心架构目录           |
| `resources/` | 包含了应用视图文件、本地化语言文件 |
| `storage/` | 包含了编译后的 Blade 模板、基于文件的 Session、文件缓存、日志文件等。 |



## 应用、模块、功能组

- **模块**：有比较独立的功能，代码在 `module/` 目录，每个模块一个目录，模块市场安装的模块也在该目录中。
- **应用**：和业务相关的代码不能独立成为模块复用，代码在 `app/` 目录，用于系统个性化的需求开发。
- **功能组**：位于模块目录中，常见的功能组有 `Web`、`Api`、`Admin`、`OpenApi` ，分别提供不同的分组功能

> 模块最基本要求是可复用，可以是一个**完整行业应用**，可以**纯技术框架SDK**，也可以是一个**可拆卸和安装的功能插件**，模块的定义要经过深思熟虑，避免模块的滥用。
>
> 规划开发好的模块，可以发布到模块市场上供大家付费/免费使用，共享技术成果。
>
> 开发时请按照约定的功能组



## 路由加载流程

> 通过 `ModStart\ModStartServiceProvider` 类来管理，具体的加载过程参考相关实现逻辑。

### Web 功能组

系统会按照如下的顺序加载路由文件。

- `module/Xxx/Web/routes.php`：所有模块中的Web前台路由
- `app/Web/routes.php`：系统应用Web前台路由

### Admin 功能组

系统会按照如下的顺序加载路由文件。

- `module/Xxx/Admin/routes.php`：所有模块中的Admin后台路由
- `app/Admin/routes.php`：系统应用Admin后台路由



### Api 功能组

系统会按照如下的顺序加载路由文件。

- `module/Xxx/Api/routes.php`：所有模块中的Api接口路由
- `app/Api/routes.php`：系统应用Api接口路由



### OpenApi 功能组

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

> 重要提示：通过 composer 引入第三方依赖包表示锁定版本后期不跟随 ModStart 官方进行升级系统，如需要后期跟随官方升级请参照 `模块开发 → 模块引入第三方依赖包` 进行手动引入。



## 请求会话保持机制

在Web应用程序中，我们经常要跟踪用户身份。当一个用户登录成功后，如果他继续访问其他页面，程序需要继续记录他的身份。

HTTP协议是一个无状态协议，即Web应用程序无法区分收到的两个HTTP请求是否是同一个浏览器发出的。为了跟踪用户状态，服务器可以向浏览器分配一个唯一ID，并以Cookie的形式发送到浏览器，浏览器在后续访问时总是附带此Cookie，这样，服务器就可以识别用户身份。

### Web 功能组

Web 目录中的请求，通过使用 Laravel 自带的 Session 机制，可以很方便的管理会话。后台只需要通过如下方法获取：

- `Session::get` 获取会话变量
- `Session::put` 设置会话变量
- `Session::forget` 删除会话变量

> 具体可参考 Laravel Session

### Api 功能组

Api目录中的请求，需要携带 `api-token` 请求头。

- 第一次发起请求该值留空即可，返回的响应头中会在服务端生成 `api-token` 。
- 在所有接口交互过程中，当响应头中存在 `api-token` 时，需要覆盖客户端的 `api-token` 值。
- 通常第一个请求接口无需携带 `api-token` 信息，如配置接口 `/api/config` 、登录接口 `/api/login`。

> 具体可参考 `vendor/modstart/modstart/src/App/Api/Middleware/SessionMiddleware.php`

### 如何控制 Cookie 信息

Laravel 的 Cookie 配置信息配置文件位于 `config/session.php`，具体可参考以下几个配置

- `lifetime`：会话有效期，直接控制 Cookie 的有效期，单位分钟，默认为 120 表示 2 小时
- `expire_on_close`：关闭浏览器是否立即过期
- `path`：Cookie 的 Path
- `domain`：Cookie 的 域名

## 文件上传与静态资源

### 文件本地存储

系统使用了统一的文件上传+存储方案，文件上传默认存储在 `/public/data/` 目录中，默认类型+日期进行组织，类型包括 图片（image）、视频（video）、音频（audio）、文件（file）等，具体可在 `vendor/modstart/modstart/config/data.php` 设置。

### 云存储支持

系统支持市面上主流云存储，如阿里云OSS、腾讯云COS等（[查看模块市场云存储支持](/store/list?category=2)）。

通过安装云存储模块+配置即可完成文件上云，安装云存储已上传的文件不受影响。

### 静态文件路径迁移

安装完成云存储后，可以手动迁移已上传的历史文件，通过 [文件路径迁移助手](https://modstart.com/m/DataPathMigrator) 完成数据库字段静态文件路径的迁移。

### 文件路径修正

使用默认的本地存储，文件存储路径格式为 `/data/xxx/xxx/xxx.xx` ，对于需要返回给接口需要补全为全路径，可通过以下方法完成。

```php
// 将文件路径修正为带域名的全路径，如果本身是全路径原样反馈
// 如 https://www.example.com/data/xxx/xxx/xxx.xx
\ModStart\Core\Assets\AssetsUtil::fixFull('/data/xxx/xxx/xxx.xx');
```

## 模块开发兼容性问题

为了同时兼容 Laravel 5.1 和 Laravel 9.0，PHP 写法需要同时兼容 PHP 5.x 和 PHP 8.x 的语法。除此之外，一直的框架兼容性问题如下。

### Blade 输出变量

```PHP
✅ 输出变量或默认值需要
{{ empty($param) ? '默认值' : $param }}

❌ 以下写法不兼容
{{ $param or '默认值' }} → 只兼容 Laravel 5.1
```

### Event 事件触发

```PHP
✅ 封装的兼容性事件触发
\ModStart\Core\Util\EventUtil::fire( $event )

❌ 以下写法不兼容
Event::fire( $event )
Event::dispatch( event )
```




## 名词解释

| 名词 | 说明 |
| ---- | ---- |
| `应用`  | 和业务相关的代码不能独立成为模块复用，代码在 `app/` 目录，用于系统个性化的需求开发。 |
| `模块`  | 每个模块有比较独立的功能，代码在 `module/` 目录，每个模块一个目录，模块市场安装的模块也在该目录中。 |
| `功能组`  | 位于模块目录中，常见的功能组有 `Web`、`Api`、`Admin`、`OpenApi` ，分别提供不同的分组功能 |
| `Web`  | 功能组-前台管理，处理用户前台相关功能 |
| `Admin` | 功能组-后台管理，处理后台管理相关功能 |
| `Api` | 功能组-Api接口，处理用户端前台界面、手机端、小程序等请求 |
| `OpenApi` | 功能组-OpenApi开放接口，处理系统对外提供的标准接口，通常同时AppId和AppSecret授权调用 |

