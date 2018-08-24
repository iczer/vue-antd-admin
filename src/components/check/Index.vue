<template>
  <div style="text-align: center; margin-top: 48px">
    <color-check-box-group :defaultValues="['1']" @change="changeColor" :multiple="true" style="display: inline-block">
      <color-check-box color="rgb(245, 34, 45)" value="1" />
      <color-check-box color="rgb(250, 84, 28)" value="2" />
      <color-check-box color="rgb(250, 173, 20)" value="3" />
      <color-check-box color="rgb(19, 194, 194)" value="4" />
      <color-check-box color="rgb(82, 196, 26)" value="5" />
      <color-check-box color="rgb(24, 144, 255)" value="6" />
      <color-check-box color="rgb(47, 84, 235)" value="7" />
      <color-check-box color="rgb(114, 46, 209)" value="8" />
      <color-check-box color="rgb(256, 0, 0)" value="9" />
      <color-check-box color="rgb(0, 256, 0)" value="10" />
      <color-check-box color="rgb(0, 0, 256)" value="11" />
      <color-check-box color="rgb(256, 256, 0)" value="12" />
    </color-check-box-group>
    <div></div>
    <div class="view-color" :style="{backgroundColor: color}"/>
  </div>
</template>

<script>
import ColorCheckBox from './ColorCheckBox'

const ColorCheckBoxGroup = ColorCheckBox.Group

export default {
  name: 'Index',
  data () {
    return {
      color: 'rgb(245, 34, 45)'
    }
  },
  components: {ColorCheckBox, ColorCheckBoxGroup},
  methods: {
    changeColor (values, colors) {
      this.color = this.calculateColor(colors)
    },
    calculateColor (colors) {
      let red = 0
      let green = 0
      let blue = 0
      let values
      colors.forEach(color => {
        values = color.split('(')[1].split(')')[0].split(',')
        red = Math.max(red, parseInt(values[0]))
        green += Math.max(green, parseInt(values[1]))
        blue += Math.max(blue, parseInt(values[2]))
      })
      return 'rgb(' + red + ',' + green + ',' + blue + ')'
    }
  }
}
</script>

<style lang="less" scoped>
  .view-color{
    margin-top: 48px;
    display: inline-block;
    height: 96px;
    width: 96px;
    border-radius: 48px;
    border: 1px dashed gray;
  }
</style>
