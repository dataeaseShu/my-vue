<template>
  <div>
    <div class="filed" @mouseover="showDel = true" @mouseleave="showDel = false">
    <span class="filed-title">筛选字段</span>

    <el-dropdown trigger="click" :hide-on-click="false">
      <el-input
        placeholder="请选择筛选字段"
        v-model="input"
        size="mini"
        @input="cancel"
        @keypress="onDeleteKeyDown"
      >
      </el-input>
      <el-dropdown-menu class="de-el-dropdown-menu" slot="dropdown">
        <el-input
          placeholder="请输关键字"
          prefix-icon="el-icon-search"
          v-model="input2"
        >
        </el-input>
        <ul class="dimension">
          <li
            @click="select(item)"
            :style="{
              backgroundColor: activeName === item.name ? '#f0f7ff' : '',
            }"
            :key="item.name"
            v-for="item in dimensions"
          >
            {{ item.name }}
          </li>
        </ul>
      </el-dropdown-menu>
    </el-dropdown>
    <div style="position: relative" v-if="input">
      <span class="filed-title">筛选方式</span>
      <el-select v-model="filterType" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span class="filed-title">固定值</span>
      <template v-if="filterType === '选项1'">
        <el-select class="w100" v-model="fixedValue" placeholder="默认条件">
          <el-option
            v-for="item in operators"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input-number
          class="w70"
          v-model="num"
          controls-position="right"
        ></el-input-number>
        <div class="bottom-line"></div>
      </template>

      <el-dropdown
        v-else
        trigger="click"
        ref="deElDropdownMenuFixed"
        :hide-on-click="false"
      >
        <el-input
          v-model="fixValueList"
          size="mini"
          @input="cancelfixValue"
          clearable
          @clear="clearAll"
        >
        </el-input>
        <el-dropdown-menu class="de-el-dropdown-menu-fixed" slot="dropdown">
          <div class="de-panel clearfix">
            <div class="mod-left">
              <el-input placeholder="输入关键字" v-model="filterFiled">
              </el-input>
              <ul
                class="infinite-list autochecker-list"
                v-infinite-scroll="load"
                style="overflow: auto"
              >
                <li
                  :key="i"
                  v-for="i in checkListWithFilter"
                  class="infinite-list-item"
                  @click="checkItem(i)"
                >
                  <i
                    class="el-icon-check"
                    :style="{ opacity: checklist.includes(i) ? 1 : 0 }"
                  ></i>
                  <label>{{ i }}</label>
                  <span>+</span>
                </li>
              </ul>
              <button class="select-all" @click="selectAll">全 选</button>
            </div>
            <div class="mod-left right">
              <div class="right-top clearfix">
                已添加{{ checklist.length }}
                <div class="right-btn" v-clickoutside="handleClickOutside">
                  <span @click="cancelKeyDow">
                    <i class="el-icon-edit"></i>
                    手工输入
                  </span>
                  <transition name="el-zoom-in-top">
                    <div v-if="showTextArea" class="de-el-dropdown-menu-manu">
                      <div class="text-area">
                        <textarea
                          placeholder="请一行填一个，最多添加500个,识别录入时会自动过滤重复的选项和已经添加过的选项"
                          class="input"
                          v-model="textareaValue"
                        ></textarea>
                        <div class="text-area-btn">
                          <button
                            type="button"
                            @click="showTextArea = false"
                            class="btn left"
                          >
                            <span>关 闭</span>
                          </button>
                          <button
                            type="button"
                            @click="addFileds"
                            class="btn rigth"
                          >
                            <span>添 加</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
                <!-- <el-dropdown-menu
                    class="de-el-dropdown-menu-manu"
                    slot="dropdown"
                  >
                    
                  </el-dropdown-menu> -->
              </div>
              <ul class="infinite-list autochecker-list" style="overflow: auto">
                <li
                  :key="i"
                  v-for="(i, idx) in checklist"
                  class="infinite-list-item"
                >
                  <el-tooltip
                    class="item"
                    effect="light"
                    :content="i"
                    placement="top"
                    :open-delay="1000"
                  >
                    <label>{{ i }}</label>
                  </el-tooltip>
                  <i
                    class="el-icon-delete"
                    @click="delChecks(idx)"
                    style="opacity: 1"
                  ></i>
                </li>
              </ul>
              <div class="right-menu-foot">
                <div class="footer-left">已添加 {{ checklist.length }}</div>
                <div class="confirm-btn">确 定</div>
                <div class="footer-right">
                  <i class="el-icon-delete" @click="clearAll"></i>
                </div>
              </div>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <i
      v-if="showDel"
      class="el-icon-delete font12"
      @click="$emit('del', index)"
    ></i>
  </div>
  </div>
