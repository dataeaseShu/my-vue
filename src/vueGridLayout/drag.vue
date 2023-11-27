<template>
  <div class="row">
    <div style="width: 600px;height: 400px;background: red" class="col-3">
      <h3>Draggable 12</h3>
      <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
        <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable style="width: 300px;height: 200px;background: green" class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>
      </draggable>
    </div>

    
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "John" },
        { name: "Joao" },
        { name: "Jean" },
        { name: "Gerard" }
      ],
      list2: [
        { name: "Juan" },
        { name: "Edgard"},
        { name: "Johnson" }
      ]
    };
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>