---
sidebar: false
home: true
heroImage: https://ms-assets.modstart.com/data/image/2021/09/08/23652_1f1j_9825.png
heroText: 开发者文档
actionText: 开始 →
actionLink: /guide.md
features:
- title: Laravel
  details: 简洁、优雅的Web开发框架
- title: 模块支持
  details: 内置积木式的模块管理开发
- title: 快速集成
  details: 基于标准Composer，可快速集成
footer: Copyright © 2021 ModStart
---

<p align="center">  
  <a href="https://github.com/modstart/ModStartCMS" target="_blank">
    <img alt="License Apache2.0" src="https://img.shields.io/badge/License-Apache2.0-blue">
  </a>
  <a href="https://github.com/modstart/ModStartCMS" target="_blank">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/modstart/ModStartCMS">
  </a>
  <a href="https://github.com/modstart/ModStartCMS" target="_blank">
    <img alt="GitHub last release" src="https://img.shields.io/github/v/release/modstart/ModStartCMS">
  </a>
  <br />
  <a href="https://github.com/modstart/ModStartCMS" target="_blank">
    <img alt="Laravel" src="https://img.shields.io/badge/Framework-ModStart-blue">
  </a>
  <a href="https://github.com/modstart/ModStartCMS" target="_blank">
    <img alt="Laravel" src="https://img.shields.io/badge/PHP-Laravel-red">
  </a>
  <a href="https://github.com/modstart/ModStartCMS" target="_blank">
    <img alt="Laravel" src="https://img.shields.io/badge/JS-Vue-green">
  </a>
</p>

<style type="text/css">
    .home .hero img{
        height:120px;
    }
</style>

<p align="center" style="font-size:30px;font-weight:bold;">
    增删改查，一气呵成
</p>

```php
class NewsController extends Controller
{
    use HasAdminQuickCRUD;
    protected function crud(AdminCRUDBuilder $builder)
    {
        $builder
            ->init('news')
            ->field(function ($builder) {
                $builder->id('id','ID');
                $builder->text('title', '名称');
                $builder->richHtml('content', '内容');
                $builder->display('created_at', '创建时间');
                $builder->display('updated_at', '更新时间');
            })
            ->gridFilter(function (GridFilter $filter) {
                $filter->eq('id', 'ID');
                $filter->like('title', '标题');
            })
            ->title('新闻管理');
    }
}
```

<p align="center" style="font-size:30px;font-weight:bold;">
    模块市场，共建共享
</p>


<p align="center"><img style="max-width:800px;width:100%;" src="https://ms-assets.modstart.com/data/image/2021/09/25/30055_qizj_4881.gif" /></p>


<p align="center" style="font-size:30px;font-weight:bold;">
    加入我们，共同进步
</p>

<p align="center" class="text-align:center;">
  <img width="200" src="https://ms-assets.modstart.com/data/image/2021/09/25/29009_zsm8_2437.png" />
</p>
