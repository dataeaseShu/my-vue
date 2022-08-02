<template>
  <div class="drawer">
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
  点我打开
</el-button>
   <el-button @click="changeStyle" type="primary" style="margin-left: 16px;">
点我打开
</el-button>
<el-select v-customStyle="styles" v-model="value1" multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

<el-drawer
  title="我是标题"
  v-press:fo.a.b="styles"
  :visible.sync="drawer">
  <span>我来啦!</span>
   <el-button @click="changeStyle" type="primary" style="margin-left: 16px;">
  点我打开
</el-button>
</el-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,
        styles: {
            bg: 'red',
            color: 'green',
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
      };
    },
    methods: {
        changeStyle() {
            this.styles = {
            bg: '#409eff',
            color: 'green',
        }
        }
    },
    directives: {
        press: {
            inserted: function (el) {
                // console.log(1)
               
                // 聚焦元素
                // el.focus()
            },
            bind: function (el, binding, vnode) {
                el.querySelector('.el-drawer__close-btn').onmousedown = function (e) {
                    e.currentTarget.style.background = '#d2d3d4';
                }

                el.querySelector('.el-drawer__close-btn').onmouseup = function (e) {
                    e.currentTarget.style.background = 'none';
                }
                var s = JSON.stringify
                let a =
                'name: '       + s(binding.name) + '<br>' +
                'value: '      + s(binding.value) + '<br>' +
                'expression: ' + s(binding.expression) + '<br>' +
                'argument: '   + s(binding.arg) + '<br>' +
                'modifiers: '  + s(binding.modifiers) + '<br>' +
                'vnode keys: ' + Object.keys(vnode).join(', ')
                // console.log(2, a, el)
            },
            update: function (el, binding, vnode) {
                var s = JSON.stringify
                let a =
                'name: '       + s(binding.name) + '<br>' +
                'value: '      + s(binding.value) + '<br>' +
                'expression: ' + s(binding.expression) + '<br>' +
                'argument: '   + s(binding.arg) + '<br>' +
                'modifiers: '  + s(binding.modifiers) + '<br>' +
                'vnode keys: ' + Object.keys(vnode).join(', ')
                // console.log(3, a, el)
            }
        },
        customStyle: {
            inserted: function (el) {
                console.log(1)
               
                // 聚焦元素
                // el.focus()
            },
            bind: function (el, binding, vnode) {
                // el.querySelector('.el-drawer__close-btn').onmousedown = function (e) {
                //     e.currentTarget.style.background = '#d2d3d4';
                // }
                let scrollbar = el.querySelector('.el-select-dropdown');
                scrollbar.style.background = binding.value.bg;
                el.querySelectorAll('.el-select-dropdown__item').forEach(element => {
                    element.style.color = binding.value.bg
                });
                el.querySelectorAll('.el-tag').forEach(element => {
                    element.style.color = binding.value.bg
                });
                
                
                // el.querySelector('.el-drawer__close-btn').onmouseup = function (e) {
                //     e.currentTarget.style.background = 'none';
                // }
                var s = JSON.stringify
                let a =
                'name: '       + s(binding.name) + '<br>' +
                'value: '      + s(binding.value) + '<br>' +
                'expression: ' + s(binding.expression) + '<br>' +
                'argument: '   + s(binding.arg) + '<br>' +
                'modifiers: '  + s(binding.modifiers) + '<br>' +
                'vnode keys: ' + Object.keys(vnode).join(', ')
                console.log(2, a, el)
            },
            update: function (el, binding, vnode) {
                el.querySelectorAll('.el-tag').forEach(element => {
                    element.style.color = binding.value.bg
                });
                console.log(3, el)
            }
        }
    }
  };
</script>

<style>

</style>