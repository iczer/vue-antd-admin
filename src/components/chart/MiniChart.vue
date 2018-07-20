<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-smooth-area position="time*value" />
    </v-chart>
  </div>
</template>

<script>
import 'viser-vue'

const data = [
  { time: 0, value: 23620 },
  { time: 2, value: 16100 },
  { time: 4, value: 15900 },
  { time: 6, value: 17409 },
  { time: 8, value: 17000 },
  { time: 10, value: 31056 },
  { time: 12, value: 31982 },
  { time: 14, value: 32040 },
  { time: 16, value: 33233 },
  { time: 18, value: 33233 },
  { time: 20, value: 33233 },
  { time: 22, value: 33233 }
]

const scale = [{
  dataKey: 'value',
  min: 10000
}, {
  dataKey: 'year',
  min: 0,
  max: 1
}]
export default {
  name: 'MiniChart',
  data () {
    return {
      data,
      scale,
      height: 400
    }
  }
}
</script>

<style scoped>

</style>
