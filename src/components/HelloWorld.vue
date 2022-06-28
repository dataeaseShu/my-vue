<template>
  <div class="logic" :style="marginLeft">
    <div class="logic-left">
      或
    </div>
    <div class="logic-right">
      <template v-for="(item, index) in relationList">
        <logic-relation :x="item.x"  @del="(index) => del(index, item.child)" @addCondRela="(type) => add(type, item.child)"  v-if="item.child"  :key="index" :relationList="item.child"></logic-relation>
        <filter-filed :item="item" @del="$emit('del')"   v-else :key="index"></filter-filed>
      </template>
      <div class="logic-right-add">
        <button @click="addCondRela('condition')" class="operand-btn">+ 添加条件</button>
        <button @click="addCondRela('relation')" class="operand-btn">+ 添加关系</button>
      </div>
    </div>
  </div>
</template>

<script>
import filterFiled from './filterFiled'
export default {
  name: 'LogicRelation',
  props: {
    relationList: {
      type: Array,
      default: () => []
    },
    x: {
      type: Number,
      default: 0
    },
  },
  components: {
    filterFiled
  },
  computed: {
    marginLeft() {
      return {
        marginLeft: this.x ? '20px' : 0
      }
    }
  },
  methods: {
    addCondRela(type) {
      this.$emit('addCondRela', type)
    },
    add(type, child) {
      child.push(type === 'condition' ? { value: ''} : { child: [] })
    },
    del(index, child) {
      child.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scope>
.logic {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  .logic-left {
    // --antd-wave-shadow-color: #2e74ff;
    // -webkit-text-size-adjust: 100%;
    // -webkit-tap-highlight-color: rgba(0,0,0,0);
    // font-family: Alibaba-PuHuiTi-Regular,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
    word-wrap: break-word;
    box-sizing: border-box;
    color: rgba(0,0,0,.65);
    font-size: 12px;
    // font-variant: tabular-nums;
    // font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    outline: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 48px;
    background-color: #f8f8fa;
    line-height: 28px;
    height: 28px;
  }

  .logic-right-add {
    display: flex;
    height: 41.4px;
    align-items: center;
    padding-left: 26px;

    .operand-btn{
    box-sizing: border-box;
    font-weight: 400;
    text-align: center;
    box-shadow: 0 2px 0 rgba(0,0,0,.015);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    user-select: none;
    touch-action: manipulation;
    outline: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    -webkit-appearance: button;
    cursor: pointer;
    height: 28px;
    padding: 0 10px;
    margin-right: 10px;
    font-size: 12px;
    color: #246dff;
    background: #fff;
    border: 1px solid #246dff;
    border-radius: 2px;
    }
  }
}
</style>