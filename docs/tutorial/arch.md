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


## 请求和响应

默认情况下，所有接口交互都采用 POST 的请求方式，页面展示采用 GET 的请求方式。

### 接口统一响应格式

响应使用统一的JSON返回

```json
{
    // 错误码，0表示业务处理正常，非0表示业务处理异常，可以定义多个状态码
    "code": 0,
    // 提示信息
    "msg": "提示信息",
    // 返回数据，根据实际业务使用定义
    "data": {
        //...
    },
    // 跳转地址
    // [js]xxxx : 表示前端执行JS代码
    // [reload] : 表示页面立即刷新 window.location.reload()
    // 其他值    : 表示跳转到改地址
    "redirect": "重定向方式"
}
```

后端代码可以使用 [Response](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/src/Core/Input/Response.php) 类统一构造该返回结果

```php
use ModStart\Core\Input\Response;
// 构造完整的返回结果
Response::generate($code, $msg, $data = null, $redirect = null);
// 构造一个成功的结果数据
Response::generateSuccessData([ 'foo'=>'bar' ]);
// 构造一个错误提示
Response::generateError('错误提示');
// 构造一个正确提示
Response::generateSuccess('正确提示');
```

> 更多使用方式请参考 [Response](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/src/Core/Input/Response.php) 类

### 默认响应错误码

