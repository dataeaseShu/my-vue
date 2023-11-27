<template>
  <div class="bg">
    <el-tooltip
      v-if="popperOptions.boundariesElement"
      class="item"
      manual
      v-model="visibleArrow"
      :popper-options="popperOptions"
      effect="light"
      content="Top Left 提示文字"
      placement="top"
    >
      <el-button @click="visibleArrow = !visibleArrow">上左</el-button>
    </el-tooltip>
    <el-dropdown :popper-options="popperOptions" v-if="popperOptions.boundariesElement" @command="handleCommand" placement="top">
    <span class="el-dropdown-link">
      下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">黄金糕</el-dropdown-item>
      <el-dropdown-item command="b">狮子头</el-dropdown-item>
      <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
      <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
      <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
  
</template>

<style>
.bg {
  margin: 300px;
  width: 200px;
  height: 200px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
export default {
  mounted() {
    this.popperOptions = { boundariesElement: document.querySelector(".bg") };
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
  data() {
      return {
        visibleArrow: false,
      popperOptions: {},
    };
  },
};
</script>
