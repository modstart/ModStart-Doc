# 持续集成

## 介绍

使用专业的代码管理工具（`git` 或 `svn`）是一个不错的选择，通过专业的代码管理工具+部署脚本，可以让系统实现持续开发集成，加速迭代。

## 自动部署PHP脚本参考

专业的 `CI` 固然好，在早期通过简单的脚本实现持续集成也是个不错的选择。

在服务端通过脚本拉取最新的仓库代码，实现持续集成功能。

```php
<?php
echo "\n\n";

set_time_limit(0);

$type = @$_GET['type'];
if ('schedule' == $type) {
    $ret = shell_exec("php ../artisan schedule:run 2>&1");
    echo 'OK';
    return;
}

$ret = shell_exec("git pull origin master 2>&1");
$lines = explode("\n", $ret);
if (isset($lines[0])) {
    unset($lines[0]);
}
echo "=== Deploy Code ===\n" . join("\n", $lines) . "\n";

echo "=== Clear Bootstrap Cache ===\n" . $ret . "\n";
$ret = shell_exec("rm -rfv ../bootstrap/cache/* 2>&1");

echo "=== Clear Storage Cache ===\n" . $ret . "\n";
$ret = shell_exec("rm -rfv ../storage/framework/cache/* 2>&1");

$ret = shell_exec("php ../artisan cache:clear 2>&1");
echo "=== Clear System Cache ===\n" . $ret . "\n";

$ret = shell_exec("php ../artisan view:clear 2>&1");
echo "=== Clear View Cache ===\n" . $ret . "\n";

$ret = shell_exec("php ../artisan migrate 2>&1");
echo "=== Migrate ===\n" . $ret . "\n";

$ret = shell_exec("php ../artisan modstart:module-install-all 2>&1");
echo "=== ModStart ModuleInstallAll ===\n" . $ret . "\n";

$ret = shell_exec("php ../artisan config:cache 2>&1");
echo "=== Optimize Config Cache ===\n" . $ret . "\n";

$ret = shell_exec("php ../artisan optimize 2>&1");
echo "=== Optimize Code ===\n" . $ret . "\n";
```
