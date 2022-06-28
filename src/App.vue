<template>
  <div id="app">
    <HelloWorld
      @del="del"
      @addCondRela="addCondRela"
      @removeRelationList="removeRelationList"
      @changeAndOrDfs="(type) =>  changeAndOrDfs(relationList, type)"
      :relationList="relationList"
      :andOr.sync="andOr"
    />
    <svg width="388" height="100%" class="real-line">
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        :d="svgRealinePath"
        fill="none"
        stroke="#CCCCCC"
        stroke-width="0.5"
      ></path>
    </svg>
    <svg width="388" height="100%" class="dash-line">
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        :d="svgDashinePath"
        fill="none"
        stroke="#CCCCCC"
        stroke-width="0.5"
        stroke-dasharray="4,4"
      ></path>
    </svg>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  computed: {
    svgRealinePath() {
      const lg = this.relationList.length;
      let a = { x: 0, y: 0, child: this.relationList };
      a.y = Math.floor(this.dfsXY(a, 0)/2)
      if (!lg) return '';
      // a.z = this.dfsZ(a, 0)
      let path = this.calulateDepth(a)
      return path;
    },
    svgDashinePath() {
      const lg = this.relationList.length;
      let a = { x: 0, y: 0, child: this.relationList };
      a.y = Math.floor(this.dfsXY(a, 0)/2)
      if (!lg) return `M48 20 L68 20`;
      let path = this.calulateDepthDash(a)
      return path;
    }
  },
  methods: {
    removeRelationList() {
      this.relationList = []
    },
    getY(arr) {
      const [ a ] = arr;
      if (a.child?.length) {
        return this.getY(a.child);
      }
      return a.y;
    },
    getLastY(arr) {
      const a = arr[arr.length];
      if (a.child?.length) {
        return this.getLastY(a.child);
      }
      return a.y;
    },
    calulateDepthDash(obj) {
      const lg = obj.child?.length;
      let path = '';
      if (!lg && Array.isArray(obj.child)) {
        const { x, y } = obj;
        path += `M${48  + x * 68 } ${ y * 41.4 + 20 } L${ 88  + x * 68 } ${ y * 41.4 + 20 }`
      } else if (obj.child?.length) {
        let y = Math.max(this.dfsY(obj, 0), this.dfs(obj.child, 0) + this.getY(obj.child) - 1);
        let parent = (this.dfs(obj.child, 0) * 41.4)/2 + (this.getY(obj.child) || 0) * 41.4;
        const { x } = obj
        path += `M${ 24  + x * 68 } ${ parent } L${ 24  + x * 68 } ${ y * 41.4 + 20 } L${ 64  + x * 68 } ${ y * 41.4 + 20 }`
        obj.child.forEach((item) => {
          path += this.calulateDepthDash(item)
        })
      }
      
      return path;
    },
    calulateDepth(obj) {
      const lg = obj.child.length;
      if (!lg) return '';
      let path = '';
      const { x:depth, y } = obj;
      obj.child.forEach((item, index) => {
      const { y:sibingLg, z } = item;
        console.log('item', item.z, sibingLg, y);
        if (item.child?.length) {
          let parent = (this.dfs(obj.child, 0) * 41.4)/2 + (this.getY(obj.child) || 0) * 41.4;
          let children = (this.dfs(item.child, 0) * 41.4)/2 + this.getY(item.child) * 41.4;
          let path1 = 0;
          let path2 = 0;
          if (parent < children) {
            path1 = parent;
            path2 = children;
          } else {
            [path1, path2] = [children, parent];
          }
          if (y >= sibingLg) {
            path1 = parent;
            path2 = children;
          }
          path += `M${24 + depth * 68 } ${path1} L${24 + depth * 68 } ${path2} L${68 + depth * 68 } ${path2}`
          // path += a;
          path += this.calulateDepth(item)
        } 
        if (!item.child?.length){
          // console.log(123, y, sibingLg, lg === 1 && index === 0 , item.z);
          if (sibingLg >= y) {
            path += `M${24 + depth * 68 } ${(y) * 40 } L${24 + depth * 68 } ${(sibingLg + 1) * 41.4 - 20.69921875} L${68 + depth * 68 } ${(sibingLg + 1) * 41.4 - 20.69921875}`
          } else {
            path += `M${24 + depth * 68 } ${(sibingLg + (lg === 1 && index === 0 ?  0 : 1) + (obj.child[ index+ 1]?.child?.length ? y - sibingLg - 1 : 0) ) * 41.4 + 20 + (lg === 1 && index === 0 ? 26 : 0)} L${24 + depth * 68 } ${(sibingLg + 1) * 41.4 - 20.69921875 - (lg === 1 && index === 0 ? (z || 0) * 1.4 : 0)} L${68 + depth * 68 } ${(sibingLg + 1) * 41.4 - 20.69921875  - (lg === 1 && index === 0 ? (z || 0) * 1.4 : 0)}`
          }
        }
      })
      return path;
    },
    changeAndOrDfs(arr, andOr) {
      arr.forEach((ele) => {
        if (ele.child) {
           ele.andOr = !andOr;
           this.changeAndOrDfs(ele.child, !andOr);
        }
      })
    },
    dfs(arr, count) {
      arr.forEach((ele) => {
        if (ele.child?.length) {
          count = this.dfs(ele.child, count)
        } else {
          count += 1;
        }
      })
      count += 1;
      return count
    },
    dfsY(obj, count) {
      obj.child.forEach((ele) => {
        if (ele.child?.length) {
          count = this.dfsY(ele, count)
        } else {
          count = Math.max(count, ele.y, obj.y);
        }
      })
      return count
    },
    dfsXY(obj, count) {
      obj.child.forEach((ele) => {
        ele.x = obj.x + 1;
        if (ele.child?.length) {
          let l = this.dfs(ele.child, 0)
          // console.log('mf', count, Math.floor(l/2));
          ele.y = Math.floor(l/2) + count
          count = this.dfsXY(ele, count)
        } else {
          count += 1;
          ele.y = count - 1;
        }
      })
      count += 1;
      return count
    },
    dfsZ(obj, count) {
      obj.child.forEach((ele) => {
        if (ele.child?.length) {
          count = this.dfsZ(ele, count)
        } else {
          if (Array.isArray(ele.child)) {
            count += 1;
          }
          ele.z = count;
        }
      })
      obj.z = count;
              count += 1;

      return count
    },
    addCondRela(type, andOr) {
      console.log(1, andOr);

      this.relationList.push(type === "condition" ? { value: ''} : { child: [], andOr });
    },
    del(index) {
      this.relationList.splice(index, 1);
    },
  },
  data() {
    return {
      relationList: [],
      andOr: true
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}
.real-line, .dash-line {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
}
</style>
