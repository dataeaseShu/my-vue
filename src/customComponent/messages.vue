<template>
  <div>
    <!-- <Content /> -->
    {{  navigatorUserAgent }}
  </div>
</template>

<script>
import Content from '../vnode/ContenVue.vue'
export default {
  components: { Content },
  data() {
    return {
      navigatorUserAgent: ''
    }
  },
  mounted() {
    // this.withLink({ title : '123'});
    // this.openMessageFail()
    this.navigatorUserAgent = navigator.userAgent
    console.log('navigator.userAgent', navigator.userAgent);
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
    withLink(options, confirmButtonTextInfo) {
      this.$t = (a) => a
      const h = this.$createElement;
      const { title, content, type = 'danger', cb, confirmButtonText = confirmButtonTextInfo || this.$t('commons.delete'), showCancelButton = true, cancelButtonText = this.$t('commons.cancel'), cancelCb = () => {}, finallyCb = () => {}, link = '' } = options
      const customClass = `de-confirm de-confirm-fail ${dangerouslyUseHTMLString && 'de-use-html'}`
      const confirmButtonClass = `de-confirm-${type}-btn de-confirm-btn`
      this.$msgbox({
        message: h('p', null, [
          h(Content, {
            props: {
              someProp: {
                title: '',
                cont: '',
                link: ''
              },
            },
            on: {
              change: () => {
                console.log(5)
              }
            }
          }),
        ]),
        duration: 0,
        confirmButtonText,
        cancelButtonText,
        showCancelButton,
        cancelButtonClass: 'de-confirm-btn de-confirm-plain-cancel',
        confirmButtonClass,
        customClass,
        iconClass: 'el-icon-warning',
      });
    }
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

  .de-confirm-btn {
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
    transform: translateY(0);
  }
}

.de-confirm-primary-btn {
  background: var(--primary, #3370ff) !important;
  border: none !important;
  color: #ffffff !important;

  &:hover {
    background: var(--primaryHover, #3370ff) !important;
  }

  &:active {
    background: var(--primaryActive, #3370ff) !important;
  }
}

.de-confirm-plain-cancel {
  background: #ffffff !important;
  border: 1px solid #bbbfc4 !important;
  color: #1f2329 !important;
}

.de-confirm-danger-btn {
  background: var(--deDanger, #f54a45) !important;
  border: none !important;
  color: #ffffff !important;

  &:hover {
    background: var(--deDangerHover, #f54a45) !important;
  }

  &:active {
    background: var(--deDangerActive, #f54a45) !important;
  }
}
</style>