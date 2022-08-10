<template>
  <div id="capture">
    <el-button @click="capture">123</el-button>
    <div id="map"></div>
    <el-dialog
  :visible.sync="dialogVisible"
  width="70%">
  <img width="700" height="400" :src="snapshotInfo" alt="">
</el-dialog>
  </div>
</template>
<script>
import { Scene, PointLayer } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
        dialogVisible: false,
        snapshotInfo: ''
    };
  },
  mounted() {
    const scene = new Scene({
      id: "map",
      preserveDrawingBuffer: true,
      map: new GaodeMap({
        pitch: 0,
        style: "light",
        center: [121.435159, 31.256971],
        zoom: 14.89,
        minZoom: 10,
      }),
    });
    fetch(
      "https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const pointLayer = new PointLayer({})
          .source(data, {
            parser: {
              type: "json",
              x: "longitude",
              y: "latitude",
            },
          })
          .shape("name", [
            "circle",
            "triangle",
            "square",
            "pentagon",
            "hexagon",
            "octogon",
            "hexagram",
            "rhombus",
            "vesica",
          ])
          .size("unit_price", [10, 25])
          .color("name", [
            "#5B8FF9",
            "#5CCEA1",
            "#5D7092",
            "#F6BD16",
            "#E86452",
          ])
          .style({
            opacity: 0.3,
            strokeWidth: 2,
          });

        scene.addLayer(pointLayer);
      });
  },
  methods: {
   capture() {
    // scene.exportMap('png') 
    setTimeout(() => {
          html2canvas(document.getElementById('map')).then(canvas => {
            const snapshot = canvas.toDataURL('image/jpeg', 1) // 是图片质量
            console.log(1, snapshot, canvas);
            if (snapshot !== '') {
              this.snapshotInfo = snapshot
            //   document.body.appendChild(canvas)
              this.dialogVisible = true;
            }
          })
        }, 1500)
   }
  }
};
</script>
<style>
::-webkit-scrollbar {
  display: none;
}

html,
body {
  overflow: hidden;
  margin: 0;
}

#map {
  position: absolute;
  top: 30px;
  bottom: 0;
  width: 100%;
}
</style>