</template>

<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  directives: { Clickoutside },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showDel: false,
      input: "",
      input2: "",
      activeName: "",
      num: "",
      filedlist: ["123", "234", "456"],
      filterFiled: "",
      options: [
        {
          value: "选项1",
          label: "条件筛选",
        },
        {
          value: "选项2",
          label: "枚举筛选",
        },
      ],
      operators: [
        {
          value: "选项1",
          label: "大于",
        },
        {
          value: "选项2",
          label: "大于等于",
        },
        {
          value: "选项1",
          label: "小于",
        },
        {
          value: "选项2",
          label: "小于等于",
        },
        {
          value: "选项1",
          label: "等于",
        },
        {
          value: "选项2",
          label: "不等于",
        },
      ],
      showTextArea: false,
      filterType: "选项1",
      fixedValue: "",
      keydownCanceled: false,
      checklist: [],
      fixValueList: "",
      textareaValue: "",
      dimensions: [
        {
          type: "d",
          name: "test1",
        },
        {
          type: "m",
          name: "test2",
        },
      ],
    };
  },
  computed: {
    checkListWithFilter() {
      if (!this.filterFiled) return [...this.filedlist];
      return this.filedlist.filter((ele) => ele.includes(this.filterFiled));
    },
    checkResult() {
      return this.checklist.join(",");
    },
  },
  watch: {
    checkResult() {
      this.cancelfixValue();
    },
  },
  methods: {
    cancelKeyDow() {
      if (!this.showTextArea && !this.keydownCanceled) {
        this.keydownCanceled = true;
        const { dropdownElm, handleItemKeyDown } =
          this.$refs.deElDropdownMenuFixed;
        dropdownElm.removeEventListener("keydown", handleItemKeyDown, true);
      }
      this.showTextArea = true;
    },
    cancel() {
      this.input = this.activeName || "";
    },
    cancelfixValue() {
      console.log(1, 2);
      this.fixValueList = this.checkResult || "";
    },
    delChecks(idx) {
      this.checklist.splice(idx, 1);
    },
    select({ name }) {
      this.activeName = name;
      this.input = this.activeName;
    },
    load() {
      this.filedlist.push(+new Date() + "");
    },
    clearAll() {
      // const hide = this.$refs.deElDropdownMenuFixed.hide;
      // this.$refs.deElDropdownMenuFixed.hide = () => {}
      // setTimeout(() => {
      //   this.$refs.deElDropdownMenuFixed.hide = hide
      // }, 500)
      this.checklist = [];
    },
    selectAll() {
      this.checkListWithFilter.forEach((ele) => {
        if (!this.checklist.includes(ele)) {
          this.checklist.push(ele);
        }
      });
    },
    addFileds() {
      const list = this.textareaValue.split("\n").reduce((pre, next) => {
        const str = next.trim();
        if (!str) return pre;
        pre.add(str);
        return pre;
      }, new Set([]));
      if (list.size) {
        this.checklist = [...this.checklist, ...list];
      }
      this.showTextArea = false;
    },
    checkItem(i) {
      const index = this.checklist.findIndex((ele) => ele === i);
      if (index === -1) {
        this.checklist.push(i);
      } else {
        this.delChecks(index);
      }
    },
    handleClickOutside() {
      this.showTextArea = false;
    },
    onDeleteKeyDown(e) {
      console.log(1, e);
    },
  },
};
</script>

<style lang="less" scoped>
.filed {
  height: 41.4px;
  padding: 1px 3px 1px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-left: 20px;
  min-width: 200px;
  justify-content: left;
  position: relative;

  .filed-title {
    word-wrap: break-word;
    line-height: 28px;
    color: #7e7e7e;
    font-size: 12px;
    white-space: nowrap;
    box-sizing: border-box;
    margin-right: 5px;
    display: inline-block;
    min-width: 50px;
    text-align: right;
  }

  .font12 {
    font-size: 12px;
    margin: 0 10px;
    cursor: pointer;
  }

  .el-input {
    width: 170px;
  }

  .w100.el-select {
    width: 100px;
  }

  .w70 {
    width: 70px;
  }
  /deep/.el-input-number__decrease,
  /deep/.el-input-number__increase {
    width: 20px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: none;
  }

  /deep/.el-input-number__decrease:hover {
    height: 16px;
    & + .el-input-number__increase {
      height: 8px;
    }
  }
  /deep/.el-input-number__increase:hover {
    height: 16px;
    & + .el-input-number__decrease {
      height: 8px;
    }
  }

  .bottom-line {
    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    font-variant: tabular-nums;
    font-feature-settings: "tnum";
    word-wrap: break-word;
    text-align: left;
    line-height: 28px;
    color: #7e7e7e;
    font-size: 12px;
    white-space: pre;
    box-sizing: border-box;
    height: 1px;
    background-color: #000;
    opacity: 0.3;
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 70px;
    z-index: 10;
  }

  /deep/.el-input-number.is-controls-right .el-input__inner {
    padding-right: 20px;
  }

  .el-input-number {
    line-height: 26px;
    height: 27px;
  }

  .el-select {
    /deep/.el-input__suffix-inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-input__icon {
        height: auto;
      }
    }
  }

  /deep/.el-input__inner {
    background-color: #f8f8fa;
    border: none;
    border-radius: 0;
    height: 26px;

    font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    word-wrap: break-word;
    text-align: left;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    font-variant: tabular-nums;
    font-feature-settings: "tnum";
    list-style: none;
    user-select: none;
    cursor: pointer;
    line-height: 26px;
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: 1;
  }

  i {
    margin-left: 5px;
    color: #7e7e7e;
  }
}
.filed:hover {
  background-color: #e9eaef;
  /deep/.el-input-number__decrease,
  /deep/.el-input-number__increase {
    display: flex;
  }
}
</style>

