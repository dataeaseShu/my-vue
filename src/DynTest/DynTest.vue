<template>
  <component :is="com" />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      com: null
    }
  },
  created() {
    
  },
  mounted() {
    axios.get('http://192.168.1.3:8000/symbol-map-data.js').then((res) => {
      const Fn = Function
      const dynamicCode = res.data
      console.log('123', dynamicCode, new Fn(`return ${dynamicCode}`)())
      this.com = new Fn(`return ${dynamicCode}`)().default
    })
  }
}
</script>

<style>
</style>