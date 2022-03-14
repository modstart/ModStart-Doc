# 数据展示


## 快速入门

`ModStart\Detail\Detail` 类用于快速生成详情页面，参照例子 [数据表格→快速入门](/manual/grid.html#快速入门)

可以通过如下代码快速定义个数据表单

```php
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
```

## 获取当前模型数据

在闭包内可以获取到当前模型的数据

```php
return Detail::make('blog', function (Detail $detail) {
    dd($detail->item());
});
```



## 字段支持

### 显示 display

```php
$detail->display('field','名称');
```

### 单行文本 text

```php
$detail->text('field', '名称');
```

### 多选 checkbox

```php
$detail->checkbox('field', '名称');
```

### 标签 tags

```php
$detail->tags('field', '名称');
```

### 代码 code

```php
$detail->code('field', '名称');
```

### 树状组件 tree

```php
$detail->tree('field', '名称');
```

### 类型 type

```php
$detail->type('field', '类型');
```

### 密码 password

```php
$detail->password('field', '类型');
```

### 单张图片 image

```php
$detail->image('field', '类型');
```

### 多张图片 images

```php
$detail->type('field', '类型');
```

### 多张图片（临时路径） imagesTemp

```php
$detail->type('field', '类型');
```

### 链接 link

```php
$detail->link('field', '类型');
```

### 开关 switch

```php
$detail->switch('field', '类型');
```

### 多行文本 textarea

```php
$detail->textarea('field', '类型');
```

### 颜色 color

```php
$detail->color('field', '类型');
```

### 日期 date

```php
$detail->date('field', '类型');
```

### 日期时间 datetime

```php
$detail->datetime('field', '类型');
```

### 时间 time

```php
$detail->time('field', '类型');
```

### 单选 radio

```php
$detail->radio('field', '类型');
```

### 下拉 select

```php
$detail->select('field', '类型');
```

### 富文本 richHtml

```php
$detail->richHtml('field', '类型');
```

### Markdown markdown

```php
$detail->markdown('field', '类型');
```

### 键值对列表 keyValueList

```php
$detail->keyValueList('field', '类型');
```

### 多值 values

```php
$detail->values('field', '类型');
```

### HTML html

```php
$detail->html('field', '类型');
```

### 数字 number

```php
$detail->number('field', '类型');
```

### 百分比 percent

```php
$detail->percent('field', '类型');
```

### 小数 decimal

```php
$detail->decimal('field', '类型');
```

### 货币 currency

```php
$detail->currency('field', '类型');
```

### ID id

```php
$detail->id('field', '类型');
```

### 验证码 captcha

```php
$detail->captcha('field', '类型');
```

### 临时文件 fileTemp

```php
$detail->fileTemp('field', '类型');
```

### 文件 file

```php
$detail->file('field', '类型');
```

### 视频 video

```php
$detail->video('field', '类型');
```

### 音频 audio

```php
$detail->audio('field', '类型');
```

### 中国地区 areaChina

```php
$detail->areaChina('field', '类型');
```

### 隐藏域 hidden

```php
$detail->hidden('field', '类型');
```

### 图标 icon

```php
$detail->icon('field', '类型');
```


更多内置组件请参照 `ModStart\Support\Manager\FieldManager` 中的定义
