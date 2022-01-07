# 系统架构

ModStart 基于原生 Laravel 开发，独创了方便易扩展的模块开发架构，通过配置式的开发过程，可以快速实现系统搭建。

## 系统代码结构

系统代码结构参照 Laravel 的目录结构，对于部分不同的重要目录构成，以下做简单介绍。

```
ROOT
├── app                    → 应用目录
│     ├── Admin            → 后台管理源码目录
│     ├── Api              → API程序源码目录
│     └── Web              → 前台程序源码目录
├── module                 → 模块源码，模块源码都会放在该目录下，每个模块一个文件夹
│     ├── Xxx              → 其他模块
│     └── Vendor           → 模块基础代码
├── vendor                 → 
│     └── modstart         → 
│           └── modstart   → ModStart核心架构目录
└── resources              → 资源目录
      └── views            → 视图目录
            └── default    → 默认模板视图目录
```

其中模块相关目录结构可以参考 [模块目录结构](./../manual/module.html)。

## 应用和模块区别

**模块**

模块包含在 `module/` 目录中，每个模块拥有单独的目录，并且包含独立的 Admin、Web、Api、OpenApi 等功能。

对于可复用的模块，我们推荐创建独立的模块进行最大程度而复用，同时还可以发布到模块市场。

模块市场安装的模块也会出现在 `module/` 目录中。

**应用**

应用包含在 `app/` 目录中，包含独立的 Admin、Web、Api、OpenApi 等功能。

对于系统个性化的功能，一般不推荐放在模块目录中，可以放在应用目录中，用于开发系统个性化的需求开发。

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


## 名词解释

| 名词 | 含义 | 备注 |
| ---- | ---- | ---- |
| Web  | 前台管理 | 用户处理用户前台相关功能 |
| Admin | 后台管理 | 用于处理后台管理相关功能 |
| Api | Api接口 | 用于处理用户端前台界面、手机端、小程序等请求 |
| OpenApi | OpenApi开放接口 | 用户处理系统对外提供的标准接口，通常同时AppId和AppSecret授权 |
