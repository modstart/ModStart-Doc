# 模块架构

## 模块目录介绍

```
SomeName
├── Admin                                → 后台管理
├── Api                                  → API接口
├── Constant                             → 常量
├── Core                                 → 核心资源
│     └── ModuleServiceProvider.php      → 模块核心ServiceProvider，会自动被系统加载
├── Docs                                 → 模块文档目录
│     ├── doc                            → 模块使用文档
│     ├── module                         → 模块说明文档
│     └── release                        → 模块Release日志
├── Migrate                              → 模块数据库迁移文件
├── Util                                 → 模块工具包
├── View                                 → 模块视图
├── Web                                  → 模块前台 
├── config.json                          → 模块配置文件
└── resources                            → 模块其他资源文件
```

## 配置文件 config.json

配置文件是一个合法的JSON，请勿在JSON中包含注释，以下为了参数含义会在JSON中包含注释

```json
{
  // 模块唯一标示，请使用 SomeExampleName 首字母大写的驼峰命名方式
  // 如果您的模块后期需要发布到模块市场，在开发前请先创建模块，防止与他人冲突
  "name": "Demo",
  // 模块文字说明
  "title": "开发示例程序",
  // 兼容环境，可选值为 laravel5、laravel9 ，默认为 laravel5
  "env": [ "laravel5", "laravel9" ],
  // 模块类型，可以包含多个，目前支持以下值
  // PC:        电脑版
  // Mobile:    手机H5
  // App:       手机APP
  // MiniApp:   小程序
  // WxMiniApp: 微信小程序
  // Theme:     模板主题
  // Admin:     后台管理
  "types": [
    "PC",
    "Mobile"
  ],
  // 当前模块版本号，请使用 主版本号.次版本号.修复版本号 的格式
  // 大的迭代请升级主版本号，常规次二代升级次版本号，Bug修复升级修复版本号
  "version": "1.2.0",
  // 模块依赖，支持多个
  "require": [
    // 依赖 Vendor 模块任何版本
    "Vendor",
    // 依赖 Abc 模块任何版本 
    "Abc:*",
    // 依赖 Abc 模块大于等于1.1.0的版本
    "Abc:>=1.1.0",
    // 依赖 Abc 模块大于1.1.0的版本
    "Abc:>1.1.0",
    // 依赖 Abc 模块小于等于1.1.0的版本 
    "Abc:<=1.1.0",
    // 依赖 Abc 模块小于1.1.0的版本 
    "Abc:<1.1.0",
    // 依赖 Abc 模块1.1.0的版本，其他任何版本都不匹配
    "Abc:==1.1.0"
  ],
  // 模块依赖的 ModStart 核心版本，可以通过 \ModStart\ModStart::$version 获取ModStart核心版本号
  "modstartVersion": "*",
  // 模块作者
  "author": "ModStart",
  // 模块描述
  "description": "ModStart开发示例程序",
  // 模块可配置项，可在程序中通过如下方法获取配置信息
  // \ModStart\Module\ModuleManager::getModuleConfig('模块名','配置名')
  "config": {
    // 定义一个名称为 testText 的文本参数
    "testText": [
      [
        "text",
        "文字参数"
      ]
    ],
    // 定义一个名称为 testEnable 的开关
    "testEnable": [
      [
        "switch",
        "功能启用"
      ]
    ],
    // 定义一个名称为 testSelect 的下拉选项，包含两个选项
    "testSelect": [
      [
        "select",
        "下拉选择"
      ],
      [
        "options",
        {
          "key1": "选项1",
          "key2": "选项2"
        }
      ]
    ]
  }
}
```

## 后台导航菜单注册

在 `Core/ModuleServiceProvider.php` 中配置，通过如下方式注册菜单：

```php
AdminMenu::register(function () {
    return [
        [
            'title' => '一级菜单',
            'icon' => 'tools',
            'sort' => 150,
            'children' => [
                [
                    'title' => '二级菜单',
                    'url' => '\XxxController@index',
                ]
            ]
        ],
        [
            'title' => '一级菜单',
            'icon' => 'tools',
            'sort' => 150,
            'children' => [
                [
                    'title' => '二级菜单',
                    'children' => [
                        [
                            'title' => '三级菜单',
                            'url' => '\XxxController@index',
                        ],
                        [
                            'title' => '三级菜单',
                            'url' => '\XxxController@index',
                        ]
                    ],
                ]
            ]
        ],
    ];
});
```

ModStart系统按照如下相同的规则进行菜单合并：

