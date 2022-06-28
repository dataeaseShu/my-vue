<template>
  <div class="logic" :style="marginLeft">
    <div class="logic-left">
      <div class="operate-title">
        <span
          style="
             {
              color: '#bfbfbf';
            }
          "
          class="mrg-title"
          v-if="x"
        >
          {{ andOr ? "或" : "且" }}
        </span>
        <el-dropdown @command="handleCommand" trigger="click" v-else>
          <span
            style="
               {
                color: 'rgba(0,0,0,.65)';
              }
            "
            class="mrg-title"
          >
            {{ andOr ? "或" : "且" }}<i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="false">且</el-dropdown-item>
            <el-dropdown-item :command="true">或</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <span class="operate-icon">
        <el-tooltip
          class="item"
          effect="light"
          content="切换最外侧关系节点类型时，所有关系都会切换，内外层关系必然相反"
          placement="top-end"
        >
          <i v-if="!x" class="el-icon-warning-outline"></i>
        </el-tooltip>
        <i class="el-icon-delete" @click="$emit('removeRelationList')"></i>
      </span>
    </div>
    <div class="logic-right">
      <template v-for="(item, index) in relationList">
        <logic-relation
          :x="item.x"
          @del="(index) => del(index, item.child)"
          @addCondRela="(type, andOr) => add(type, item.child, andOr)"
          v-if="item.child"
          :key="index"
          :andOr="item.andOr"
          @removeRelationList="removeRelationList(index)"
          :relationList="item.child"
        >
        </logic-relation>
        <filter-filed
          :item="item"
          @del="$emit('del')"
          :key="index"
          v-else
        ></filter-filed>
      </template>
      <div class="logic-right-add">
        <button @click="addCondRela('condition')" class="operand-btn">
          + 添加条件
        </button>
        <button @click="addCondRela('relation')" class="operand-btn">
          + 添加关系
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import filterFiled from "./filterFiled";
export default {
  name: "LogicRelation",
  props: {
    relationList: {
      type: Array,
      default: () => [],
    },
    x: {
      type: Number,
      default: 0,
    },
    andOr: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    filterFiled,
  },
  computed: {
    marginLeft() {
      return {
        marginLeft: this.x ? "20px" : 0,
      };
    },
  },
  methods: {
    handleCommand(type) {
      this.$emit('update:andOr', type); 
      this.$emit("changeAndOrDfs", type)
    },
    removeRelationList(index) {
      this.relationList.splice(index, 1);
    },
    addCondRela(type) {
      this.$emit("addCondRela", type, !this.andOr);
    },
    add(type, child, andOr) {
      child.push(type === "condition" ? { value: "" } : { child: [], andOr });
    },
    del(index, child) {
      child.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scope>
.logic {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;

  .logic-left {
    box-sizing: border-box;
    width: 48px;
    display: flex;
    position: relative;
    flex-direction: row;
    z-index: 10;

    .operate-title {
      font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
      word-wrap: break-word;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 65px;
      background-color: #f8f8fa;
      line-height: 28px;
      position: relative;
      z-index: 1;
      height: 28px;

      .mrg-title {
        text-align: left;
        white-space: pre;
        cursor: not-allowed;
        box-sizing: border-box;
        position: relative;
        display: block;
        margin-left: 11px;
        margin-right: 11px;
        line-height: 28px;
        height: 28px;

        i {
        font-size: 12px;
      }
      }
    }

    &:hover {
      .operate-icon {
        display: flex;
        align-items: center;
      }
    }

    .operate-icon {
      width: 40px;
      height: 28px;
      line-height: 28px;
      background-color: #f8f8fa;
      z-index: 1;
      display: none;

      i {
        font-size: 12px;
        font-style: normal;
        display: unset;
        padding: 5px 3px;
        cursor: pointer;
        position: relative;
        z-index: 10;
      }
    }
  }

  .logic-right-add {
    display: flex;
    height: 41.4px;
    align-items: center;
    padding-left: 26px;

    .operand-btn {
      box-sizing: border-box;
      font-weight: 400;
      text-align: center;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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