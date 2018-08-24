<template>
  <div style="display: flex">
    <task-card style="margin: 0 48px" title="ToDo">
      <draggable :options="{group: 'a', sort: true, scroll: true, scrollSpeed: 2, animation: 250, ghostClass: 'ghost', chosenClass: 'chose'}">
        <task-item :key="index" v-for="(item, index) in todoList" :content="item" />
      </draggable>
    </task-card>
    <task-card style="margin: 0 48px" title="In Progress">
      <draggable :options="{group: 'a', sort: true, scroll: true, scrollSpeed: 2, animation: 250, ghostClass: 'ghost', chosenClass: 'chose'}">
        <task-item :key="index" v-for="(item, index) in inproList" :content="item" />
      </draggable>
    </task-card>
    <task-card style="margin: 0 48px" title="Done">
      <draggable :options="{group: 'a', sort: true, scroll: true, scrollSpeed: 2, animation: 250, ghostClass: 'ghost', chosenClass: 'chose'}">
        <task-item :key="index" v-for="(item, index) in doneList" :content="item" />
      </draggable>
    </task-card>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import TaskItem from './TaskItem'
import Draggable from 'vuedraggable'
const todoList = ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六']
const inproList = ['任务七', '任务八', '任务九', '任务十', '任务十一', '任务十二']
const doneList = ['任务十三', '任务十四', '任务十五', '任务十六', '任务十七', '任务十八']
export default {
  name: 'Index',
  components: {TaskItem, TaskCard, Draggable},
  data () {
    return {
      todoList,
      inproList,
      doneList
    }
  }
}
</script>

<style lang="less">
  .ghost{
    background-color: rgba(256, 256, 256, 0.5);
  }
  .chose{
    border: 1px dashed #aaaaaa;
  }
</style>
