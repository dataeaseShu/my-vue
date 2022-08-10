<template>
  <div class="outer">
    <div draggable @dragstart="dragstart" class="a"></div>
    <div @dragenter="dragenter" @dragover="dragover" class="b">
    <div draggable @dragstart="dragstart" class="c"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dragover(event) {
      event.preventDefault();
      console.log(80);
    },
    dragstart() {
      console.log(70);
    },
    dragenter(event) {
      event.preventDefault();
    //   document.querySelector('.b').appendChild(document.querySelector('.a'))
      console.log(90);
    },
  },
};
</script>

<style lang="scss">
.outer {
  width: 100vw;
  height: 100vh;

  .a {
    width: 100px;
    height: 100px;
    background: red;
  }

  .c {
    width: 100px;
    height: 100px;
    background: yellow;
  }

  .b {
    width: 700px;
    height: 700px;
    border: 1px solid #409eff;
    // overflow: hidden;
  }
}
</style>