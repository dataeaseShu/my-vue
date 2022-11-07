<template>
  <!-- `checked` 为 true 或 false -->
  <el-checkbox @change="change" v-model="checked">{{ someProp || 123 }}</el-checkbox>
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