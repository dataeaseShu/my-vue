<template>
  <div id="main" style="width: 600px; height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      var myChart = echarts.init(document.getElementById('main'))
      var c = document.createElement('canvas')
      var ctx = c.getContext('2d')
      ctx.font = '14px Arial'
      var txt = 'DataEase 用户操作日志分析3' // qweqweqwe

      console.log('ctx.measureText(txt).width', ctx.measureText(txt).width)
      // let b = ctx.measureText(txt).width
      return
      const that = this
      var option = {
        xAxis: {
          show: false, //不显示分隔线,
          splitLine: {
            show: false //不显示分隔线
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '123'
        },
        yAxis: {
          show: false,
          type: 'category',
          splitLine: {
            show: false //不显示分隔线
          }
        },
        series: [
          {
            type: 'custom',
            encode: {
              // data 中『维度1』和『维度2』对应到 X 轴
              x: [1, 2],
              // data 中『维度0』对应到 Y 轴
              y: 0
            },
            renderItem: function (params, api) {
              var categoryIndex = api.value(0)
              // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
              var startPoint = api.coord([api.value(1), categoryIndex])
              var endPoint = api.coord([api.value(2), categoryIndex])
              // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
              var height = 22

              // console.log('startPoint', startPoint, api.value(0), api.value(3))

              return {
                type: 'group', //当需要多个自定义拼接时，需要用group，此案例是文字和图形的拼接
                children: [
                  {
                    type: 'text',
                    position: [startPoint[0], startPoint[1] - height / 2], //相对位置
                    style: {
                      text: api.value(5), //data中取值
                      x: 5,
                      y: 5
                    }
                  },
                  {
                    // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                    type: 'rect',
                    // shape 属性描述了这个矩形的像素位置和大小。
                    // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
                    // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
                    shape: echarts.graphic.clipRectByRect(
                      {
                        // 矩形的位置和大小。
                        x: startPoint[0],
                        y: startPoint[1] - height / 2,
                        width: api.value(3) + 10,
                        height: height
                      },
                      {
                        // 当前坐标系的包围盒。
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                      }
                    ),
                    // 用 api.style(...) 得到默认的样式设置。这个样式设置包含了
                    // option 中 itemStyle 的配置和视觉映射得到的颜色。
                    style: {
                      ...api.style(),
                      fill: 'none',
                      stroke: 'blue'
                    }
                  }
                ]
              }

              // 这里返回为这个 dataItem 构建的图形元素定义。
            },
            // data: that.calculatedWidth(that.treeData)
            data: [
              [1, 39, 50, 'qweqweqwe'], // 这是第一个 dataItem
              [6, 39, 50, 6], // 这是第二个 dataItem
              [4, 0, 20, 4], // 这是第二个 dataItem
              [3, 59, 80, 3], // 这是第三个 dataItem
              [5, 39, 50, 5], // 这是第二个 dataItem
              [7, 39, 58, 7], // 这是第二个 dataItem
              [8, 39, 58, 8], // 这是第二个 dataItem
              [9, 39, 58, 9], // 这是第二个 dataItem
              [10, 39, 58, 10], // 这是第二个 dataItem
              [11, 39, 58, 11], // 这是第二个 dataItem
              [12, 39, 58, 12], // 这是第二个 dataItem
              [13, 39, 58, 13], // 这是第二个 dataItem
              [14, 39, 58, 14], // 这是第二个 dataItem
              [15, 39, 58, 15], // 这是第二个 dataItem
              [16, 39, 58, 16], // 这是第二个 dataItem
            ]
          }
          //     {
          //     type: 'custom',
          //     encode: {
          //       // data 中『维度1』和『维度2』对应到 X 轴
          //       x: [1, 2],
          //       // data 中『维度0』对应到 Y 轴
          //       y: [0, 3]
          //     },
          //     renderItem: function (params, api) {
          //       var categoryIndex = api.value(0)
          //       var categoryIndex2 = api.value(3)
          //       // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
          //       var startPoint = api.coord([api.value(1), categoryIndex])
          //       var endPoint = api.coord([api.value(2), categoryIndex2])
          //       // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
          //       var height = 20

          //       return {
          //         type: 'group', //当需要多个自定义拼接时，需要用group，此案例是文字和图形的拼接
          //         children: [
          //           {
          //             // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
          //             type: 'line',
          //             // shape 属性描述了这个矩形的像素位置和大小。
          //             // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
          //             // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
          //             shape: {
          //               x1: startPoint[0],
          //               y1: startPoint[1],
          //               x2: endPoint[0],
          //               y2: endPoint[1],
          //               percent: 1
          //             },
          //             style: {
          //               stroke: 'blue',
          //               lineWidth: 1
          //             }
          //           }
          //         ]
          //       }
          //       // 这里返回为这个 dataItem 构建的图形元素定义。
          //     },
          //     data: [
          //       [4, b/18 + 10, 39, 5], // 这是第二个 dataItem
          //       [4, b/18 + 10, 39, 7], // 这是第二个 dataItem
          //       [7, 39 + b/18 + 10, 59, 3], // 这是第二个 dataItem
          //       [4, b/18 + 10, 39, 6], // 这是第二个 dataItem
          //       [4, b/18 + 10, 39, 1], // 这是第二个 dataItem
          //       [1, 39 + b/18 + 10, 59, 3], // 这是第二个 dataItem
          //       [5, 39 + b/18 + 10, 59, 3] // 这是第三个 dataItem
          //     ]
          //   },
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style>
</style>