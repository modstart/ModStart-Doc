# Linux运维



## 创建和启用Swap交换区

如果你的服务器的总是报告内存不足，并且时常因为内存不足而引发服务被强制kill的话，在不增加物理内存的情况下，启用swap交换区作为虚拟内存是一个不错的选择，如果硬盘使用的是 SSD，正常读写速度都在 300MB/s 以上，启用 swap 后性能提高了不少，特别是在处理消耗大内存的脚本方面。

创建交换区原则：

- 创建的swap交换区大小应该大于实际物理内存的容量大小，但是不要过大，以免造成硬盘空间浪费。
- 如果内存IO请求频繁，而单一swap交换区IO队列等待时间过长的话，可以多创建几个swap交换区。
- 原则上优先在IO速度最快的设备上创建。

**（1）创建swap交换区硬盘存储用的空白文件。**

通常创建物理内存2~2.5倍大小的文件作为交换区。

```shell
# 创建一个1个G的SWAP交换区空白文件
dd if=/dev/zero of=/swap bs=1M count=1024
```

**（2）使用mkswap格式化文件为swap文件系统**

```shell
# -f 使用文件作为swap交换区
mkswap -f /swap
# 设定为推荐的 0600 权限
chmod 0600 /swap
```

**（3）启用刚才创建的Swap文件**

```shell
swapon /swap
```


**（4）如果有必要可以设置开机自动启用swap文件交换区，修改/etc/fstab，增加一行**

```shell
# 启动即启用swap
/swap swap swap defaults 0 0
```


**（5）如果不需要启用swap或需要调整swap大小，可以使用swapoff命令关闭swap。**

```shell
# 关闭swap
swapoff /swap
```

关闭swap后删除对应的swap文件即可删除swap交换区，如需要调整swap交换区大小，从第一部开始重新创建即可。

## 工具推荐

- `pt-online-schema-change`：MySQL 在线 DDL 工具