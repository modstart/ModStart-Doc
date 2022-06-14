# PHP工具类

## 全局函数

### modstart\_version MSCore版本


获取MSCore版本

`modstart_version(  )`
- 返回：`string` 版本号

### modstart\_admin\_url Admin路径


生成Admin的路径，自动加前缀

`modstart_admin_url( string, array )`
- 参数：`string` `$url` 路径
- 参数：`array` `$param` 参数
- 返回：`void` string

代码示例
```php
// 返回 /admin/aaa/bbb
modstart_admin_url('aaa/bbb')
// 返回 /admin/aaa/bbb?x=y
modstart_admin_url('aaa/bbb',['x'=>'y'])
```

### modstart\_web\_url Web路径


生成Web的路径，自动加前缀

`modstart_web_url( string, array )`
- 参数：`string` `$url` 路径
- 参数：`array` `$param` 参数
- 返回：`void` string

代码示例
```php
// 返回 /aaa/bbb
modstart_web_url('aaa/bbb')
// 返回 /aaa/bbb?x=y
modstart_web_url('aaa/bbb',['x'=>'y'])
```

### modstart\_api\_url Api路径


生成Api的路径，自动加前缀

`modstart_api_url( string, array )`
- 参数：`string` `$url` 路径
- 参数：`array` `$param` 参数
- 返回：`void` string

代码示例
```php
// 返回 /api/aaa/bbb
modstart_api_url('aaa/bbb')
// 返回 /api/aaa/bbb?x=y
modstart_api_url('aaa/bbb',['x'=>'y'])
```

### modstart\_config 获取配置


用于获取表 config 中的配置选项

`modstart_config( $key, $default, $useCache )`
- 参数：`$key` `string` 配置名称
- 参数：`$default` `any|string` 默认值
- 参数：`$useCache` `boolean` 启用缓存，默认为true
- 返回：`any|string|\ModStart\Core\Config\MConfig` 返回配置值或配置对象

代码示例
```php
// 网站名称
modstart_config('siteName');
// 获取一个配置数组，数组需存储成 json 格式
modstart_config()->getArray('xxx')
// 设置配置项
modstart_config()->set('xxx','aaa')
```

### modstart\_module\_enabled 模块判断


判断模块是否已安装并启用

`modstart_module_enabled( $module, $version )`
- 参数：`$module` `string` 模块名称，如 Member
- 参数：`$version` `string` 模块版本要求，如 1.0.0， >=1.0.0
- 返回：`boolean` 模块是否安装并启用

代码示例
```php
// 模块Member是否安装并启用
modstart_module_enabled('Member')
// 模块Member是否安装了 >=1.2.0 的版本
modstart_module_enabled('Member','>=1.2.0')
```

### L 多语言


获取多语言翻译

`L( $name, ...$params )`
- 参数：`$name` `string` 多语言
- 参数：`...$params` `any` 多语言参数
- 返回：`string` 多语言翻译

代码示例
```php
// 返回 消息
L('Message');
// 返回 文件最大为10M
L('File Size Limit %s','10M');
```

## 数据库 ModelUtil

### model 构建模型

`ModelUtil::model( $model )`
- 参数：`$model` `string` 数据表
- 返回：`Model` 数据库模型

代码示例
```php
// 按条件查询
ModelUtil::model('user')->where(['id'=>1])->get()->toArray();
ModelUtil::model('user')->where('id','>',5)->get()->toArray();
// LIKE
ModelUtil::model('user')->where('username','like','%keywords%')->get()->toArray();
// 原生SQL
ModelUtil::model('user')->whereRaw(DB::raw('id > 0 OR id is null'))->get()->toArray();
```

### insert 插入数据

`ModelUtil::insert( $model, $data )`
- 参数：`$model` `string` 数据表
- 参数：`$data` `array` 数据数组
- 返回：`array` 插入的数据记录

代码示例
```php
ModelUtil::insert('user',['username'=>'aaa','nickname'=>'bbb']);
```

### insertAll 插入多条数据

`ModelUtil::insertAll( $model, $datas, $updateTimestamp )`
- 参数：`$model` `string` 数据表
- 参数：`$datas` `array` 多条数据数组
- 参数：`$updateTimestamp` `boolean` 是否更新时间戳，默认为true
- 返回：`void` 

