# 应用入门开发开发



以一个博客管理的后台增删改查页面为例，完成博客的管理。



## 数据库迁移文件

在数据库迁移目录增加数据库迁移文件，内容如下

文件路径：`database/migrations/2021_01_12_000000_create_blog.php`

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateBlog extends Migration
{
    public function up()
    {
        Schema::create('blog', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('title', 200)->nullable()->comment('标题');
            $table->string('cover', 200)->nullable()->comment('封面');
            $table->string('summary', 200)->nullable()->comment('摘要');
            $table->text('content')->nullable()->comment('内容');
        });
    }
    public function down()
    {
        // 数据库回滚是比较危险的操作，推荐使用人工代替
    }
}

```

完成，在命令行运行迁移文件脚本

```shell
php artisan migrate
```

> 执行成功会提示 Migrated: 2021_01_12_000000_create_blog



## 增加路由和菜单导航

增加后台管理控制器路由（ 文件 `app/Admin/routes.php` ）

```php
<?php
Route::group(
    [
        'prefix' => env('ADMIN_PATH', '/admin/'),
        'middleware' => ['admin.bootstrap', 'admin.auth'],
        'namespace' => '\App\Admin\Controller',
    ], function () {

    Route::match(['get', 'post'], '', 'IndexController@index');
    // 增加路由开始
    Route::match(['get', 'post'], 'blog', 'BlogController@index');
    Route::match(['get', 'post'], 'blog/add', 'BlogController@add');
    Route::match(['get', 'post'], 'blog/edit', 'BlogController@edit');
    Route::match(['get', 'post'], 'blog/delete', 'BlogController@delete');
    Route::match(['get', 'post'], 'blog/show', 'BlogController@show');
    // 增加路由结束
});
```

增加导航菜单（ 文件 `app/Admin/Core/ModuleServiceProvider.php` ）

```php
// ...
public function boot(Dispatcher $events)
{
  AdminMenu::register(function () {
    return [
      [
        'title' => '系统概况',
        'icon' => 'home',
        'sort' => 50,
        'url' => '\App\Admin\Controller\IndexController@index',
      ],
      // 增加导航开始
      [
        'title' => '博客管理',
        'icon' => 'list',
        'sort' => 150,
        'url' => '\App\Admin\Controller\BlogController@index',
      ]
      // 增加导航结束
    ];
  });
}
// ...
```



## 编写CRUD逻辑

创建博客增删改查页面，实现逻辑（文件 `app/Admin/Controller/BlogController.php`)

```php
<?php
namespace App\Admin\Controller;

use Illuminate\Routing\Controller;
use ModStart\Admin\Concern\HasAdminCRUD;
use ModStart\Detail\Detail;
use ModStart\Form\Form;
use ModStart\Grid\Grid;

class BlogController extends Controller
{
    use HasAdminCRUD;
    public function grid()
    {
        $grid = Grid::make('blog');
        $grid->id('id', 'ID');
        $grid->text('title', '标题');
        $grid->image('cover', '封面');
        $grid->textarea('summary', '摘要');
        $grid->richHtml('content', '内容');
        $grid->display('created_at', '创建时间');
        $this->pageTitle('博客管理');
        return $grid;
    }
    public function form()
    {
        $form = Form::make('blog');
        $form->text('title', '标题');
        $form->image('cover', '封面');
        $form->textarea('summary', '摘要');
        $form->richHtml('content', '内容');
        return $form;
    }
    public function detail()
    {
        $detail = Detail::make('blog');
        $detail->id('id', 'ID');
        $detail->display('created_at', '创建时间');
        $detail->text('title', '标题');
        $detail->image('cover', '封面');
        $detail->textarea('summary', '摘要');
        $detail->richHtml('content', '内容');
        return $detail;
    }
}
```



以上三步，即可实现博客的基础增删改查操作。

`grid`方法对应数据的`表格`页，参考[数据表格](/manual/grid.html)来实现列表页的相关功能逻辑。

`detail`方法对应数据的`详情`页，在列表页操作列的`查看`按钮点击进入，参考[数据详情](/manual/detail.html)来实现详情页的相关功能逻辑。

`form`方法对应数据的`创建`和`编辑`页，参考[数据表单](/manual/form.html)来实现数据创建和编辑页的相关功能逻辑。



## 成果预览

### 后台博客管理页面

![后台博客管理界面](https://ms-assets.modstart.com/data/image/2022/01/12/25799_kgwn_5678.jpeg)

### 博客增加/编辑页面

![博客增加/编辑页面](https://ms-assets.modstart.com/data/image/2022/01/12/25800_o5hi_6325.jpeg)

### 博客查看页面

![博客查看页面](https://ms-assets.modstart.com/data/image/2022/01/12/25799_hmez_3663.jpeg)
