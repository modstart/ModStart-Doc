# Hook


Hook是用于在指定位置调用代码，可以用来代码插件式的输出，方便开发更多的模块。

## 使用方式

比如在页面的尾部输出一行代码，可以在 `ModuleServiceProvider` 中这样实现：

```php
\ModStart\Core\Hook\ModStartHook::subscribe('PageBodyAppend', function () {
    return '在Body尾部输出一行代码';
});
```

## 目前已支持的Hook


| 名称      | 说明                             |
| -------------    | -------------------------------- |
| `PageHeadAppend` | 自适应页面 `<head>` 标签尾部（包括弹窗） |
| `PageBodyAppend` | 自适应页面 `<body>` 标签尾部（包括弹窗） |
| `DialogPageHeadAppend` | 自适应弹窗页面 `<head>` 标签尾部（包括弹窗） |
| `DialogPageBodyAppend` | 自适应弹窗页面 `<body>` 标签尾部（包括弹窗） |
| `MobilePageHeadAppend` | 手机页面 `<head>` 标签尾部 |
| `MobilePageBodyAppend` | 手机页面 `<body>` 标签尾部 |
| `AdminPageHeadAppend` | 后台管理页面 `<head>` 标签尾部（已登录，包括弹窗） |
| `AdminPageBodyAppend` | 后台管理页面 `<body>` 标签尾部（已登录，包括弹窗） |
| `AdminLoginHeadAppend` | 管理员登录页面 `<head>` 标签尾部 |
| `AdminLoginBodyAppend` | 管理员登录页面 `<body>` 标签尾部 |

> 如果您是模块开发者：模块中的Hook应该在模块的说明