代码示例
```php
ModelUtil::insertAll('user',[ ['username'=>'aaa','nickname'=>'bbb'], ['username'=>'ccc','nickname'=>'ddd'] ]);
```

### delete 删除记录

`ModelUtil::delete( $model, $where )`
- 参数：`$model` `string` 数据表
- 参数：`$where` `array|int` 条件数组或数据ID
- 返回：`integer` 被删除的记录数量

代码示例
```php
// 删除ID为1的用户
ModelUtil::delete('user',1);
// 删除用户名为aaa的用户
ModelUtil::delete('user',['username'=>'aaa']);
```

### update 更新数据表

`ModelUtil::update( $model, $where, $data )`
- 参数：`$model` `string` 数据库
- 参数：`$where` `int|array` 更新条件
- 参数：`$data` `array` 更新的数据数组
- 返回：`int|null` 返回更新的数量，如果是0或null表示没有更新数据

代码示例
```php
ModelUtil::update('user',1,['password'=>'123456']);
ModelUtil::update('user',['username'=>'xxx'],['password'=>'123456']);
```

### get 获取单条记录

`ModelUtil::get( $model, $where, $fields, $order )`
- 参数：`$model` `string` 数据表
- 参数：`$where` `int|array` 条件
- 参数：`$fields` `array` 数据表字段
- 参数：`$order` `array` 排序，如 ['id','asc']
- 返回：`array|null` 数据记录

代码示例
```php
ModelUtil::get('user',1);
ModelUtil::get('user',['username'=>'xxx']);
```

## 文件 FileUtil

### formatByte 格式化字节

`FileUtil::formatByte( $bytes, $decimals )`
- 参数：`$bytes` `integer` 字节数
- 参数：`$decimals` `integer` 小数最多保留位数，默认为2
- 返回：`void` string

代码示例
```php
// 返回 1 MB
FileUtil::formatByte(1024*1024)
// 返回 1.5 GB
FileUtil::formatByte(1024*1024*1024*1.5)
```

## ID生成 IdUtil

### generate 带前缀的ID


一般用于页面渲染时页面元素唯一ID

`IdUtil::generate( string )`
- 参数：`string` `$group` 
- 返回：`string` 生成的ID字符串

代码示例
```php
// 将生成 Aaa_1 Aaa_2 Aaa_3
IdUtil::generate('Aaa')
```

### next64BitId 获取64位ID

`IdUtil::next64BitId(  )`
- 返回：`string` ID字符串

### generateSN 生成订单号


一个19位长的（BigInteger）

`IdUtil::generateSN(  )`
- 返回：`void` string

代码示例
```php
// 生成 20210101010101+12121
IdUtil::generateSN()
```

## 二维码 QrcodeUtil

### png 生成二维码


生成PNG格式的二维码图片

`QrcodeUtil::png( $content, $size )`
- 参数：`$content` `string` 二维码内容
- 参数：`$size` `integer` 大小，默认200
- 返回：`string` 图片二进制串

### pngBase64String 生成二维码


生成二维码Base64串

`QrcodeUtil::pngBase64String( $content, $size )`
- 参数：`$content` `string` 二维码内容
- 参数：`$size` `integer` 大小，默认200
- 返回：`string` 二维码Base64字符串

代码示例
```php
// 返回 data:image/png;base64,xxxxxxxx
QrcodeUtil::pngBase64String('http://www.xxx.com')
```

## 随机字符串 RandomUtil

### number 随机数字

`RandomUtil::number( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### string 随机字符串

`RandomUtil::string( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### readableString 随机可读字符串


去掉0、O等相似字符

`RandomUtil::readableString( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### hexString 随机Hex字符串

`RandomUtil::hexString( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### lowerString 随机小写字符串

`RandomUtil::lowerString( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### lowerChar 随机小写字符串


只包含字母

`RandomUtil::lowerChar( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### upperChar 随机大写字符串


只包含字母

`RandomUtil::upperChar( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### upperString 随机大写字符串

`RandomUtil::upperString( $length )`
- 参数：`$length` `integer` 长度
- 返回：`string` 字符串

### uuid 随机UUID


使用年月日构造

`RandomUtil::uuid(  )`
- 返回：`string` UUID
