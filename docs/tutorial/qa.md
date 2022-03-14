# 开发常见问题



## Q：开发阶段静态资源如何处理

问题：系统安装后，静态资源会从 `module/***/Asset/` 复制到  `public/vendor/***/` ，开发阶段如何处理这个问题？

回答：开发阶段创建一个从  `module/***/Asset/` 到  `public/vendor/***/` 的软连接，这样就可以通过 `http://xxx/vendor/***/` 访问到模块静态资源文件了。 

- `Linux`：运行命令 `ln -s module/***/Asset public/vendor/***`
- `Windows`：手动创建快捷方式

