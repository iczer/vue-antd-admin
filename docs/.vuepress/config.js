module.exports = {
  title: 'Vue Antd Admin',
  description: 'Vue Antd Admin',
  base: '/vue-antd-admin-docs/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    repo: 'iczer/vue-antd-admin',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上帮助我们编辑此页',
    nav: [
      {text: '指南', link: '/'},
      {text: '配置', link: '/develop/layout'},
      {text: '主题', link: '/advance/theme'},
    ],
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: '开始',
        collapsable: false,
        children: [
          '/start/use', '/start/faq'
        ]
      },
      {
        title: '开发',
        collapsable: false,
        children: [
          '/develop/layout', '/develop/router', '/develop/page', '/develop/theme', '/develop/service', '/develop/mock'
        ]
      },
      {
        title: '进阶',
        collapsable: false,
        children: [
          '/advance/i18n', '/advance/async', '/advance/authority', '/advance/login', '/advance/guard', '/advance/interceptors',
          '/advance/api'
        ]
      },
      {
        title: '其它',
        collapsable: false,
        children: [
          '/other/upgrade', '/other/community'
        ]
      }
    ],
    nextLinks: true,
    prevLinks: true,
  },
  plugins: ['@vuepress/back-to-top', require('./plugins/alert')],
  markdown: {
    lineNumbers: true
  }
}
