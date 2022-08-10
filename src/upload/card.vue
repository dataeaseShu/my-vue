<template>
  <div class="de-card" :class="[{ selected: selected }]">
    <div class="card-img">
      <img
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        alt=""
      />
    </div>
    <div class="card-info">
      <el-radio class="de-card-radio" v-model="radio" label="1"
        >备选项备选项备选项备选项备选项备选项备选项</el-radio
      >
      <el-dropdown size="medium" trigger="click" @command="handleCommand">
        <i class="el-icon-more"></i>
        <el-dropdown-menu class="de-card-dropdown"  slot="dropdown">
          <el-dropdown-item command="a">
            <i class="el-icon-setting"></i>
            配色设置
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: false,
      selected: true,
    };
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
};
</script>

<style lang="scss">
.de-card {
  width: 258px;
  height: 184px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dee0e3;
  border-radius: 4px;
  .card-img {
    border-bottom: 1px solid #dee0e3;
    display: flex;
    height: 144px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .card-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px 9px 12px;
    box-sizing: border-box;

    .el-icon-more {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      color: #646a73;
    }

    .el-icon-more:hover {
      background: rgba(31, 35, 41, 0.1);
      border-radius: 4px;
    }
  }

  .de-card-radio {
    display: inline-block;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 10px;

    .el-radio__inner {
      width: 16px;
      height: 16px;
      &::after {
        width: 6px;
        height: 6px;
      }
    }
    .el-radio__original {
      height: 16px !important;
    }

    .el-radio__label {
      padding-left: 8px;
      color: #1f2329;
    }
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #1f2329;
  }
}

.de-card.selected {
  border-color: #3370ff;
}

.de-card-dropdown {
    margin-top: 0 !important;
    .popper__arrow {
        display: none !important;
    }
}
</style>