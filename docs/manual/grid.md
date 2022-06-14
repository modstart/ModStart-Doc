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



## 数据表格仓库

### 使用MySQL表名

使用数据表名称创建数据表格

```php
$grid = Grid::make('blog');
```

### 使用数据模型类

使用数据模型类来创建数据表格

```php
$grid = Grid::make(Blog::class);
```

其中 `Blog` 定义如下

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'blog';
}
```



## 列的配置和使用

一个基础列

```php
$grid->display('field','名称');
```

设定宽度

```php
$grid->display('field','名称')->width(100);
```

自定义渲染

```php
$grid->display('field','自定义列')->hookRendering(function (AbstractField $field, $item, $index) {
    return '<span>自定义内容：'.$item->field.'</span>';
});
```



## 行的配置和使用

数据表格行默认有 3 个操作：`编辑`、`删除`、`查看`，可以通过如下方式关闭。

```php
// 关闭编辑
$grid->canEdit(false);
// 关闭删除
$grid->canDelete(false);
// 关闭查看
$grid->canShow(false);
// 一键关闭编辑、删除、查看
$grid->disableCUD();
```

自定义渲染行操作

```php
$grid->hookItemOperateRendering(function (ItemOperate $itemOperate) {
    // 当前行数据
    $item = $itemOperate->item();
    // 在默认操作之前增加操作
    $itemOperate->prepend('<a href="#">其他操作</a>');
    // 在默认操作之后增加操作
    $itemOperate->push('<a href="#">其他操作</a>');
});
```

不显示操作列

```php
$grid->disableItemOperate();
```

## 筛选条件的配置

定义表格筛选条件

```php
$grid->gridFilter(function (GridFilter $filter) {
    $filter->eq('id', 'ID');
    $filter->like('title', '标题');
})
```

## 工具栏配置使用

在右上角工具栏增加操作

```php
$grid->gridOperateAppend('<a href="#" class="btn btn-primary">操作</a>');
```

## 数据排序使用

默认按照ID倒序排序，可自定义列表排序

```php
$grid->defaultOrder(['字段', 'asc或desc']);
```

## 字段使用介绍

为 Grid 定义一个字段

```php
$field = $grid->text('field', '名称');
```

### 字段可排序

定义后在 Grid 顶端会出现上下箭头的可点击实现 正序、倒序、默认 三种排序方式

```php
$field->sortable(true);
```

## 所有字段支持

### 显示 display

```php
$grid->display('field','名称');
```

### 单行文本 text

```php
$grid->text('field', '名称');
```

### 多选 checkbox

```php
$grid->checkbox('field', '名称');
```

### 标签 tags

```php
$grid->tags('field', '名称');
```

### 代码 code

```php
$grid->code('field', '名称');
```

### 树状组件 tree

```php
$grid->tree('field', '名称');
```

### 类型 type

```php
$grid->type('field', '类型');
```

### 密码 password

```php
$grid->password('field', '类型');
```

### 单张图片 image

```php
$grid->image('field', '类型');
```

### 多张图片 images

```php
$grid->type('field', '类型');
```

### 多张图片（临时路径） imagesTemp

```php
$grid->type('field', '类型');
```

### 链接 link

```php
$grid->link('field', '类型');
```

### 开关 switch

```php
$grid->switch('field', '类型');
```

### 多行文本 textarea

```php
$grid->textarea('field', '类型');
```

### 颜色 color

```php
$grid->color('field', '类型');
```

### 日期 date

```php
$grid->date('field', '类型');
```

### 日期时间 datetime

```php
$grid->datetime('field', '类型');
```

### 时间 time

```php
$grid->time('field', '类型');
```

### 单选 radio

```php
$grid->radio('field', '类型');
```

### 下拉 select

```php
$grid->select('field', '类型');
```

### 富文本 richHtml

```php
$grid->richHtml('field', '类型');
```

### Markdown markdown

```php
$grid->markdown('field', '类型');
```

### 键值对列表 keyValueList

```php
$grid->keyValueList('field', '类型');
```

### 多值 values

```php
$grid->values('field', '类型');
```

### HTML html

```php
$grid->html('field', '类型');
```

### 数字 number

```php
$grid->number('field', '类型');
```

### 百分比 percent

```php
$grid->percent('field', '类型');
```

### 小数 decimal

```php
$grid->decimal('field', '类型');
```

### 货币 currency

```php
$grid->currency('field', '类型');
```

### ID id

```php
$grid->id('field', '类型');
```

### 验证码 captcha

```php
$grid->captcha('field', '类型');
```

### 临时文件 fileTemp

```php
$grid->fileTemp('field', '类型');
```

### 文件 file

```php
$grid->file('field', '类型');
```

### 视频 video

```php
$grid->video('field', '类型');
```

### 音频 audio

```php
$grid->audio('field', '类型');
```

### 中国地区 areaChina

```php
$grid->areaChina('field', '类型');
```

### 隐藏域 hidden

```php
$grid->hidden('field', '类型');
```

### 图标 icon

```php
$grid->icon('field', '类型');
```


更多内置组件请参照 `ModStart\Support\Manager\FieldManager` 中的定义
