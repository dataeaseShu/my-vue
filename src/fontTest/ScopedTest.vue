<template>
  <div class="scoped" @click="logScoped">123</div>
</template>

<script>
let a = [1,2,3]
export default {
    name: 'ScopedTest',
    methods: {
        logScoped() {
            a.shift()
            console.log(90, a)
            this.$emit('logScoped')
        }
    }
}
</script>

<style>

</style>