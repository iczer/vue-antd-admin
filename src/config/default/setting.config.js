// 此配置为系统默认设置，需修改的设置项，在src/config/config.js中添加修改项即可。也可直接在此文件中修改。
module.exports = {
  lang: 'CN',                           //语言，可选 CN(简体)、HK(繁体)、US(英语)，也可扩展其它语言
  theme: {                              //主题
    color: '#1890ff',                   //主题色
    mode: 'dark',                       //主题模式 可选 dark、 light 和 night
    success: '#52c41a',                 //成功色
    warning: '#faad14',                 //警告色
    error: '#f5222f',                   //错误色
  },
  layout: 'side',                       //导航布局，可选 side 和 head，分别为侧边导航和顶部导航
  fixedHeader: false,                   //固定头部状态栏，true:固定，false:不固定
  fixedSideBar: true,                   //固定侧边栏，true:固定，false:不固定
  fixedTabs: false,                      //固定页签头，true:固定，false:不固定
  pageWidth: 'fixed',                   //内容区域宽度，fixed:固定宽度，fluid:流式宽度
  weekMode: false,                      //色弱模式，true:开启，false:不开启
  multiPage: false,                     //多页签模式，true:开启，false:不开启
  cachePage: true,                      //是否缓存页面数据，仅多页签模式下生效，true 缓存, false 不缓存
  hideSetting: false,                   //隐藏设置抽屉，true:隐藏，false:不隐藏
  systemName: 'Vue Antd Admin',         //系统名称
  copyright: '2018 ICZER 工作室出品',     //copyright
  asyncRoutes: false,                   //异步加载路由，true:开启，false:不开启
  showPageTitle: true,                  //是否显示页面标题（PageLayout 布局中的页面标题），true:显示，false:不显示
  filterMenu: true,                    //根据权限过滤菜单，true:过滤，false:不过滤
  animate: {                            //动画设置
    disabled: false,                    //禁用动画，true:禁用，false:启用
    name: 'bounce',                     //动画效果，支持的动画效果可参考 ./animate.config.js
    direction: 'left'                   //动画方向，切换页面时动画的方向，参考 ./animate.config.js
  },
  footerLinks: [                        //页面底部链接，{link: '链接地址', name: '名称/显示文字', icon: '图标，支持 ant design vue 图标库'}
    {link: 'https://pro.ant.design', name: 'Pro首页'},
    {link: 'https://github.com/iczer/vue-antd-admin', icon: 'github'},
    {link: 'https://ant.design', name: 'Ant Design'}
  ],
}
