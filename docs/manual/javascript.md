# JavaScript工具类

为方便使用，系统内置了部分函数，加速系统的开发。

内置函数默认绑定在全局变量 `MS` 上，有不同的模块。

## 基础

### MS.ready

监听 JS 脚本加载完毕事件 (ready)

```js
MS.ready(function () {
    // 页面加载完成
});
```

## 弹窗 dialog

### MS.dialog.loadingOn

页面遮罩显示

```js
MS.dialog.loadingOn([msg])
```

- `msg` 显示文字，可选，默认为 Loading 图标

### MS.dialog.loadingOff

页面遮罩关闭

```js
MS.dialog.loadingOff()
```

### MS.dialog.tipSuccess

提示成功信息

```js
MS.dialog.tipSuccess(msg)
```

- `msg` 提示文字

### MS.dialog.tipError

提示错误信息

```js
MS.dialog.tipError(msg)
```

- `msg` 提示文字

### MS.dialog.alertSuccess

成功信息模态框

```js
MS.dialog.alertSuccess(msg)
```

- `msg` 提示文字

### MS.dialog.alertError

错误信息模态框

```js
MS.dialog.alertError(msg)
```

- `msg` 提示文字

### MS.dialog.confirm

确认信息框

```js
MS.dialog.confirm(msg, callback)
```

- `msg` 提示文字
- `callback` 回调函数

### MS.dialog.dialogContent

弹出 `HTML` 内容

```js
MS.dialog.dialogContent(content)
```

- `content` HTML内容

### MS.dialog.dialog

弹出 `URL` 链接

```js
MS.dialog.dialog(url)
```

- `url` 链接

## 工具 util

### MS.util.loadScript

动态加载 `script`

```js
MS.util.loadScript(url, callback)
```

- `url` js 链接
- `callback` 加载完成回调函数

### MS.util.loadStylesheet

动态加载 `CSS`

```js
MS.util.loadStylesheet(url, callback)
```

- `url` CSS 链接
- `callback` 加载完成回调函数

### MS.util.md5

计算字符串MD5值

```js
MS.util.md5(str)
```

- `str` 字符串

### MS.util.randomString

生成随机字符串

```js
MS.util.randomString(len)
```

- `len`随机 字符串长度

### MS.util.urlencode

字符串URL编码

```js
MS.util.urlencode(str)
```

- `str`

### MS.util.specialchars

字符串HTML转义

```js
MS.util.specialchars(str)
```

- `str` 字符串

### MS.util.scrollTop

字符串HTML转义

```js
MS.util.scrollTop(target, container)
```

- `target` 元素选择器
- `container` 父容器选择器，为空表示整个页面

## 组件

### 富文本 editor

默认使用了UEditor作为富文本编辑

引入JS

```php
ModStart::js('asset/common/editor.js')
```

初始化富文本

```html

<script id="content" name="content" type="text/plain"><p>初始化HTML</p></script>
<script>
    // 全功能
    MS.editor.basic('content');
    // 精简
    MS.editor.simple('content');
</script>
```

### 弹窗选择器 selectorDialog

使用示例

```js
new MS.selectorDialog({
    server: "<弹窗URL>",
    callback: function (items) {
        console.log("选择了", items);
    }
}).show();
```

在弹出的 Iframe 页面中需要通过以下方法来触发关闭并回调

```js
parent.__selectorDialogItems = items;
parent.layer.closeAll();
```