在基础包 [ResponseCodes](https://gitee.com/modstart/ModStartCMS/blob/master/module/Vendor/Support/ResponseCodes.php) 中，定义了常用的响应code

```php
// api-token 为空
const API_TOKEN_EMPTY = 1000;
// 需要登录
const LOGIN_REQUIRED = 1001;
// 验证码错误
const CAPTCHA_ERROR = 1002;
// 无权限
const PERMIT_DENIED = 1003;
// 默认错误
const DEFAULT_ERROR = -1;
```

## 业务异常处理

业务异常处理使用统一的 [BizException](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/src/Core/Exception/BizException.php) 处理。

```php
use ModStart\Core\Exception\BizException;
// 抛出一个异常
BizException::throws('错误信息');
// 内容为空时并抛出异常
BizException::throwsIfEmpty('用户不存在', $user);
// 条件判断并抛出异常
BizException::throwsIf('记录不存在', empty($record));
```

使用 [BizException](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/src/Core/Exception/BizException.php) 抛出的异常，异常处理模块会自动对异常进行转换。

如果请求是 Ajax ，结果会自动转换为标准返回，如图：

```json
{
  "code":-1,
  "msg":"错误信息"
}
```



如果请求是普通页面，会转换为标准错误页面，如图：

<img src="https://ms-assets.modstart.com/data/image/2022/06/11/7355_pg5t_1938.png" style="border:1px solid #EEE;" />

## 数据库使用规范

目前使用 MySQL 作为默认数据库，创建数据库表时，请始终保持至少三个字段（主键、创建时间、更新时间）。

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateXxx extends Migration
{
    public function up()
    {
        Schema::create('resume', function (Blueprint $table) {
            // 定义数据表主键ID
            $table->increments('id');
            // 定义数据表创建时间和更新时间 created_at 和 updated_at
            $table->timestamps();
            // 其他字段
        });
    }
    // ...
}

```

- 表名：的使用 `模块名_表名`，格式为小写+下划线。

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

> 具体逻辑可参考 [SessionMiddleware.php](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/src/App/Api/Middleware/SessionMiddleware.php)。

### 如何控制 Cookie 信息

Laravel 的 Cookie 配置信息配置文件位于 `config/session.php`，具体可参考以下几个配置

- `lifetime`：会话有效期，直接控制 Cookie 的有效期，单位分钟，默认为 120 表示 2 小时
- `expire_on_close`：关闭浏览器是否立即过期
- `path`：Cookie 的 Path
- `domain`：Cookie 的 域名

### 如何关闭 Cookie 加密功能

系统默认的Cookie是加密的，如果不需要加密，可以禁用 Cookie 的加密中间件。

文件位于：`app/Http/Kernel.php`

注释掉Cookie加密中间件 `\Illuminate\Cookie\Middleware\EncryptCookies::class`

## 接口对接与联调

### Api接口对接开发

Api目录中的请求，需要携带 `api-token` 请求头。

- 第一次发起请求该值留空即可，返回的响应头中会在服务端生成 `api-token` 。
- 在所有接口交互过程中，当响应头中存在 `api-token` 时，需要覆盖客户端的 `api-token` 值。
- 通常第一个请求接口无需携带 `api-token` 信息，如配置接口 `/api/config` 、登录接口 `/api/login`。

> 具体逻辑可参考 [SessionMiddleware.php](https://gitee.com/modstart/ModStartCMS/blob/master/vendor/modstart/modstart/src/App/Api/Middleware/SessionMiddleware.php)。



## 文件上传与静态资源

### 文件本地存储

系统使用了统一的文件上传+存储方案，文件上传默认存储在 `/public/data/` 目录中，默认类型+日期进行组织，类型包括
图片（image）、视频（video）、音频（audio）、文件（file）等，具体可在 `vendor/modstart/modstart/config/data.php` 设置。

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

## 后台管理

### 后台管理员相关操作

```php
// 使用的 Admin 类完整路径为
use ModStart\Admin\Auth\Admin;
// 判断当前管理员是否已登录
Admin::isLogin();
// 当前已登录管理员的ID
$adminUserId = Admin::id();
// 根据管理员ID获取管理员信息
Admin::get( $adminUserId );
// 增加管理员信息日志
Admin::addInfoLog( $adminUserId, '日志摘要', ['数据'=>'数据值'] );
// 增加管理员错误日志
Admin::addErrorLog( $adminUserId, '错误摘要', ['数据键'=>'数据值'] );
// 如果两个数组数据不相同记录日志
Admin::addInfoLogIfChanged( $adminUserId, '数据改变了', ['数据'=>'数据值旧'], ['数据'=>'数据值新'] );
```

### 后台免登陆接口请求

- 要求：（MSCore >= 3.6.0）
- 后台接口指 `module/Xxx/Admin` 中的接口

#### 免登陆接口使用说明

系统提供了后台接口请求免登陆的功能，请求时后台接口时在http请求头中携带以下参数

|Header名称|Header值|示例值|
|:---:|:---:|:---:|
|`auth-admin-user-id`|后台管理员ID|1|
|`auth-admin-timestamp`|当前时间戳|单位为秒|
|`auth-admin-request-id`|请求ID|随机字符串，至少为10位，每次请求不同|
|`auth-admin-sign`|签名|为32位ID值，签名计算方法如下|

```php
// 管理员ID
$adminUserId = 1;
// 管理员用户名
$adminUserName = 'admin';
// 管理员密码MD5值（参考 admin_user 中的 password 字段 和 passwordSalt 字段）
$adminPassword = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
$adminPasswordSalt = 'xxxxxxxxxxx';
// 当前时间戳
$timestamp = time();
// 随机字符串，保证每次请求随机字符串不同
$requestId = uniqid();
// 拼接字符串
$md5String = "$timestamp:$requestId:$adminUserId:$adminUserName:$adminPassword:$adminPasswordSalt";
// 计算签名
$sign = md5($md5String);
```

#### 免登陆请求示例代码

```php
$adminUserId = 1;
$adminUserName = 'cms';
$adminPassword = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
$adminPasswordSalt = 'xxxxxxxxxx';
$timestamp = time();
$requestId = uniqid();
$md5String = "$timestamp:$requestId:$adminUserId:$adminUserName:$adminPassword:$adminPasswordSalt";
$sign = md5($md5String);
$ret = CurlUtil::post('http://xxx.com/admin/site/config/setting', [
    'siteName'=>'网站名称'
], [
    'header' => [
        'auth-admin-user-id' => $adminUserId,
        'auth-admin-timestamp' => $timestamp,
        'auth-admin-request-id' => $requestId,
        'auth-admin-sign' => $sign,
    ]
]);
print_r($ret);
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

