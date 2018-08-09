import {users, groups} from './index'

const events = [
  {
    type: 0,
    event: '八月迭代'
  },
  {
    type: 1,
    event: '留言'
  },
  {
    type: 2,
    event: '项目进展'
  }
]

const activities = users.map((user, index) => {
  return {
    user: Object.assign({}, user, {group: groups[user.groupId]}),
    activity: events[index % events.length],
    template: ''
  }
})

const templates = [
  (user, activity) => { return `${user.name} 在 <a >${user.group}</a> 新建项目 <a>${activity.event}</a>` },
  (user, activity) => { return `${user.name} 在 <a >${user.group}</a> 发布了 <a>${activity.event}</a>` },
  (user, activity) => { return `${user.name} 将 <a >${activity.event}</a> 更新至已发布状态` }
]

export {activities, templates}
