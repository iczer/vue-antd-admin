import Mock from 'mockjs'
import {logos, sayings, positions, avatars, admins} from '../common'

const Random = Mock.Random

const timeList = [
  {
    CN: '早上好',
    HK: '早晨啊',
    US: 'Good morning',
  },{
    CN: '上午好',
    HK: '上午好',
    US: 'Good morning',
  },{
    CN: '中午好',
    HK: '中午好',
    US: 'Good afternoon',
  },{
    CN: '下午好',
    HK: '下午好',
    US: 'Good afternoon',
  },{
    CN: '晚上好',
    HK: '晚上好',
    US: 'Good evening',
  }
]

const welcomeMessages = [
  {
    CN: '休息一会儿吧',
    HK: '休息一會兒吧',
    US: 'you may need a break',
  },
  {
    CN: '准备吃什么呢',
    HK: '準備吃什麼呢',
    US: 'what are you going to eat',
  },
  {
    CN: '要不要打一把 DOTA',
    HK: '要不要打一把 DOTA',
    US: 'how about a game of DOTA',
  },
  {
    CN: '我猜你可能累了',
    HK: '我猜你可能累了',
    US: 'i guess you might be tired',
  }
]

const goods = ['运动鞋', '短裤', 'T恤', '七分裤', '风衣', '寸衫']

Random.extend({
  admin () {
    return this.pick(admins)
  },
  welcome () {
    return this.pick(welcomeMessages)
  },
  timeFix () {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9
      ? timeList[0] : (hour <= 11 ? timeList[1] : (hour <= 13 ? timeList[2] : (hour <= 20 ? timeList[3] : timeList[4])))
  },
  avatar () {
    return this.pick(avatars)
  },
  position () {
    return this.pick(positions)
  },
  goods () {
    return this.pick(goods)
  },
  saying () {
    return this.pick(sayings)
  },
  logo () {
    return this.pick(logos)
  }
})
