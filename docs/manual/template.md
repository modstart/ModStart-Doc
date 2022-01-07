# 系统主题


ModStart所有系统使用了系统配置表 `config` 中的 `siteTemplate` 变量，默认使用 `default` 变量。

- 系统视图根目录：`resources/views/theme/`
- 模块视图根目录：`module/Xxx/View/`

## 自适应的设备视图

ModStart的View根据访问设备的不同，会启用不同的视图文件，具体逻辑可参照 `\ModStart\Core\View\ResponsiveViewTrait` 中的逻辑。

- PC端使用 `pc/` 中的视图
- 手机端使用 `m/` 中的视图
- 当手机端视图不存在时，会自动降级使用 `pc/` 中的视图


## 定义一个视图例子

```blade
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

## 主题模块

为方便不同主题适配安装，可以创建模块来完成主题的安装和开发。

在模块市场，下载安装「CMS开发演示模板」，供参考开发。

[https://modstart.com/m/CmsThemeDemo](https://modstart.com/m/CmsThemeDemo)

