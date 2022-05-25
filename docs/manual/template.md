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

可以通过 CSS 的变量 `var(--color-primary)` 获取。

