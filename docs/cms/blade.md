# Blade模板教程

## 简介

Blade 是 Laravel 所提供的一个简单且强大的模板引擎。相较于其它知名的 PHP 模板引擎，Blade 并不会限制你必须得在视图中使用 PHP 代码。所有 Blade 视图都会被编译缓存成普通的 PHP 代码，一直到它们被更改为止。这代表 Blade 基本不会对你的应用程序生成负担。

Blade 视图文件使用 .blade.php 做为扩展名，通常保存于 resources/views 或 module/Xxx/View 文件夹内。



## 显示数据

你可以使用「中括号」包住变量以显示传递至 Blade 视图的数据。就如以下的路由设置一样：

```php
return view('welcome', ['name' => 'Samantha']);
```

你可以像这样显示 name 变量的内容：

```html
Hello, {{ $name }}.
```

当然也不是说一定只能显示传递至视图的变量内容。你也可以显示 PHP 函数的结果。实际上，你可以放置任何你想要的 PHP 代码到 Blade 显示的语法里面：

```php
目前的 UNIX 时间戳为 {{ time() }}。
```

> 注意：Blade 的 {{ }} 语法会自动调用 PHP htmlentites 函数来防御 XSS 攻击。

## 条件判断 if

你可以使用 @if、@elseif、@else 及 @endif 命令建构 if 表达式。这些命令的功能等同于在 PHP 中的语法：

```html
@if (count($records) === 1)
    我有一条记录！
@elseif (count($records) > 1)
    我有多条记录！
@else
    我没有任何记录！
@endif
```


## 循环 for foreach

除了条件表达式外，Blade 也支持 PHP 的循环结构：

```html
@for ($i = 0; $i < 10; $i++)
    目前的值为 {{ $i }}
@endfor

@foreach ($users as $user)
    <p>此用户为 {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>没有用户</p>
@endforelse

@while (true)
    <p>我永远都在跑循环。</p>
@endwhile
```

## 定义页面布局

使用 Blade 模板的两个主要优点为 模板继承 与 区块。

让我们先通过一个简单的例子来上手。首先，我们需要确认一下「主要的」页面布局。大多数的网页应用程序在不同页面都保持着相同的布局方式，这种布局在这单个 Blade 视图中可以很方便的定义：

```html
<html>
    <head>
        <title>应用程序名称 - @yield('title')</title>
    </head>
    <body>
        @section('sidebar')
            这是主要的侧边栏。
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

如你所见，这个文件包含了传统的 HTML 语法。不过，请注意 @section 与 @yield 命令。正如其名，@section 命令定义一个内容区块，而 @yield 命令被用来 “显示指定区块” 的内容。

现在，我们已经定义好了这个应用程序的布局，让我们接着来定义一个继承此布局的子页面。

## 继承页面布局

当正在定义子页面时，你可以使用 Blade 的 @extends 命令指定子页面应该「继承」哪一个布局。当视图 @extends Blade 的布局之后，即可使用 @section 命令将内容注入于布局的区块中。切记，如上述例子所见，这些区块的内容都会使用 @yield 显示在布局中：

```html
@extends('theme.pc.default.frame')

@section('title', '页面标题')

@section('sidebar')
    @parent
    <p>这边会附加在主要的侧边栏。</p>
@endsection

@section('content')
    <p>这是我的主要内容。</p>
@endsection
```

在这个例子中，sidebar 区块利用了 @parent 命令增加（而不是覆盖）内容至布局的侧边栏。@parent 命令会在视图输出时被置换成布局的内容。

## 大括号不转义输出

由于许多 JavaScript 框架也使用「大括号」在浏览器中显示指定的表达式，因此可以使用 @ 符号来告知 Blade 渲染引擎该表达式应该维持原样。举个例子：

```html
<h1>Laravel</h1>

Hello, @{{ name }}.
```

在这个例子中，@ 符号会被 Blade 移除。而且，Blade 引擎会保留 {{ name }} 表达式，如此一来便可跟其它 JavaScript 框架一起应用。

## 显示未转义过的数据

在默认情况下，Blade 模板中的 {{ }} 表达式将会自动调用 PHP 的 htmlentities 函数，以避免 XSS 攻击。如果你不希望你的数据被转义，可以使用下列的语法：

```html
Hello, {!! $name !!}.
```

> 注意：要非常小心处理用户提供的字符串，请总是使用双大括号语法来转义内容中的 HTML 元素，以避免 XSS 攻击。

## 引入子视图

Blade 的 @include 命令用来引入已存在的视图，所有在父视图的可用变量在被引入的视图中都是可用的。

```html
<div>
    @include('share.header')
    <form>
        <!-- 表单内容 -->
    </form>
</div>
```

尽管被引入的视图会继承父视图中的所有数据，你也可以通过传递额外的数组数据至被引入的页面：

```html
@include('view.name', ['some' => 'data'])
```

## 当数据存在时输出

有时候你想要输出一个变量，但你并不确定这个变量是否已被设置。我们可以用像这样的冗长 PHP 代码表达：

```php
{{ isset($name) ? $name : 'Default' }}
```

不过，Blade 提供了较方便的缩写来替代写三元运算符表达式：

```html
{{ $name or 'Default' }}
```

在这个例子中，如果 $name 变量存在，它的值将会被显示出来。但是，如果这个变量不存在，便会显示 Default。


## 为集合渲染视图

你可以使用 Blade 的 @each 命令将循环及引入结合成一行代码：

```html
@each('view.name', $jobs, 'job')
```

第一个参数为每个元素要渲染的局部视图，第二个参数你要迭代的数组或集合，而第三个参数为迭代时被分配至视图中的变量名称。所以，举例来说，如果你要迭代一个 jobs 数组，通常你会希望在局部视图中通过 job 变量访问每一个 job。

你也可以传递第四个参数至 @each 命令。此参数为当指定的数组为空时，将会被渲染的视图。

```html
@each('view.name', $jobs, 'job', 'view.empty')
```

## 注释

Blade 也允许在页面中定义注释，然而，跟 HTML 的注释不同的是，Blade 注释不会被包含在应用程序返回的 HTML 内：

```html
{{-- 此注释将不会出现在渲染后的 HTML --}}
```
