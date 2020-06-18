const direct_s = ['left', 'right']
const direct_1 = ['down', 'up', 'left', 'right']
const direct_1_b = ['downBig', 'upBig', 'leftBig', 'rightBig']
const direct_2 = ['topLeft', 'bottomRight', 'topRight', 'bottomLeft']
const direct_3 = ['downLeft', 'upRight', 'downRight', 'upLeft']

module.exports = [
  {name: 'back', alias: '后位', directions: direct_1},
  {name: 'bounce', alias: '弹跳', directions: direct_1.concat('default')},
  {name: 'fade', alias: '淡化', directions: direct_1.concat(direct_1_b).concat(direct_2).concat('default')},
  {name: 'flip', alias: '翻转', directions: ['x', 'y', 'default']},
  {name: 'lightSpeed', alias: '光速', directions: direct_s},
  {name: 'rotate', alias: '旋转', directions: direct_3.concat('default')},
  {name: 'roll', alias: '翻滚', directions: ['default']},
  {name: 'zoom', alias: '缩放', directions: direct_1.concat('default')},
  {name: 'slide', alias: '滑动', directions: direct_1},
]
