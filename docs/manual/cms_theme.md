# 主题开发教程

模板主题是一个模块，以 `CmsTheme` 开头，如 `CmsThemeBlue`、`CmsThemeGreen` 等。



## 主题模块结构

```
CmsThemeMyTest
├── Admin
│     ├── Controller
│     │     └── ConfigController.php             → 后台配置文件
│     └── routes.php
├── Asset                                        → 主题资源文件
│     ├── css
│     │     └── theme.css
│     └── js
│         └── theme.js
├── Core
│     └── ModuleServiceProvider.php              → 模块核心注册器
├── Docs                                         → 模块文档
│     ├── doc
│     │     └── Manual.md
│     ├── module
│     │     ├── content.md
│     │     ├── demo.md
│     │     ├── mobilePreview.md
│     │     └── preview.md
│     └── release
│         └── 1.0.0.md
├── Provider
│     └── ThemeSiteTemplateProvider.php         → 主题注册器
├── View                                        → 模块视图主目录
│     └── pc                                    → 自适应默认为PC
│         ├── cms
│         │     ├── list                        → 列表视图
│         │     │     ├── cases.blade.php
│         │     │     ├── default.blade.php
│         │     │     ├── job.blade.php
│         │     │     ├── news.blade.php
│         │     │     └── product.blade.php
│         │     ├── detail                      → 详情视图
│         │     │     ├── cases.blade.php
│         │     │     ├── default.blade.php
│         │     │     ├── job.blade.php
│         │     │     ├── news.blade.php
│         │     │     └── product.blade.php
│         │     ├── form                        → 表单视图
│         │     │     └── default.blade.php
│         │     ├── page                        → 单页视图
│         │     │     └── default.blade.php
│         │     ├── index.blade.php
│         ├── footer.blade.php
│         ├── frame.blade.php                   → 模板框架视图
│         └── header.blade.php
├── config.json                                 → 模块配置文件
└── demo_data.php                               → 演示数据初始化
```

## 视图数据实体

### 栏目Cat

```json
{
  "id": 5,
  "created_at": "2021-11-02 20:53:18",
  "updated_at": "2021-12-19 10:03:07",
  "pid": 0,
  "sort": 0,
  "title": "新闻资讯",
  "url": "news",
  "modelId": 9,
  "listTemplate": "news.blade.php",
  "detailTemplate": "news.blade.php",
  "seoTitle": "11",
  "seoDescription": "22",
  "seoKeywords": "33",
  "icon": "",
  "cover": "",
  "subTitle": "为广大企业提供更加轻便、高效、经济的人力资源服务",
  "bannerBg": "",
  "pageTemplate": null,
  "formTemplate": null,
  "_model": {
    "id": 9,
    "created_at": "2021-11-02 20:42:42",
    "updated_at": "2021-12-19 10:03:07",
    "title": "新闻咨询",
    "name": "news",
    "detailTemplate": "news.blade.php",
    "listTemplate": "news.blade.php",
    "pageTemplate": null,
    "mode": 1,
    "formTemplate": null,
    "_customFields": []
  }
}
```

### 内容ContentSimple

```json
{
  "id": 102,
  "created_at": "2021-12-20 10:54:03",
  "updated_at": "2021-12-20 10:54:03",
  "catId": 5,
  "modelId": 9,
  "alias": null,
  "title": "2020整体橱柜十大品牌排行榜",
  "summary": "这是2020年评选出来的橱柜十大品牌排行榜，小编对这个排行没有意见，只是仁者见仁，智者见智，排行自有一定的道理，至于其中有什么",
  "cover": "vendor/image/news-3.jpg",
  "postTime": "2021-01-01 00:00:20",
  "wordCount": null,
  "viewCount": null,
  "status": 1,
  "commentCount": null,
  "likeCount": null,
  "isRecommend": 1,
  "isTop": null,
  "tags": [],
  "author": null,
  "source": null,
  "seoTitle": null,
  "seoDescription": null,
  "seoKeywords": null,
  "_url": "/a/102",
  "_day": "2021-01-01"
}
```

### 内容Content

