import Mock from 'mockjs'
import {activities, templates} from '../common/activityData'
import {teams} from '../../mock/common'

activities.forEach(item => {
  item.template = templates[item.activity.type](item.user, item.activity)
})

Mock.mock('/work/activity', 'get', () => {
  return activities
})

Mock.mock('/work/team', 'get', () => {
  return teams
})
