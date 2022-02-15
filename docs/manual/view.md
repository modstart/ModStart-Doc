# 视图页面



## 页面标题/描述/关键词

### 在Blade页面上调用

设置页面标题

```blade
@section('pageTitle')页面标题@endsection
```

设置页面主标题（会自动补全网站名称）

```blade
@section('pageTitleMain')页面主标题@endsection
```

设置页面关键词

```blade
@section('pageKeywords')页面关键词@endsection
```

设置页面描述

```blade
@section('pageDescription')页面描述@endsection
```

### 在Controller中调用

```php
return view('blade文件',[
  	'pageTitle' => '页面标题',
  	'pageTitleMain' => '页面主标题',
  	'pageKeywords' => '页面关键词',
  	'pageDescription' => '页面描述',
]);
```





## 页面 JavaScript

页面 `JavaScript` 会自动放在页面尾部（`</body>` 之前）

引入行内 `JavaScript`

```php
ModStart::script('console.log("Hello ModStart");');
```

引入一个 `JavaScript` 文件内容到页面

```php
ModStart::scriptFile('文件路径.js');
```

引入一个 `JavaScript` 文件路径到页面

```php
ModStart::js('文件路径.js');
```



## 页面 CSS

页面 `CSS` 会自动放在头部（`</head>` 之前）

引入 `CSS` 样式到页面

```php
ModStart::style('.test{ color:red; }');
```

引入一个 `CSS` 文件内容到页面

```php
ModStart::styleFile('文件路径.css');
```

引入一个 `CSS` 文件路径到页面

```php
ModStart::css('文件路径.css');
```



## Blade页面中追加内容



### 在 head 中追加内容

```html
@section('headAppend')
    @parent
    <!-- 需要追加到 head 中的内容 -->
@endsection
```



### 在 body 中追加内容

```html
@section('bodyAppend')
    @parent
    <!-- 需要追加到 body 中的内容 -->
@endsection
```