```json
{
  "id": 102,
  "created_at": "2021-12-20 10:54:03",
  "updated_at": "2021-12-20 10:54:03",
  "catId": 5,
  "modelId": 9,
  "alias": null,
  "title": "2020整体橱柜十大品牌排行榜",
  "summary": "这是2020年评选出来的橱柜十大品牌排行榜，小编对这个排行没有意见，只是仁者见仁，智者见智，排行自有一定的道理，至于其中有什么",
  "cover": "vendor/image/news-3.jpg",
  "postTime": "2021-01-01 00:00:20",
  "wordCount": null,
  "viewCount": null,
  "status": 1,
  "commentCount": null,
  "likeCount": null,
  "isRecommend": 1,
  "isTop": null,
  "tags": null,
  "author": null,
  "source": null,
  "seoTitle": null,
  "seoDescription": null,
  "seoKeywords": null,
  "_tags": [],
  "_data": {
    "id": 102,
    "created_at": "2021-12-20 10:54:03",
    "updated_at": "2021-12-20 10:54:03",
    "content": "<p>橱柜生产企业也由94年的20多家发展到现在的3000多家，规模企业100多家，行业前50家销售额占全行业的30％以上。也因此在橱柜行业内涌现出一批优秀的企业和品牌。</p>\n<p>但是关于中国橱柜十大品牌评选的版本却有很多，但是不管是由谁提出的什么版本，关键是要用重要数据说话。以品牌知名度、质量标准、产品研发、生产能力、销售规模、品牌口碑、可持续发展能力等方面综合来评定才有足够说服力。质量标量是一个知名品牌的生命力，产品研发、生产能力、销售规模、可持续发展能力是一个知名品牌的发展力，品牌知名度、品牌口碑是一个知名品牌的影响力。</p>\n<p>2018年从品牌知名度、质量标准、产品研发、生产能力、销售规模、品牌口碑、可持续发展能力等方面综合评定出的中国橱柜十大品牌名单榜中榜上，皮阿诺排列其中，但是，如果单纯以橱柜终端实际网点，实际销售额来评估，皮阿诺凭借700家终端专卖店和售后服务中心可以位列十大橱柜品牌之首，而在新近由腾讯举办的网友“十大橱柜品牌评选”活动中，皮阿诺更是以高票位居三甲。</p>"
  }
```

### 模型Model

```json
{
  "id": 9,
  "created_at": "2021-11-02 20:42:42",
  "updated_at": "2021-12-19 10:03:07",
  "title": "新闻咨询",
  "name": "news",
  "detailTemplate": "news.blade.php",
  "listTemplate": "news.blade.php",
  "pageTemplate": null,
  "mode": 1,
  "formTemplate": null,
  "_customFields": [
    {
      "id": 19,
      "created_at": "2021-12-19 15:48:57",
      "updated_at": "2021-12-19 15:48:57",
      "modelId": 20,
      "sort": 1,
      "title": "手机",
      "name": "phone",
      "fieldType": "text",
      "fieldData": [],
      "isRequired": 0,
      "isSearch": 0,
      "isList": 0,
      "placeholder": null,
      "listTemplate": null,
      "showTemplate": null,
      "maxLength": 100
    },
    {
      "id": 20,
      "created_at": "2021-12-19 15:48:57",
      "updated_at": "2021-12-19 15:48:57",
      "modelId": 20,
      "sort": 2,
      "title": "姓名",
      "name": "name",
      "fieldType": "text",
      "fieldData": [],
      "isRequired": 0,
      "isSearch": 0,
      "isList": 0,
      "placeholder": null,
      "listTemplate": null,
      "showTemplate": null,
      "maxLength": 100
    }
  ]
}
```

## 列表视图

### 内置变量 cat

当前栏目信息，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catChildren

当前栏目的子栏目，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

### 内置变量 catRoot

当前栏目的根级栏目视图，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRootChildren

当前栏目的根级栏目视图子栏目，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

### 内置变量 catChain

当前栏目从根栏目到当前栏目的链路，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

### 内置变量 records

