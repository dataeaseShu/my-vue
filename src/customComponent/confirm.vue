<template>
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
</template>

<script>
export default {
  mounted() {
    this.openWithHtml();
  },
  methods: {
    open() {
      this.$confirm("确定将该用户从组织中移除吗？", "", {
        confirmButtonText: "移除",
        cancelButtonClass: "de-confirm-fail-btn de-confirm-fail-cancel",
        confirmButtonClass: "de-confirm-fail-btn de-confirm-fail-confirm",
        customClass: "de-confirm de-confirm-fail",
        iconClass: "el-icon-warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openWithHtml() {
      this.$confirm(
        `<span>无法删除</span><br><span class="use-html">请先移除组织中所有用户，再进行删除组织操作。</span>`,
        "",
        {
          confirmButtonText: "知道了",
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
          confirmButtonClass: "de-confirm-fail-btn de-confirm-fail-html",
          customClass: "de-confirm de-confirm-fail de-use-html",
          iconClass: "el-icon-warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="less">
.de-confirm {
  border: none;
  .el-message-box__header {
    display: none;
  }

  .el-message-box__content {
    padding: 24px;
  }

  .el-message-box__container {
    display: flex;
    align-items: center;
  }
  .el-message-box__status {
    height: 22px;
    width: 22px;
    font-size: 22px !important;
    margin-right: 17px;
  }

  .el-message-box__message {
    //styleName: 中文/桌面端/四级标题 16 24 Medium;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #1f2329;
  }

  .el-message-box__btns {
    padding: 0;
  }

  .de-confirm-fail-btn {
    height: 32px;
    width: 80px;
    border-radius: 4px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
    padding: 0;
  }

  .de-confirm-fail-cancel {
    background: #ffffff;
    border: 1px solid #bbbfc4;
    color: #1f2329;
  }

  .de-confirm-fail-confirm {
    background: #f54a45;
    border: none;
    color: #ffffff;
  }
}

.de-confirm-fail {
  padding: 0 24px 24px 0 !important;
  .el-message-box__status {
    color: #ff8800 !important;
  }
}

.de-use-html {
  min-width: 420px;
  width: auto !important;

  .el-message-box__container {
    position: relative;

    .use-html {
      //styleName: 中文/桌面端/正文 14 22 Regular;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0px;
      text-align: left;
      color: #1f2329;
      display: inline-block;
      margin-top: 8px;
    }
  }

  .el-message-box__status {
    position: absolute;
    top: 1px;
    transform:translateY(0)
  } 

  .de-confirm-fail-html {
    background: #3370FF;
    border: none;
    color: #ffffff;
  }
}
</style>