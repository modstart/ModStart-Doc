# 数据表格

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
