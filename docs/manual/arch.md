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


## 名词解释

| 名词 | 含义 | 备注 |
| ---- | ---- | ---- |
| Web  | 前台管理 | 用户处理用户前台相关功能 |
| Admin | 后台管理 | 用于处理后台管理相关功能 |
| Api | Api接口 | 用于处理用户端前台界面、手机端、小程序等请求 |
| OpenApi | OpenApi开放接口 | 用户处理系统对外提供的标准接口，通常同时AppId和AppSecret授权调用 |



