# 数据表单

## 快速入门

`ModStart\Form\Form` 类用于快速生成表单页面，参照例子 [数据表格→快速入门](/manual/grid.html#快速入门)

可以通过如下代码快速定义个数据表单

```php
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
```

## 获取当前模型数据

在闭包内可以获取到当前模型的数据

```php
return Form::make('blog', function (Detail $detail) {
    dd($detail->item());
});
```



## 字段支持

### 显示 display

```php
$form->display('field','名称');
```

### 单行文本 text

```php
$form->text('field', '名称');
```

### 多选 checkbox

```php
$form->checkbox('field', '名称');
```

### 标签 tags

```php
$form->tags('field', '名称');
```

### 代码 code

```php
$form->code('field', '名称');
```

### 树状组件 tree

```php
$form->tree('field', '名称');
```

### 类型 type

```php
$form->type('field', '类型');
```

### 密码 password

```php
$form->password('field', '类型');
```

### 单张图片 image

```php
$form->image('field', '类型');
```

### 多张图片 images

```php
$form->type('field', '类型');
```

### 多张图片（临时路径） imagesTemp

```php
$form->type('field', '类型');
```

### 链接 link

```php
$form->link('field', '类型');
```

### 开关 switch

```php
$form->switch('field', '类型');
```

### 多行文本 textarea

```php
$form->textarea('field', '类型');
```

### 颜色 color

```php
$form->color('field', '类型');
```

### 日期 date

```php
$form->date('field', '类型');
```

### 日期时间 datetime

```php
$form->datetime('field', '类型');
```

### 时间 time

```php
$form->time('field', '类型');
```

### 单选 radio

```php
$form->radio('field', '类型');
```

### 下拉 select

```php
$form->select('field', '类型');
```

### 富文本 richHtml

```php
$form->richHtml('field', '类型');
```

### Markdown markdown

```php
$form->markdown('field', '类型');
```

### 键值对列表 keyValueList

```php
$form->keyValueList('field', '类型');
```

### 多值 values

```php
$form->values('field', '类型');
```

### HTML html

```php
$form->html('field', '类型');
```

### 数字 number

```php
$form->number('field', '类型');
```

### 百分比 percent

```php
$form->percent('field', '类型');
```

### 小数 decimal

```php
$form->decimal('field', '类型');
```

### 货币 currency

```php
$form->currency('field', '类型');
```

### ID id

```php
$form->id('field', '类型');
```

### 验证码 captcha

```php
$form->captcha('field', '类型');
```

### 临时文件 fileTemp

```php
$form->fileTemp('field', '类型');
```

### 文件 file

```php
$form->file('field', '类型');
```

### 视频 video

```php
$form->video('field', '类型');
```

### 音频 audio

```php
$form->audio('field', '类型');
```

### 中国地区 areaChina

```php
$form->areaChina('field', '类型');
```

### 隐藏域 hidden

```php
$form->hidden('field', '类型');
```

### 图标 icon

```php
$form->icon('field', '类型');
```


更多内置组件请参照 `ModStart\Support\Manager\FieldManager` 中的定义
