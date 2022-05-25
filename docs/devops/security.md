# 系统安全

## XSS介绍与预防

举例：用户提交数据时如果填写 `Hello<script>alert('hello');</script>`，当系统处理数据时过滤不完全，就会出现 XSS 漏洞，用户的代码就会被执行。

可以通过以下几种方式预防：

### 1 输入过滤

过滤所有用户输入的数据，默认可以使用 `HtmlUtil::filter` 进行富文本过滤）

### 2 显示转义

渲染数据时使用 `{{ xxx }}` 可以进行 html 转义，不要使用 `{! xxx !}`

### 3 X-Frame-Options

防止网页被嵌套

攻击者可以使用一个透明的、不可见的iframe，覆盖在目标网页上，然后诱使用户在该网页上进行操作，此时用户将在不知情的情况下点击透明的iframe页面。通过调整iframe页面的位置，可以诱使用户恰好点击iframe页面的一些功能性按钮上，导致被劫持。

生产环境的网站都会添加防盗链，不希望自己网页页面被其他站的 FRAME 嵌套进去， 这时候就需要的HTTP协议头里增加X-Frame-Options这一项。

- `DENY` 表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
- `SAMEORIGIN` 表示该页面可以在相同域名页面的 frame 中展示。
- `ALLOW-FROM "https://example.com/"` 表示该页面可以在指定来源的 frame 中展示。

Nginx参考

```
add_header X-Frame-Options DENY;
add_header X-Frame-Options SAMEORIGIN;
add_header X-Frame-Options "ALLOW-FROM https://xxx.xxxxxx.com http://xxx.com";
```

Apache参考

```
Header always append X-Frame-Options SAMEORIGIN
```



### 4 Content-Security-Policy

内容安全策略

CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。

详细参考：[http://www.ruanyifeng.com/blog/2016/09/csp.html](http://www.ruanyifeng.com/blog/2016/09/csp.html)

如配置限定script执行，可参考配置

Nginx参考

```
add_header Content-Security-Policy 'script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' a.xxx.com b.xxx.com; report-uri https://xxx.com/csp_report;';
```

可配合使用 [FELoggerServer](https://modstart.com/m/FELoggerServer) 模块来记录非法 `script` 请求

