<template>
    <div class='canvas-marquee' ref='parentContainer'>
      <canvas :id='currencId'></canvas>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CanvasMarquee',
    data () {
      return {
        canvasWidth: 0,
        canvasHeight: 0,
        canvasTarget: null,
        startX: 0,
        rate: 1,
        defaultBlank: '     ',
        fontColor: '#000000',
        fontfamily: 'microsoft yahei',
        fontWeight: 'bold',
        baseFontSize: 18,
        text: 'ajsdhjashdjhasjdhjashjdhajhdj',
        currencId: 'canvasContainer'
      }
    },
    props: ['canvasObj'],
    methods: {
      draw () {
        let context = document.getElementById(this.currencId).getContext('2d')
        context.clearRect(0, 0, this.canvasWidth * this.rate, this.canvasHeight * this.rate)
        // 根据此时x位置绘制文本
        context.strokeStyle = '#FFFFFF'
        let fontSize = this.baseFontSize * this.rate
        context.font = `${this.fontWeight}  ${fontSize}px "${this.fontfamily}", sans-serif`
        context.fillStyle = this.fontColor
        this.startX--
        // 获得文字长度
        let textWidth = context.measureText(this.text).width
        // 获得两段重复文字直接的空格字符文字长度
        let blankWidth = context.measureText(this.defaultBlank).width
        if (0 - this.startX * this.rate >= textWidth + blankWidth) {
          this.startX = 0
        }
        let startY = fontSize + (this.canvasHeight * this.rate - fontSize) / 2
        context.fillText(this.text, this.startX * this.rate, startY, 100)
        // context.strokeText(this.text, this.startX, 35 * this.rate)
        if (context.measureText(this.text).width > this.canvasWidth) {
          if (textWidth + this.startX * this.rate < this.canvasWidth * this.rate) {
            context.fillText(this.defaultBlank + this.text, this.startX * this.rate + textWidth, startY)
          }
          requestAnimationFrame(this.draw)
        }
      },
      // 获取缩放比率，处理在移动端高分屏下canvas字体显示模糊的问题
      getPixelRatio (context) {
        let backingStore = context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1
        return (window.devicePixelRatio || 1) / backingStore
      }
    },
    created () {
      this.currencId = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    mounted () {
      if (this.canvasObj != null && typeof this.canvasObj === 'object') {
        for (let key in this.canvasObj) {
          if (this[key] != null && this.canvasObj[key] != null) {
            this[key] = this.canvasObj[key]
          }
        }
      }
      // 依据父级宽高初始化canvas高度与宽度
      this.canvasWidth = this.$refs.parentContainer.offsetWidth
      this.canvasHeight = this.$refs.parentContainer.offsetHeight
      this.canvasTarget = document.getElementById(this.currencId)
      this.canvasTarget.width = this.canvasWidth
      this.canvasTarget.height = this.canvasHeight
      let rate = this.getPixelRatio(document.getElementById(this.currencId).getContext('2d'))
      // 设置展示大小
      this.canvasTarget.style.width = this.canvasWidth + 'px'
      this.canvasTarget.style.height = this.canvasHeight + 'px'
      // 设置画布大小
      this.canvasTarget.width = this.canvasWidth * rate
      this.canvasTarget.height = this.canvasHeight * rate
      //  处理高分屏下面的 dpi造成的模糊问题缩放比例rate
      this.rate = rate
      this.draw()
    }
  }
  </script>
  <style lang="scss" scoped>
  .canvas-marquee{
    width: 100px;
    height: 20px;
    overflow: hidden;
    position: relative;
  }
  </style>
  