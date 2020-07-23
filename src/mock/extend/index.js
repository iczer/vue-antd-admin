import Mock from 'mockjs'
import {positions, avatars, admins} from '../common'

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

Random.extend({
  admin () {
    return this.pick(admins)
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
  }
})
