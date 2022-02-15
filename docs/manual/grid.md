# 数据表格

## 快速入门

`ModStart\Grid\Grid` 类用于生成基于数据模型的表格，先来个例子，数据库中有 `blog` 表

```sql
CREATE TABLE `blog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `cover` varchar(200) DEFAULT NULL,
  `summary` varchar(200) DEFAULT NULL,
  `content` text,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

使用下面的代码可以生成 `blog` 的数据表格。

```php
<?php
namespace App\Admin\Controller;

use Illuminate\Routing\Controller;
use ModStart\Admin\Concern\HasAdminDetail;
use ModStart\Admin\Concern\HasAdminForm;
use ModStart\Admin\Concern\HasAdminGrid;
use ModStart\Detail\Detail;
use ModStart\Form\Form;
use ModStart\Grid\Grid;
use ModStart\Grid\GridFilter;

class BlogController extends Controller
{
    // 设置当前 Controller 包含 Grid、Form、Detail 三种特性
    use HasAdminGrid;
    use HasAdminForm;
    use HasAdminDetail;
  
    // 定义当前页面主标题
    public $pageTitle = '博客';

    public function grid()
    {
        $grid = Grid::make('blog');
        // 定义显示ID列
        $grid->id('id', 'ID');
        // 定义标题字段，格式为单行文本
        $grid->text('title', '标题');
        // 定义封面字段，格式为单张图片
        $grid->image('cover', '封面');
        // 定义摘要字段，格式为多行文本
        $grid->textarea('summary', '摘要');
        // 定义内容字段，格式为富文本
        $grid->richHtml('content', '内容');
        // 定义创建时间字段，格式为简单显示
        $grid->display('created_at', '创建时间');
        // 定义搜索过滤字段
        $grid->gridFilter(function (GridFilter $filter) {
            // 定义ID可搜索
            $filter->eq('id', 'ID');
            // 定义标题可模糊查找
            $filter->like('title', '标题');
        });
        // 定义整体增删改查标题为「博客」
        $grid->title('博客');
        return $grid;
    }

    public function form()
    {
        return Form::make('blog', function (Form $form) {
            // 定义标题字段，格式为单行文本
            $form->text('title', '标题');
            // 定义封面字段，格式为单张图片
            $form->image('cover', '封面');
            // 定义摘要字段，格式为多行文本
            $form->textarea('summary', '摘要');
            // 定义内容字段，格式为富文本
            $form->richHtml('content', '内容');
        });
    }

    public function detail()
    {
        return Detail::make('blog', function (Detail $detail) {
            // 定义显示ID列
            $detail->id('id', 'ID');
            // 定义标题字段，格式为单行文本
            $detail->text('title', '标题');
            // 定义封面字段，格式为单张图片
            $detail->image('cover', '封面');
            // 定义摘要字段，格式为多行文本
            $detail->textarea('summary', '摘要');
            // 定义内容字段，格式为富文本
            $detail->richHtml('content', '内容');
            // 定义创建时间字段，格式为简单显示
            $detail->display('created_at', '创建时间');
            // 定义更新时间字段，格式为简单显示
            $detail->display('updated_at', '更新时间');
        });
    }
}
```

定义Routes

```php
<?php
Route::group(
    [
        'prefix' => env('ADMIN_PATH', '/admin/'),
        'middleware' => ['admin.bootstrap', 'admin.auth'],
        'namespace' => '\App\Admin\Controller',
    ], function () {
    Route::match(['get', 'post'], 'blog', 'BlogController@index');
    Route::match(['get', 'post'], 'blog/add', 'BlogController@add');
    Route::match(['get', 'post'], 'blog/edit', 'BlogController@edit');
    Route::match(['get', 'post'], 'blog/delete', 'BlogController@delete');
    Route::match(['get', 'post'], 'blog/show', 'BlogController@show');
});
```



## 字段支持

### 显示 display

```php
$builder->display('field','名称');
```

### 单行文本 text

```php
$builder->text('field', '名称');
```

### 多选 checkbox

```php
$builder->checkbox('field', '名称');
```

### 标签 tags

```php
$builder->tags('field', '名称');
```

### 代码 code

```php
$builder->code('field', '名称');
```

### 树状组件 tree

```php
$builder->tree('field', '名称');
```

### 类型 type

```php
$builder->type('field', '类型');
```

### 密码 password

```php
$builder->password('field', '类型');
```

### 单张图片 image

```php
$builder->image('field', '类型');
```

### 多张图片 images

```php
$builder->type('field', '类型');
```

### 多张图片（临时路径） imagesTemp

```php
$builder->type('field', '类型');
```

### 链接 link

```php
$builder->link('field', '类型');
```

### 开关 switch

```php
$builder->switch('field', '类型');
```

### 多行文本 textarea

```php
$builder->textarea('field', '类型');
```

### 颜色 color

```php
$builder->color('field', '类型');
```

### 日期 date

```php
$builder->date('field', '类型');
```

### 日期时间 datetime

```php
$builder->datetime('field', '类型');
```

### 时间 time

```php
$builder->time('field', '类型');
```

### 单选 radio

```php
$builder->radio('field', '类型');
```

### 下拉 select

```php
$builder->select('field', '类型');
```

### 富文本 richHtml

```php
$builder->richHtml('field', '类型');
```

### Markdown markdown

```php
$builder->markdown('field', '类型');
```

### 键值对列表 keyValueList

```php
$builder->keyValueList('field', '类型');
```

### 多值 values

```php
$builder->values('field', '类型');
```

### HTML html

```php
$builder->html('field', '类型');
```

### 数字 number

```php
$builder->number('field', '类型');
```

### 百分比 percent

```php
$builder->percent('field', '类型');
```

### 小数 decimal

```php
$builder->decimal('field', '类型');
```

### 货币 currency

```php
$builder->currency('field', '类型');
```

### ID id

```php
$builder->id('field', '类型');
```

### 验证码 captcha

```php
$builder->captcha('field', '类型');
```

### 临时文件 fileTemp

```php
$builder->fileTemp('field', '类型');
```

### 文件 file

```php
$builder->file('field', '类型');
```

### 视频 video

```php
$builder->video('field', '类型');
```

### 音频 audio

```php
$builder->audio('field', '类型');
```

### 中国地区 areaChina

```php
$builder->areaChina('field', '类型');
```

### 隐藏域 hidden

```php
$builder->hidden('field', '类型');
```

### 图标 icon

```php
$builder->icon('field', '类型');
```


更多内置组件请参照 `ModStart\Support\Manager\FieldManager` 中的定义
