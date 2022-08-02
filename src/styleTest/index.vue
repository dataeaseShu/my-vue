<template>
  <!-- <el-button type="primary" disabled>主要按钮</el-button> -->
  <p class="de-bth">123</p>
</template>

<script>
export default {

}
</script>
<style lang="scss">
$namespace: 'de';
@mixin b($block) {
  $B: $namespace+'-'+$block !global;

  .#{$B} {
    @content;
  }
}
@include b(bth) {
  color: red;
}
</style>