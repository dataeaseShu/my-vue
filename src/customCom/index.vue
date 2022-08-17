<template>
  <div class="container">
    <deBtn type="primary">primary</deBtn>
    <deBtn type="primary" disabled>primary</deBtn>
    <deBtn type="primary" loading>primary</deBtn>
    <br />
    <deBtn type="danger">danger</deBtn>
    <deBtn type="danger" disabled>danger</deBtn>
    <deBtn type="danger" loading>danger</deBtn>
    <br />
    <deBtn plain>plain</deBtn>
    <deBtn plain disabled>plain</deBtn>
    <deBtn plain loading>plain</deBtn>
  </div>
</template>

<script>
import deBtn from "./deBtn.vue";
import { getColorWithPercentage } from './cplorCacu'
export default {
  components: { deBtn },
  mounted() {
    this.openMessageSuccess();
    console.log(1, getColorWithPercentage('#f54a45', '#ffffff', 15))
  },
  methods: {
    logOutput() {
        console.log(90)
    },
    openMessageSuccess() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [h("span", { on: { click: () => {
            this.logOutput()
        }}}, "移除成功移除成功移除成功")]),
        duration: 0,
        iconClass: "el-icon-success",
        customClass: "de-message-success de-message",
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 500px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

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
