<template>
  <div draggable>
    <div draggable>
      123
    </div>
    <div draggable style="height: 200px;width: 300px; border: 1px solid red">
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Sortable from './sortable.core.esm.js'
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    mounted() {
      // document.addEventListener('mousemove', this.LogXy)
        this.rowDrop()
    },
    methods: {
      LogXy() {
        console.log('x, y');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      rowDrop() {
      const _this = this
      const el = document.querySelector('.el-tabs__nav')
      const header = document.querySelector('.el-tabs__header')
      header.onmousedown = (e) => {
        e.stopPropagation()
        console.log('.el-tabs__nav', e, el, header);
      }
      console.log('.de-tabs .el-tabs__nav', el);
      Sortable.create(el, {
        // 元素被选中
        onChoose: function (/**Event*/evt) {
          console.log(3, evt);
        },
        // 开始拖拽的时候
        onStart: function (/**Event*/evt) {
            console.log(1, evt);
        },
        onEnd({ newIndex, oldIndex }) {    
          console.log('newIndex, oldIndex', newIndex, oldIndex);                         //oldIIndex拖放前的位置， newIndex拖放后的位置
        }
      })
    },
    }
  };
</script>