- 一级菜单（title+icon+sort）
- 二级菜单（title）

## 后台导航菜单使用规范

> 我们强烈建议您按照系统推荐的方式组织菜单避免用户安装多个模块后系统菜单变得混乱。

- 独立的业务功能模块可以插入一级菜单，用于管理模块涉及的业务功能
- 物料类、工具类的模块使用二级或三级菜单
- 菜单由上至下应遵循使用频率递减的特性

系统内置了如下的菜单大类组织方式，强烈建议您遵守如下约定。

| 目录内容      | 排序（sort值） | 图标（icon） | 说明                             |
| ------------- | -------------- | ------------ | -------------------------------- |
| 用户管理      | 100            | users        | 用户管理模块                     |
| \|-- 用户管理 |                |              |                                  |
| \|-- ...      |                |              |                                  |
| 物料管理      | 200            | description  | 系统基础物料管理                 |
| \|-- 导航配置 |                |              |                                  |
| \|-- 文章管理 |                |              |                                  |
| \|-- 友情链接 |                |              |                                  |
| \|-- ...      |                |              |                                  |
| 功能设置      | 300            | tools        | 模块业务功能相关的设置           |
| \|-- 用户设置 |                |              |                                  |
| \|-- ...      |                |              |                                  |
| 系统设置      | 400            | cog          | 技术相关配置                 |
| \|-- 基础配置 |                |              |                                  |
| \|-- 短信设置 |                |              |                                  |
| \|-- 支付设置 |                |              |                                  |
| \|-- ...      |                |              |                                  |
| 后台权限      | 500            | user-o       | 管理员、角色、管理日志           |
| \|-- 管理角色 |                |              |                                  |
| \|-- 管理账号 |                |              |                                  |
| \|-- 管理日志 |                |              |                                  |
| 运维工具      | 600            | magic-wand   | 系统运维阶段功能模块             |
| \|-- ...      |                |              |                                  |
| 系统管理      | 700            | code-alt     | 系统功能管理（通常用于开发阶段） |
| \|-- 模块管理 |                |              |                                  |

## 控制台命令

###  安装 module-install

```shell
php artisan modstart:module-install {module} {--force}
```

### 卸载 module-uninstall

```shell
php artisan modstart:module-uninstall {module}
```

### 启用 module-enable

```shell
php artisan modstart:module-enable {module}
```

### 禁用 module-disable

```shell
php artisan modstart:module-disable {module}
```

### 安装全部 module-install-all

```shell
php artisan modstart:module-install-all
```

一条命令安装全部模块，该命令会计算模块的依赖顺序，按照顺序依次安装。

## 接口文档注解

使用注解可以在模块打包时生成接口文档，一个接口文档注解示例如下

```php
/**
 * @Api 新闻
 */
class NewsController extends Controller
{
  /**
   * @Api 新闻分页
   * @ApiBodyParam search.categoryId int 新闻分类ID
   * @ApiResponseData {
   *  "total": 1,
   *  "page" : 1,
   *  "pageSize": 10,
   *  "records": [
   *      {
   *        "id":1,
   *        "categoryId":1,
   *        "title":"标题",
   *        "summary":"摘要",
   *        "content":"内容"
   *      }
   *  ]
   * }
   */
  public function paginate()
  {
     // ...
  }
}
```

### 类注解

- 接口分组：`@Api 分组`

### 方法注解

- 接口名称：`@Api 名称`
- 接口说明：`@ApiDesc 接口说明`
- 接口请求方式：`@ApiMethod post|get`
- 接口请求格式：`@ApiDataType json|formData`
- 接口请求头：`@ApiHeadParam api-token string required 参数说明`
- 接口请求Body参数：`@ApiBodyParam bizId int required 企业ID`
- 接口请求Query参数：`@ApiQueryParam bizId int required 企业ID`
- 接口返回Code特殊值：`@ApiResponseCode 10000 用户未登录`
- 接口返回Data内容格式：`@ApiResponseData { }`

## 工具类注解

使用注解可以在模块打包时生成工具类使用文档，一个工具类文档注解示例如下

```php
/**
 * Class MCms
 *
 * @Util CMS操作
 */
class TestUtil
{
  /**
   * @Util 获取栏目
   * @param $catUrl string 栏目URL
   * @return array
   */
  public static function getCatByUrl($catUrl)
  {
     // ...
  }
}
```

### 类注解

- 工具类分组：`@Util 分组`

### 方法注解

- 名称：`@Util 名称`
- 参数：`@param $name string 说明`
- 返回：`@return array`
