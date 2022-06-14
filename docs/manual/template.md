# 系统主题


系统默认主题为 `default` 可以通过 `modstart_config('siteTemplate')` 获取系统当前主题。

- 系统视图根目录：`resources/views/theme/`
- 主题模块的视图根目录通常位于：`module/Xxx/View/`



## 如何开发主题模块



第一步，实现一个主题模块提供者

```php
<?php
namespace Module\MyTestTheme\Core;

use Module\Vendor\Provider\SiteTemplate\AbstractSiteTemplateProvider;

class ThemeSiteTemplateProvider extends AbstractSiteTemplateProvider
{
    const NAME = 'myTestTheme';

    public function name()
    {
        return self::NAME;
    }

    public function title()
    {
        return '我的测试主题';
    }

    public function root()
    {
        return 'module::MyTestTheme.View';
    }

}
```

第二步，注册主题模块到系统中

```php
<?php
namespace Module\MyTestTheme\Core;

use Illuminate\Events\Dispatcher;
use Illuminate\Support\ServiceProvider;
use Module\Vendor\Provider\SiteTemplate\SiteTemplateProvider;

class ModuleServiceProvider extends ServiceProvider
{
    public function boot(Dispatcher $events)
    {
        SiteTemplateProvider::register(ThemeSiteTemplateProvider::class);
    }
}
```

第三步，按照需要提供的视图结构完成视图开发

> 如，Xxx 模块中调用了 `$this->view('news.list')` 来渲染视图，如果需要重新覆盖这个页面，复制当前页面视图文件（通常位于 `module/Xxx/View/pc/news/list.blade.php`）放到 `module/MyTestTheme/View/pc/news/list.blade.php` 重新开发样式，如果用户启用的 MyTestTheme 模块主题，系统将会使用已开发的新样式，未覆盖的页面将会使用老的样式。



## 视图渲染查找顺序

主题的视图文件（ `.blade.php` 结尾）可能出现在多个位置，系统在渲染视图的时候会按照以下优先级查找直到匹配成功：

1. 启用主题自定义视图目录：如 `resources/views/theme/<主题>`
2. 当前主题主题模块视图目录：如 `module/<主题模块>/View`（这里假设主题模块的主题根目录为 `module/<主题模块>/View` ）
3. 系统默认视图目录：如 `resources/views/theme/default`
3. 当前模块视图目录：如 `module/Xxx/View`

> 举例说明：
> 当前系统启用 myTest 主题模块，主题根目录位于 `module/MyTest/View`，在 Xxx 模块中调用 `$this->view('test.list.news')` 
> 系统会按照如下顺序进行视图文件的查找，优先使用第一个匹配到的文件：
>
> 1. `resources/views/theme/myTest/pc/test/list/news.blade.php`
> 2. `module/MyTest/View/test/list/news.blade.php`
> 3. `resources/views/theme/default/pc/test/list/news.blade.php`
> 4. `module/Xxx/View/pc/test/list/news.blade.php`


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

可以通过 CSS 的变量 `var(--color-primary)` 获取，该变量会根据用户后台设置的主色调来动态改变。

## 内置变量说明

### \_viewFrame 框架视图文件

通过会在 blade 模板文件中看到 `@extends($_viewFrame)` 来确定当前模板的框架视图，该文件通常包含公共的头部、尾部、侧边栏等内容。

`$_viewFrame` 会根据当前模板查找最先匹配到的文件，查找顺序参考[视图渲染查找顺序](#视图渲染查找顺序)。

通常情况下，该变量会按照如下顺序查找：

1. 当前主题视图根目录的框架视图文件，可能为以下路径中的一个
   - `resources/views/theme/<主题>/pc/frame.blade.php`
   - `module/<主题模块>/View/pc/frame.blade.php`
2. 如果主题未定义框架视图文件，会使用系统默认视图目录
   - `resources/views/theme/default/pc/frame.blade.php`

### 常见 @section 说明

系统约定了一些模板 `@section` ，在开发时候请遵守约定，以便系统能够正确的渲染模板。

- `@section('pageTitleMain')`：系统标题，该标题后会自动补全网站主名称
- `@section('pageKeywords')`：网站关键字
- `@section('pageDescription')`：网站描述
- `@section('bodyContent')`：系统正文内容部分，不包含公共的头部、尾部、侧边栏等内容
- `@section('body')`：系统 body 标签的内容，会自动移除 body 标签中已有的内容
- `@section('headAppend')`：追加到 head 标签的内容
- `@section('bodyAppend')`：追加到 body 标签的内容

以上的 section 定义用法示例如下

```blade
@section('pageTitleMain')我的视图标题@endsection
```

```blade
@section('pageKeywords')我的视图关键字@endsection
```

```blade
@section('pageDescription')我的视图描述@endsection
```

```blade
@section('bodyContent')
    <div class="ub-container">
        我的视图内容
    </div>
@endsection
```

```blade
@section('body')
    <div class="ub-container">
        我的视图内容
    </div>
@endsection
```

```blade
@section('headAppend')
    @parent
    <script src="xxx"></script>
@endsection
```

```blade
@section('bodyAppend')
    @parent
    <script src="xxx"></script>
@endsection
```

## 主题开发常见问题

### Q：如何自定义头部和尾部

在主题根目录覆盖系统默认的 `pc/frame.blade.php` 框架视图文件，该文件会包含公共的头部、尾部、侧边栏等内容。

如果是主题模块，该文件将会是 `module/<主题模块>/View/pc/frame.blade.php`。

如果是普通应用主题，该文件将会是 `resources/views/theme/<主题>/pc/frame.blade.php`。

### Q：主题模块中的静态文件如何处理

问题：主题模块中的静态资源文件（如图片、CSS、JS等）该如何处理，保证用户安装主题模块后可以通过链接访问？

回答：模块安装时，静态资源会从 `module/***/Asset/` 复制到  `public/vendor/***/`，因此需要将静态资源文件统一放在主题模块的 `Asset` 目录中。

### Q：开发阶段静态资源如何处理

问题：系统安装后，静态资源会从 `module/***/Asset/` 复制到  `public/vendor/***/` ，开发阶段如何处理这个问题？

回答：开发阶段创建一个从  `module/***/Asset/` 到  `public/vendor/***/` 的软连接，这样就可以通过 `http://xxx/vendor/***/` 访问到模块静态资源文件了。

- `Linux`：运行命令 `ln -s module/***/Asset public/vendor/***`
- `Windows`：手动创建快捷方式

