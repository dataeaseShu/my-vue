<template>
  <div class="font">莫哦哦
    <ScopedTest @logScoped="logScoped"></ScopedTest>
  </div>
</template>

<script>
import ScopedTest from './ScopedTest.vue'
let a = [1,2,3]
export default {
  components: { ScopedTest },
  methods: {
    logScoped() {
          console.log(80, a)
      }
  }
}
</script>

<style>
.font {
    /* font-family: "AnthonyHunter"; */
    font-family: "STKaiti";
}
</style>