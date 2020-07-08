<template>
  <div class="task-group">
    <div class="task-head">
      <h3 class="title"><span v-if="count">{{count}}</span>{{title}}</h3>
      <div class="actions" style="float: right">
        <a-icon class="add" type="plus" draggable="true"/>
        <a-icon class="more" style="margin-left: 8px" type="ellipsis" />
      </div>
    </div>
    <div class="task-content">
      <draggable :options="dragOptions">
        <slot></slot>
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

const dragOptions = {
  sort: true,
  scroll: true,
  scrollSpeed: 2,
  animation: 150,
  ghostClass: 'dragable-ghost',
  chosenClass: 'dragable-chose',
  dragClass: 'dragable-drag'
}

export default {
  name: 'TaskGroup',
  components: {Draggable},
  props: ['title', 'group'],
  data () {
    return {
      dragOptions: {...dragOptions, group: this.group}
    }
  },
  computed: {
    count () {
      return this.$slots.default.length
    }
  }
}
</script>

<style lang="less">
  .task-group{
    width: 33.33%;
    padding: 8px 8px;
    background-color: @background-color-light;
    border-radius: 6px;
    border: 1px solid @shadow-color;
    .task-head{
      margin-bottom: 8px;
      .title{
        display: inline-block;
        span{
          display: inline-block;
          border-radius: 10px;
          margin: 0 8px;
          font-size: 12px;
          padding: 2px 6px;
          background-color: @base-bg-color;
        }
      }
      .actions{
        display: inline-block;
        float: right;
        font-size: 18px;
        font-weight: bold;
        i{
          cursor: pointer;
        }
      }
    }
  }
</style>
