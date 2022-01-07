# 模块开发

## 模块开发介绍

在开发模块之前，请在模块市场自行安装《开发示例程序》，该示例中涵盖了几乎所有模块开发规范和技巧。

> 开发示例程序： [https://modstart.com/m/Demo](https://modstart.com/m/Demo)
>
>  开发示例程序会不断更新，请随时查看最新的开发示例程序。

## 模块开发入门

#### 第一步，下载模块开发助手

模块开发助手可以极大效率的提高模块开发效率，通过 [https://modstart.com/m/ModuleDeveloper](https://modstart.com/m/ModuleDeveloper) 下载。

#### 第二步，使用模块开发助手创建模块

访问 系统管理 → 模块开发助手，通过常用工具创建模块

![模块创建](https://ms-assets.modstart.com/data/image/2021/12/17/31613_esmy_3179.jpg)

#### 第三步，完成模块代码开发

第二步会根据填写的模块基本信息完成模块的创建，并且生成一些示例代码，通过修改和完善模块代码，完成模块的功能开发

![模块示例代码](https://ms-assets.modstart.com/data/image/2021/12/17/31874_agbl_4387.jpg)

#### 第四步，模块打包上传到模块市场

如果您开发的模块需要上传分享到模块市场，按照如下步骤完成模块分享。

1. 注册ModStart账号：访问 [https://modstart.com](https://modstart.com) 完成账号注册
2. 实名认证：在用户中心完成用户实名认证
3. 创建模块：认证完成后，在用户中心访问开发者中心，完成模块的创建
4. 打包上传：返回到本地的模块开发助手，登录ModStart账号，在对应开发的模块中点击发布
5. 模块审核上线：发布成功后，需要后台审核模块，完成审核后模块即可显示在模块市场。

![模块打包上传](https://ms-assets.modstart.com/data/image/2021/09/25/30055_qizj_4881.gif)


## 模块目录介绍

### 模块详细目录介绍

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

### 配置文件 config.json

配置文件是一个合法的JSON，请勿在JSON中包含注释，以下为了参数含义会在JSON中包含注释

```json
{
  // 模块唯一标示，请使用 SomeExampleName 首字母大写的驼峰命名方式
  // 如果您的模块后期需要发布到模块市场，在开发前请先创建模块，防止与他人冲突
  "name": "Demo",
  // 模块文字说明
  "title": "开发示例程序",
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


## Web前台开发 

前台代码 Routes、Controller 都应放在 `Web` 目录中。

## Admin后台开发

前台代码 Routes、Controller 都应放在 `Admin` 目录中。

### 注册后台菜单

在 `Core/ModuleServiceProvider.php` 中配置，通过如下方式注册菜单：

```php
<?php
AdminMenu::register(function(){
    return [
       'menu' => [
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
           ]
       ]
   ];
});
```

ModStart系统按照如下相同的规则进行菜单合并：

- 一级菜单（title+icon+sort）
- 二级菜单（title）

### 菜单使用规范

> 我们强烈建议您按照系统推荐的方式组织菜单避免用户安装多个模块后系统菜单变得混乱。

- 大的业务功能模块可以插入一级菜单，用于管理模块涉及的业务功能
- 物料类、工具类的模块使用二级或三级菜单
- 菜单由上至下应遵循使用频率递减的特性

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
| 系统设置      | 400            | cog          | 技术功能相关设置                 |
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

## Api接口开发

前台代码 Routes、Controller 都应放在 `Api` 目录中。

## OpenApi开放接口开发 

前台代码 Routes、Controller 都应放在 `OpenApi` 目录中。

## 开发技巧

### Api接口代码的复用

为了最大限度的敏捷开发，可以在 `Web`、`OpenApi`、`Admin` 中最大程度的复用 `Api` 代码。
