# 系统升级说明

升级需要执行以下基本步骤，请确保每个步骤正确。

> 说明：升级前请全量备份网站数据库和代码，避免升级操作有误造成系统不能正常运行。


## 系统自动升级

从1.5.0开始，系统提供自动升级功能。当有新版本出现时，在后台可以通过自动升级操作一键升级。

> 在自动升级前请备份好旧的系统数据，避免升级失败造成的数据丢失等情况。


## 系统手动升级

### 1 旧的系统备份

假如旧系统的部署目录为 `/xxx/test.com`，
请重新命名为 `/xxx/test.com.bk`

**Linux参考命令**

```shell
mv /xxx/test.com /xxx/test.com.bk
```

**Windows参考操作**

> 请按照描述自行操作



### 2 解压最新的代码

解压最新的代码到 `/xxx/test.com`

**Linux参考命令**

```shell
mkdir -p /xxx/test.com
cp xxx.zip /xxx/test.com
cd /xxx/test.com
unzip xxx.zip
```

**Windows参考操作**

> 请按照描述自行操作


### 3 迁移自安装模块

如果您的系统不是行业定制版，可能有些模块是您自行安装的，这时需要将 `module/` 目录中的自安装模块复制到升级后的系统中。

**Linux参考命令**

```shell
cp -av /xxx/test.com.bk/module/xxx /xxx/test.com/module
```

**Windows参考操作**

>  请按照描述自行操作


### 4 复制配置文件

从老的项目代码中复制以下配置文件到新的代码中。

- 配置文件：`.env`
- 上传文件：`public/data` 

**Linux参考命令**

```shell
cp -av /xxx/test.com.bk/.env /xxx/test.com/
cp -av /xxx/test.com.bk/public/data /xxx/test.com/public/
```

**Windows参考操作**

>  请按照描述自行操作


### 5 升级数据库

> 说明：系统的升级会伴随着数据库字段和系统配置的升级，系统的版本发布都会包含历史系统的所有操作，执行该步骤可以升级系统数据库字段、操作等

**Linux参考命令**

```shell
php /xxx/test.com/artisan migrate
php /xxx/test.com/artisan modstart:module-install-all 
```

### 6 清除缓存并完成升级

- 如果您启用了 `Redis` 等外部缓存依赖，请清除缓存后再重新访问系统。
- 如果您使用的是系统自带的文件缓存，直接访问新系统。