当前栏目数据列表，为`ContentSimple`数组，数据结构参考  [ContentSimple](#内容contentsimple)

### 内置变量 pageHtml

当前列表分页HTML数据

```html

<div class="pages">
    <a href="?page=1">1</a>
    <span>2</span>
    <a href="?page=1">3</a>
</div>
```

## 详情视图

### 内置变量 record

当前显示内容，数据结构参考 [内容Content](#内容content)

### 内置变量 cat

当前栏目信息，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRoot

当前栏目的根级栏目视图，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRootChildren

当前栏目的根级栏目视图子栏目，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

### 内置变量 catChain

当前栏目从根栏目到当前栏目的链路，为`Cat`数组，数据结构参考  [Cat](#栏目cat)

### 内置变量 model

当前显示内容的模型，数据结构参考 [模型Model](#模型model)

## 单页视图

### 内置变量 record

当前显示内容，数据结构参考 [内容Content](#内容content)

### 内置变量 cat

当前栏目信息，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRoot

当前栏目的根级栏目视图，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRootChildren

当前栏目的根级栏目视图子栏目，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

### 内置变量 catChain

当前栏目从根栏目到当前栏目的链路，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

## 表单视图

### 内置变量 cat

当前栏目信息，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRoot

当前栏目的根级栏目视图，数据结构结构参考 [栏目Cat](#栏目cat)

### 内置变量 catRootChildren

当前栏目的根级栏目视图子栏目，为`栏目Cat`数组，数据结构参考  [栏目Cat](#栏目cat)

### 内置变量 catChain

当前栏目从根栏目到当前栏目的链路，为`Cat`数组，数据结构参考  [Cat](#栏目cat)

### 内置变量 model

当前显示内容的模型，数据结构参考 [模型Model](#模型model)

## CMS操作方法

### 列表 listCatByUrl

根据栏目URL获取内容列表（不包含副表字段），包含子栏目

```php
\MCms::listCatByUrl($catUrl, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
[
    {
        "id": 1,
        "title": "xxx",
        // ...
    },
    // ...
]
```

### 列表 listCat

根据栏目ID获取内容列表（不包含副表字段），包含子栏目

```php
\MCms::listCat($catId, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
[
    {
        "id": 1,
        "title": "xxx",
        // ...
    },
    // ...
]
```

### 列表 pageCat

根据栏目ID获取内容列表（不包含副表字段），包含子栏目

```php
\MCms::pageCat($catId, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
{
    "total": 10,
    "records": [
        {
            "id": 1,
            "title": "xxx",
            // ...
        },
        // ...
    ]
}
```

### 列表 pageCatByUrl

根据栏目URL获取内容列表（不包含副表字段），包含子栏目

```php
\MCms::pageCatByUrl($catUrl, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
{
    "total": 10,
    "records": [
        {
            "id": 1,
            "title": "xxx",
            // ...
        },
        // ...
    ]
}
```

### 列表 pageCatWithData

根据栏目ID获取内容列表（包含副表字段），不包含子栏目

```php
\MCms::pageCatWithData($catId, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
{
    "total": 10,
    "records": [
        {
            "id": 1,
            "title": "xxx",
            // ...
        },
        // ...
    ]
}
```

### 列表 pageCatWithDataByUrl

根据栏目URL获取内容列表（包含副表字段），不包含子栏目

```php
\MCms::pageCatWithDataByUrl($catUrl, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
{
    "total": 10,
    "records": [
        {
            "id": 1,
            "title": "xxx",
            // ...
        },
        // ...
    ]
}
```

### 列表 pageCatsWithData

根据多个栏目ID获取内容列表（包含副表字段），不包含子栏目，多个栏目必须为相同的模型

```php
\MCms::pageCatsWithData($catIds, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
{
    "total": 10,
    "records": [
        {
            "id": 1,
            "title": "xxx",
            // ...
        },
        // ...
    ]
}
```

### 列表 pageCatWithDataByUrl

根据多个栏目URL获取列表（包含副表字段），不包含子栏目，多个栏目必须为相同的模型

```php
\MCms::pageCatsWithDataByUrl($catUrls, $page = 1, $pageSize = 10, $option = [])
```

返回数据结构

```json
{
    "total": 10,
    "records": [
        {
            "id": 1,
            "title": "xxx",
            // ...
        },
        // ...
    ]
}
```

### 列表 latestCat

根据栏目ID获取最新内容列表（不包含副表字段），包含子目录，

```php
\MCms::latestCat($catId, $limit = 10)
```

返回数据结构

```json
[
    {
        "id": 1,
        "title": "xxx",
        // ...
    },
    // ...
]
```

### 列表条件检索

列表带查询条件时，需要自定义 `$option` 参数，对所有列表获取方法均适用

```php
// 精确匹配
$option = [
    'where' => [
        'title' => '阿里巴巴',
        'source' => '网络',
    ],
];
// 复杂匹配
$option = [
    'whereOperate'=>[
        // 模糊匹配
        ['title','like','%阿里巴巴%'],
        // 范围
        ['postTime','>=','2021-01-01 00:00:00'],
    ]
];
// 自定义排序
$option = [
    'order'=>[
        ['id','desc']
    ]
];
// 列表默认按照以下排序
$option = [
    'order'=>[
        ['isTop', 'desc'],
        ['isRecommend', 'desc'],
        ['postTime', 'desc'],
    ]
];
```


### 栏目上一条内容 prevOne

获取上一条记录

```php
\MCms::prevOne($catId, $recordId)
```

### 栏目下一条内容 nextOne

获取下一条记录

```php
\MCms::nextOne($catId, $recordId)
```

### 友情链接 MPartner::all

按照位置获取所有友情链接数据

```php
\MPartner::all($position = 'home');
```

### 导航 MNav:all

按照位置获取所有导航数据

```php
\MNav::all($position = 'home');
```

### 轮播 MBanner:all

按照位置获取所有轮播数据

```php
\MPartner::all($position = 'home')
```

## 演示数据

一个优秀的模板需要携带完整的演示数据，这样可以方便快捷的让用户快速的看到主题最终效果。

### 演示数据开启

CMS集成了演示数据初始化填充功能，只需要简单的配置即可完成。

在对应的模板设置页面（如  `功能设置 → 模板设置 → CMS开发测试模板`），用户点击初始化演示数据，勾选需要初始化的数据，即可完成数据填充。

![演示1](https://ms-assets.modstart.com/data/image/2021/12/20/21345_ftab_8456.jpg)

![演示2](https://ms-assets.modstart.com/data/image/2021/12/20/21346_0pkp_7464.jpg)

### 演示数据参考配置

数据参考配置位于模块根目录下的，如 `module/CmsThemeMyTest/demo_data.php`

```php
<?php
return [
    'tables' => [
        'banner' => [
            'where' => [
                'position' => 'home',
            ],
            'records' => [
                [
                    'type' => \Module\Banner\Type\BannerType::IMAGE,
                    'image' => 'vendor/CmsThemeMyTest/image/banner-1.jpg',
                ],
                // ...
            ]
        ],
        'news' => [
            'records' => [
                [
                    'title' => '演示新闻标题',
                    'cover' => 'vendor/CmsThemeMyTest/image/news-1.jpg',
                    'summary' => '演示新闻描述',
                    '_data' => [
                        'content' => '<p>演示新闻内容</p>',
                    ]
                ],
                // ...
            ]
        ],
        'product' => [
            'records' => [
                [
                    'title' => '演示产品',
                    'cover' => 'vendor/CmsThemeMyTest/image/product-1.jpg',
                ],
                // ...
            ]
        ],
        'cases' => [
            'records' => [
                [
                    'title' => '演示案例',
                    'cover' => 'vendor/CmsThemeMyTest/image/cases-1.jpg',
                ],
                // ...
            ]
        ],
        'job' => [
            'records' => [
                [
                    'title' => '演示招聘',
                    '_data' => [
                        'content' => '<p>演示招聘说明</p>',
                    ]
                ]
            ]
        ],
        'nav' => [
            'where' => [
                'position' => 'head',
            ],
            'records' => [
                [
                    'name' => '产品',
                    'link' => modstart_web_url('product'),
                ],
                // ...
            ],
        ],
        'info' => [
            'records' => [
                'Cms_HomeInfoImage' => 'vendor/CmsThemeMyTest/image/about.jpg',
                'Cms_HomeInfoTitle' => '演示公司名称',
                'Cms_HomeInfoContent' => '<p>演示公司介绍。</p>',
            ]
        ],
    ],
];
```

## 常用问题

### 页面标题、关键词、描述调用

```html
@section('pageTitle')页面标题@endsection
@section('pageKeywords')页面关键词@endsection
@section('pageDescription')页面关键词@endsection
```
