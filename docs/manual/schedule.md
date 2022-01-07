# 调度和队列

## 任务调度

使用Laravel的任务调度，可以实现系统计划执行任务。

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

Laravel 队列为不同的后台队列服务提供了统一的 API，例如 Beanstalk，Amazon SQS，Redis，甚至其他基于关系型数据库的队列。队列的目的是将耗时的任务延时处理，比如发送邮件，从而大幅度缩短 Web 请求和响应的时间。

队列配置文件存放在 config/queue.php。每一种队列驱动的配置都可以在该文件中找到，包括数据库、Beanstalkd、Amazon SQS、Redis以及同步（本地使用）驱动。其中还包含了一个 null 队列驱动用于那些放弃队列的任务。


### 开启队列

我们推荐您使用 Supervisor 来管理队列进程，Supervisor 是 Linux 系统中常用的进程守护程序。如果队列进程 queue:work 意外关闭，它会自动重启启动队列进程。

Supervisor 参考配置

```
[program:queue-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /xxx/artisan queue:work database --sleep=3 --tries=3
autostart=true
autorestart=true
user=forge
numprocs=2
redirect_stderr=true
stdout_logfile=/tmp/worker.log
```

> 在本例中，numprocs 指令让 Supervisor 运行 2 个 queue:work 进程并监视它们，如果失败的话自动重启。当然，你需要修改 queue:work database 的 command 指令来映射你的队列连接。