<style lang="less">
.de-el-dropdown-menu {
  .dimension {
    padding: 0;
    li {
      font-family: Alibaba-PuHuiTi-Regular, Helvetica Neue, Helvetica, Arial,
        PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
      font-variant: tabular-nums;
      font-feature-settings: "tnum";
      list-style: none;
      box-sizing: border-box;
      display: block;
      white-space: nowrap;
      cursor: pointer;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: relative;
      overflow: hidden;
      font-size: 12px;
      text-overflow: ellipsis;
      padding: 0 16px 0 28px;
      line-height: 32px;
      height: 32px;
      margin: 0;
      padding-left: 16px;
      color: rgba(0, 0, 0, 0.65);
    }
    li:hover {
      color: #2e74ff;
      background-color: #f0f7ff;
    }
  }

  .el-input__inner {
    font-family: inherit;
    overflow: visible;
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    display: inline-block;
    width: 100%;
    height: 28px;
    padding: 4px 7px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    line-height: 28px;
    background-color: #fff;
    background-image: none;
    transition: all 0.3s;
    -webkit-appearance: none;
    touch-action: manipulation;
    text-overflow: ellipsis;
    position: relative;
    text-align: inherit;
    min-height: 100%;
    border: 0;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 0;
    padding-left: 26px;

    &:focus {
      box-shadow: 0 0 0 2px rgb(46 116 255 / 20%);
      border-right-width: 1px !important;
      outline: 0;
      border-color: none;
    }
  }

  .el-input__prefix {
    font-family: Alibaba-PuHuiTi-Regular, Helvetica Neue, Helvetica, Arial,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    font-size: 12px;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    text-align: start;
    box-sizing: border-box;
    position: absolute;
    top: 26%;
    z-index: 2;
    color: rgba(0, 0, 0, 0.65);
    line-height: 0;
    transform: translateY(-50%);
    left: 8px;
  }

  .el-input {
    font-family: Alibaba-PuHuiTi-Regular, Helvetica Neue, Helvetica, Arial,
      PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    box-sizing: border-box;
    margin: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    text-align: start;
    padding: 0 6px;
  }
}

