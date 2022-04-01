# 调度和队列

## 任务调度

使用 Laravel 的任务调度，可以实现系统计划执行任务。

### 如何在模块中注册一个任务调度

实现一个任务调度Provider

```php
class ModuleXxxScheduleProvider extends AbstractScheduleProvider
{
    public function cron()
    {
        return $this->cronEveryMinute();
    }

    public function title()
    {
        return '测试任务调度';
    }

    public function run()
    {
        Log::info('任务已经执行');
    }

}

```

注册任务调度

```php
ScheduleProvider::register(ModuleXxxScheduleProvider::class);
```

### 开启调度器

> Cron 是 UNIX、SOLARIS、LINUX 下的一个十分有用的工具，通过 Cron 脚本能使计划任务定期地在系统后台自动运行。这种计划任务在 UNIX、SOLARIS、LINUX下术语为 Cron Jobs。

下面是你唯一需要添加到服务器的 Cron 条目：

```shell
* * * * * php /xxx/artisan schedule:run >> /dev/null 2>&1
```

该 Cron 将会每分钟调用一次 Laravel 命令调度器，当 schedule:run 命令执行后，ModStart 和 Laravel 评估你的调度任务并运行到期的任务。


## 队列

队列的目的是将耗时的任务延时处理，比如发送邮件、文档转换处理等，从而大幅度缩短 Web 请求和响应的时间。

队列配置文件存放在 config/queue.php。每一种队列驱动的配置都可以在该文件中找到，包括数据库、Beanstalkd、Amazon SQS、Redis以及同步（本地使用）驱动。

### 如何使用 MySQL 作为队列驱动

第一步，生成数据库队列表迁移文件

```
php artisan queue:table
```

> 这一步会生成数据库迁移文件 database/migrations/xxxx_xx_xx_xxxxxx_create_jobs_table.php

第二步，执行数据库迁移文件

```
php artisan migrate
```

第三步，在 `.env` 文件配置队列驱动为数据库

```
QUEUE_DRIVER=database
QUEUE_CONNECTION=database
```

第四步，运行队列进程

```
php /xxx/artisan queue:work database --sleep=3 --tries=3
```

### 使用 Supervisor 管理队列进程

如果你使用的是 ssh 运行的队列进程，当 ssh 连接断开时，该进程会自动停止。

Supervisor 是 Linux 系统中常用的进程守护程序，如果队列进程 queue:work 意外关闭，它会自动重启启动队列进程。

Supervisor 参考配置

```
[program:queue-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /xxx/artisan queue:work database --sleep=3 --tries=3
autostart=true
autorestart=true
user=www
numprocs=2
redirect_stderr=true
stdout_logfile=/tmp/worker.log
```

> `command` 表示执行的命令
> `user` 表示启动进程的用户
> `numprocs` 可以控制队列进程的数量，即同时执行的任务数

