<template>
  <div class="de-card-plugin">
    <div class="card-info">
      <div class="info-top">
        <img
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          alt=""
        />
        <p class="title">达梦数据源插件</p>
        <el-tooltip
          class="item"
          effect="dark"
          content="Top Center 提示文字"
          placement="top"
        >
          <p class="tips">达梦插件，值得拥有</p>
        </el-tooltip>
      </div>
      <div class="info-left">
        <p class="list name" v-for="ele in listName" :key="ele">{{ ele }}</p>
      </div>
      <div class="info-right">
        <p class="list value" v-for="ele in listValue" :key="ele">{{ ele }}</p>
      </div>
    </div>
    <div class="card-method">
      <div class="btn-plugin"><i class="el-icon-more"></i>更新</div>
      <el-divider direction="vertical"></el-divider>
      <div class="btn-plugin"><i class="el-icon-more"></i>卸载</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listName: ["费用", "开发者", "版本", "安装时间"],
      listValue: ["费用", "开发者", "版本", "安装时间"],
    };
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
};
</script>

<style lang="scss">
.de-card-plugin {
  width: 270px;
  height: 230px;
  background: #ffffff;
  border: 1px solid #dee0e3;
  box-shadow: 0px 6px 24px rgba(31, 35, 41, 0.08);
  border-radius: 4px;
  .card-method {
    border-top: 1px solid #dee0e3;
    display: flex;
    align-items: center;
    padding: 9px 30px 10px 30px;
    width: 100%;
    justify-content: space-around;
    box-sizing: border-box;

    .btn-plugin {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height, or 157% */

      display: flex;
      align-items: center;
      letter-spacing: -0.1px;

      /* Neutral/600 */

      color: #646a73;
      i {
        font-size: 13px;
        margin-right: 5.33px;
      }
    }
  }

  .card-info {
    width: 100%;
    height: 188px;
    padding: 12px;
    padding-bottom: 4px;
    box-sizing: border-box;

    .info-top {
      margin-bottom: 12px;
      overflow: hidden;
      img {
        float: left;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #dee0e3;
        border-radius: 4px;
      }

      .title {
        width: 200px;
        height: 22px;
        float: left;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
        margin: -2px 0 0 6px;
      }

      .tips {
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        float: left;
        height: 20px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #646a73;
        margin: 2px 0 0 6px;
      }
    }
    .list {
      padding-bottom: 8px;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      margin: 0;
      color: #646a73;
    }

    .info-left {
      display: inline-block;

      .name {
        color: #646a73;
      }
    }
    .info-right {
      display: inline-block;
      margin-left: 12px;
      .value {
        color: #1f2329;
      }
    }
  }
}
</style>