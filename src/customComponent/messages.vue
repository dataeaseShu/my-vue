<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.openMessageSuccess();
    this.openMessageFail()
  },
  methods: {
    openMessageFail() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", null, "添加失败，该角色已存在")]),
        duration: 0,
        iconClass: "el-icon-error",
        customClass: "de-message-fail de-message",
      });
    },
    openMessageSuccess() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", null, "移除成功")]),
        duration: 0,
        iconClass: "el-icon-success",
        customClass: "de-message-success de-message",
      });
    },
  },
};
</script>

<style lang="less">
.de-message {
  min-width: 20px !important;
  padding: 16px 20px !important;
  flex-direction: row;
  box-shadow: 0px 4px 8px 0px #1F23291A;
  span {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
    color: #1f2329;
  }

  i {
    height: 14.666666984558105px;
    width: 14.666669845581055px;
    margin-right: 8.67px;
  }
}
.de-message-fail {
  border: 1px solid #f54a45 !important;
  background: #fef1f1 !important;
  i {
    color: #f54a45;
  }
}

.de-message-success {
  border: 1px solid #34c724 !important;
  background: #f0fbef !important;
  i {
    color: #34c724;
  }
}
</style>