module.exports = {
  title: 'Vue Antd Admin',
  description: 'Vue Antd Admin',
  base: '/vue-antd-admin/',
  themeConfig: {
    logo: '/logo.png',
    repo: 'iczer/vue-antd-admin',
    docsDir: 'docs',
    editLinks: true,
    nav: [
      {text: '指南', link: '/'},
      {text: '配置', link: '/develop/'},
      {text: '主题', link: '/advance/theme'},
    ],
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: '开始',
        path: '/start/',
        collapsable: false,
        children: [
          '/start/use', '/start/faq'
        ]
      },
      {
        title: '开发',
        path: '/develop/',
        collapsable: false,
        children: [
          '/develop/block', '/develop/layout', '/develop/router', '/develop/page', '/develop/theme', '/develop/service', '/develop/mock'
        ]
      },
      {
        title: '进阶',
        path: '/advance/',
        collapsable: false,
        children: [
          '/advance/i18n', '/advance/chart', '/advance/theme', '/advance/error', '/advance/authority'
        ]
      },
      {
        title: '其它',
        path: '/other/',
        collapsable: false,
        children: [
          '/other/upgrade', '/other/community'
        ]
      }
    ],
    nextLinks: true,
    prevLinks: true,
  }
}