.de-el-dropdown-menu-fixed {
  .de-panel {
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    box-sizing: border-box;
    position: relative;
    padding: 0;
    width: 360px;
    max-width: 600px;
    min-height: 30px;
    background-color: #fff;
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.05);
    .mod-left {
      font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
      vertical-align: top;
      padding: 5px;
      width: 50%;
      height: 300px;
      float: left;
      box-sizing: border-box;
      .el-input__inner {
        font-family: inherit;
        overflow: visible;
        box-sizing: border-box;
        margin: 0;
        position: relative;
        display: inline-block;
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
        line-height: 28px;
        background-color: #fff;
        background-image: none;
        border-radius: 2px;
        transition: all 0.3s;
        -webkit-appearance: none;
        touch-action: manipulation;
        text-overflow: ellipsis;
        width: 100%;
        border-bottom: 1px solid hsla(0, 0%, 59%, 0.1);
        border: 1px solid hsla(0, 0%, 59%, 0.1);
        height: 30px;
        padding: 0 8px;
        outline: 0;

        &:focus {
          box-shadow: 0 0 0 2px rgb(46 116 255 / 20%);
          border-right-width: 1px !important;
          outline: 0;
          border-color: none;
        }
      }
    }

    .right {
      border-left: 1px solid hsla(0, 0%, 59%, 0.1);
    }
    .autochecker-list {
      font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
      color: rgba(0, 0, 0, 0.65);
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
      overflow-y: auto;
      height: 221px;
      position: relative;
      padding: 0;

      li {
        direction: ltr;
        padding: 0 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #333;
        white-space: nowrap;
        list-style: none;
        line-height: 28px;
        height: 28px;
        width: 100%;
        position: relative;
        box-sizing: border-box;

        &:hover {
          background-color: #f8f8fa;
          color: #2153d4;
          opacity: 1;
          span {
            display: block;
          }
        }

        i {
          color: #333;
          font-size: 12px;
          cursor: pointer;
          vertical-align: top;
          line-height: 28px;
          height: 28px;
          display: inline-block;
          opacity: 0;
        }

        label {
          font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei,
            sans-serif;
          font-size: 12px;
          direction: ltr;
          color: #333;
          box-sizing: border-box;
          touch-action: manipulation;
          width: 90%;
          height: 28px;
          line-height: 14px;
          padding: 8px 20px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        span {
          display: none;
          position: absolute;
          width: 14px;
          height: 14px;
          line-height: 11px;
          top: 6px;
          right: 5px;
          font-size: 15px;
          cursor: pointer;
          background: #2153d4;
          color: #fff;
          text-align: center;
          border-radius: 999px;
        }
      }
    }

    .select-all {
      box-sizing: border-box;
      margin: 0;
      overflow: visible;
      position: relative;
      font-weight: 400;
      white-space: nowrap;
      border: 1px solid transparent;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      user-select: none;
      touch-action: manipulation;
      padding: 0 15px;
      font-size: 12px;
      outline: 0;
      color: #fff;
      border-color: #2e74ff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      align-items: center;
      justify-content: center;
      line-height: 1;
      -webkit-appearance: button;
      cursor: pointer;
      border-radius: 0;
      background: #2153d4;
      padding-left: 5px;
      text-align: center;
      display: inline-block;
      width: 100%;
      height: 25px;

      &:hover {
        border: 1px solid transparent;
        background: #4794ff;
        color: #fff;
      }
    }

    .right-top {
      color: rgba(0, 0, 0, 0.65);
      text-align: left;
      box-sizing: border-box;
      zoom: 1;
      border-bottom: 1px solid #f8f8fa;
      height: 30px;
      width: 100%;
      font-size: 12px;
      line-height: 35px;
      // overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .right-btn {
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
        float: right;
        cursor: pointer;
        line-height: 25px;
        padding: 0 5px;
        // overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: rgba(70, 140, 255, 0.1);
        width: 75px;
      }
    }

    .right-menu-foot {
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
      box-sizing: border-box;
      height: 30px;
      text-align: right;
      line-height: 30px;
      margin-top: 5px;
      border-top: 1px solid hsla(0, 0%, 59%, 0.1);

      .footer-left {
        box-sizing: border-box;
        float: left;
      }

      .footer-right {
        float: right;
        padding-left: 10px;
        cursor: pointer;
      }

      .confirm-btn {
        box-sizing: border-box;
        position: relative;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        border: 1px solid transparent;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;
        touch-action: manipulation;
        height: 28px;
        padding: 0 15px;
        font-size: 12px;
        border-radius: 2px;
        outline: 0;
        color: #fff;
        background-color: #2e74ff;
        border-color: #2e74ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        -webkit-appearance: button;
        cursor: pointer;
      }
    }
  }
}

.de-el-dropdown-menu-manu {
  padding: 0;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 12px;
  position: absolute;
  top: 20px;
  width: 150px;
  box-sizing: border-box;
  right: 0;
  .text-area {
    box-sizing: border-box;
    height: 220px;
    position: relative;
    .input {
      touch-action: manipulation;
      overflow: auto;
      resize: vertical;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
      background-color: #fff;
      background-image: none;
      max-width: 100%;
      min-height: 28px;
      line-height: 1.5;
      vertical-align: bottom;
      transition: all 0.3s, height 0s;
      text-overflow: ellipsis;
      outline: 0;
      padding: 5px 5px 28px;
      width: 100%;
      height: 220px;
      border-radius: 0;
      border: none;
      box-shadow: 0 2px 6px 0 rgba(130, 150, 183, 0.72);
    }

    .text-area-btn {
      position: absolute;
      width: 100%;
      text-align: center;
      background: #fff;
      bottom: -1px;
      padding-bottom: 4px;

      .btn {
        font-weight: 400;
        text-align: center;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;
        touch-action: manipulation;
        height: 28px;
        padding: 0 15px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        background-color: #fff;
        outline: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        -webkit-appearance: button;
        cursor: pointer;
        border-radius: 0;
        width: 70px;
        border: 1px solid rgba(33, 83, 212, 0.9);
      }

      .rigth {
        background: #2153d4;
        color: #fff;
      }
    }
  }
}

.clearfix:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
</style>
