<template>
  <!-- `checked` 为 true 或 false -->
  <!-- <el-checkbox @change="change" v-model="checked">{{ someProp || 123 }}</el-checkbox> -->
  <div>
    <span>1231231123</span>
    <br />
    <span class="use-html">123</span>
    <br />
    <span @click="change" class="link">opopopop</span>
  </div>
</template>
<script>
export default {
  props: {
    someProp: {
      type: String,
      default: ''
    },
    log: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      checked: true
    }
  },
  methods: {
    change() {
      this.log('change')
      this.$emit('change')
    }
  }
}
</script>
<style lang="less">
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

.link {
  color: #307eff;
}
</style>