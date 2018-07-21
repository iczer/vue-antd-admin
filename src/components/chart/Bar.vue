<template>
  <div >
    <h4>{{title}}</h4>
    <v-chart :force-fit="true" height="251" :data="data">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y"/>
    </v-chart>
  </div>
</template>

<script>

const data = []
for (let i = 0; i < 12; i += 1) {
  data.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]

const scale = [{
  dataKey: 'x',
  min: 2
}, {
  dataKey: 'y',
  title: '时间',
  min: 1,
  max: 22
}]
export default {
  name: 'Bar',
  props: ['title'],
  data () {
    return {
      data,
      scale,
      tooltip
    }
  }
}
</script>

<style scoped>

</style>
