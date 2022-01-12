# 系统主题


ModStart所有系统使用了系统配置表 `config` 中的 `siteTemplate` 变量，默认使用 `default` 变量。

- 系统视图根目录：`resources/views/theme/`
- 模块视图根目录：`module/Xxx/View/`

## 视图渲染查找顺序

主题的视图文件（ `.blade.php` 结尾）可能出现在多个位置，系统在渲染视图的时候会按照以下优先级查找直到匹配成功：

1. 启用主题自定义视图目录：如 `resources/views/theme/myTest`
2. 当前模块视图目录：如 `module/Cms/View`
3. 系统默认视图目录：如 `resources/views/theme/default`

> 举例说明：
> 当前系统启用 myTest 主题。
> 在 Xxx 模块的列表页面调用 $this->view('test.list.news')返回视图文件，
> 系统会按照如下顺序进行视图文件的查找：
> - resources/views/theme/myTest/pc/test/list/news.blade.php
> - module/Xxx/View/pc/test/list/news.blade.php
> - resources/views/theme/default/pc/test/list/news.blade.php


## 自适应的设备视图

ModStart的View根据访问设备的不同，会启用不同的视图文件，具体逻辑可参照 `\ModStart\Core\View\ResponsiveViewTrait` 中的逻辑。

- PC端使用 `pc/` 中的视图
- 手机端使用 `m/` 中的视图
- 当手机端视图不存在时，会自动降级使用 `pc/` 中的视图


## 定义一个视图例子

```html
@extends($_viewFrame)
@section('pageTitleMain')我的视图标题@endsection
@section('bodyContent')
    <div class="ub-container">
        我的视图文件
    </div>
@endsection
```

其中：

- `$_viewFrame` 变量表示当前系统使用的框架视图
- `@section('pageTitleMain')` 为系统标题
- `@section('bodyContent')` 为系统正文内容部分

## 网站主色调

```css
:root {
  --theme-color-primary: #698af4;
  --theme-color-primary-dark: #99aff7;
  --theme-color-primary-light: #3965f1;
}
```

为了适配不同行业和场景，系统的主色调使用了全局css变量，可以通过上述方式强制使用主题色，或后台配置主题色。

