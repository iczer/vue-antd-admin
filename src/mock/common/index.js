const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
]

const positions = [
  'JAVA工程师 | 蚂蚁金服-计算服务事业群-微信平台部',
  '前端工程师 | 蚂蚁金服-计算服务事业群-VUE平台',
  '前端工程师 | 蚂蚁金服-计算服务事业群-REACT平台',
  '产品分析师 | 蚂蚁金服-计算服务事业群-IOS平台部'
]

const sayings = [
  '那是一种内在的东西，他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么'
]

const logos = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'
]

const admins = ['ICZER', 'JACK', 'LUIS', 'DAVID']

const groups = ['高逼格设计天团', '中二少女团', '科学搬砖组', '骗你学计算机', '程序员日常']

const users = [
  {
    name: '曲丽丽',
    avatar: avatars[0],
    groupId: 0
  },
  {
    name: '付晓晓',
    avatar: avatars[1],
    groupId: 0
  },
  {
    name: '林东东',
    avatar: avatars[2],
    groupId: 1
  },
  {
    name: '周星星',
    avatar: avatars[3],
    groupId: 2
  },
  {
    name: '朱偏右',
    avatar: avatars[4],
    groupId: 3
  },
  {
    name: '勒个',
    avatar: avatars[5],
    groupId: 4
  }
]

const teams = groups.map((item, index) => {
  return {
    name: item,
    avatar: avatars[index]
  }
})

export {logos, sayings, positions, avatars, admins, groups, users, teams}
