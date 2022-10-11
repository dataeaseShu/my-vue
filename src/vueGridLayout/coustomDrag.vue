<template>
  <div>
    <div draggable="true" @dragstart="dragstart($event)" style="width: 400px;height: 400px;background: green;">
        123
    </div>
    <div @dragover="dragover($event)" style="width: 400px;height: 400px;background: red;">

    </div>


  </div>
</template>

<script>
export default {

    methods: {
        dragstart(e) {
            e.dataTransfer.setData('activeEle', 123);
        },
        dragover(e) {
           console.log(123);
           console.log('activeEle',  e.dataTransfer.getData('activeEle'));
        }
    }

}
</script>

<style>

</style>