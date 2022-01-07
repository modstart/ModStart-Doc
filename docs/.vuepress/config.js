const path = require('path')

module.exports = {
    base: '/doc/',
    head: [
        ['link', {rel: 'shortcut icon', type: "image/x-icon", href: `favicon.ico`}],
        ['script', {}, `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5f8b495b287894a451c761c963e6e34a";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`],
    ],
    locales: {
        '/': {
            lang: '简体中文',
            title: 'ModStart开发者文档',
            description: '基于Laravel的极速开发框架'
        },
        // '/en/': {
        //     lang: 'English',
        //     title: 'ModStart',
        //     description: 'A Laravel Quick Develop Framework'
        // }
    },
    themeConfig: {
        nav: [
            {
                text: "首页",
                link: "https://modstart.com",
            },
            {
                text: "安装升级",
                items: [
                    {text: '系统介绍', link: '/guide.html'},
                    {text: '安装说明', link: '/install/start.html'},
                    {text: '宝塔安装', link: '/install/baota.html'},
                    {text: 'PHPStudy安装', link: '/install/phpstudy.html'},
                    {text: 'Docker安装', link: '/install/docker.html'},
                    {text: 'WampServer安装', link: '/install/wampserver.html'},
                    {text: '升级指引', link: '/install/upgrade.html'},
                    {text: '常见问题', link: '/install/qa.html'},
                ]
            },
            {
                text: "开发手册",
                items: [
                    {text: '系统架构', link: '/manual/arch.html'},
                    {text: '模块开发', link: '/manual/module.html'},
                    {text: '快速CRUD', link: '/manual/crud.html'},
                    {text: '数据表格', link: '/manual/grid.html'},
                    {text: '数据表单', link: '/manual/form.html'},
                    {text: '数据详情', link: '/manual/detail.html'},
                    {text: '前端开发', link: '/manual/frontend.html'},
                    {text: '主题开发', link: '/manual/template.html'},
                    {text: '多语言I18N', link: '/manual/i18n.html'},
                    {text: 'Hook', link: '/manual/hook.html'},
                    {text: '调度和队列', link: '/manual/schedule.html'},
                ],
            },
            {
                text: "CMS教程",
                items: [
                    {text: '主题开发教程', link: '/cms/theme.html'},
                    {text: 'Blade模板教程', link: '/cms/blade.html'},
                ]
            },
            {
                text: "常用工具",
                items: [
                    {text: "开发者助手", link: "/tools/module-developer.html"},
                    {text: "工具箱", link: "https://tools.tecmz.com"}
                ],
            },
            {
                text: "更新日志",
                link: "/change-log.html",
            },
        ],
        sidebar: 'auto',
        sidebarDepth: 2,
    },
    markdown: {
        lineNumbers: true
    },
    plugins: [
        [
            '@vuepress/back-to-top'
        ],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).fromNow()
                }
            }
        ]
    ],
    configureWebpack: () => {
        const NODE_ENV = process.env.NODE_ENV
        console.log('hello', NODE_ENV)
        if (NODE_ENV === 'production') {
            return {
                output: {
                    publicPath: 'https://www.ms.modstart.com/doc/'
                },
            }
        } else {
            return {}
        }
    }
}
