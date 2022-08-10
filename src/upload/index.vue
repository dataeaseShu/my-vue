<template>
  <div class="de-upload">
    <p class="title">登录页面头部LOGO</p>
    <div class="content">
      <div
        class="img"
        @mouseover="imageUrl && !percentage && (isHover = true)"
        @mouseleave="isHover = false"
        :class="[{ 'is-hover': isHover, 'is-prosess': percentage }]"
      >
        <div class="img-cont" v-if="imageUrl">
          <img :src="imageUrl" alt="" />
        </div>
        <el-image v-else>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <i class="el-icon-delete"></i>
        <el-progress
          class="de-progress"
          v-if="percentage"
          :percentage="percentage"
          :text-inside="true" :stroke-width="4"
        ></el-progress>
      </div>
      <div class="upload-btn">
        <el-upload
          class="upload-demo"
          action="http://localhost:3000/upload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :on-progress="handleProgress"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" plain>点击上传</el-button>
          <div slot="tip" class="de-upload__tip">
            建议尺寸 500*450，支持JPG、PNG,大小不超过 5M
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      percentage: 0,
      isHover: false,
    };
  },
  mounted() {
    console.log(9, this.$refs.upload);
  },
  methods: {
    handleAvatarSuccess(res, file) {
    //   console.log(res);
        this.imageUrl = "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
        this.percentage = 100;
        setTimeout(() => {
            this.percentage = 0;
        }, 100)
    },
    handleProgress(ev, file) {
      this.percentage = file.percentage;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type !== "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 > 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style lang="scss">
@mixin center() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.de-upload {
  .title {
    //styleName: 中文/桌面端/正文 14 22 Regular;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
    margin: 0;
    margin-bottom: 8px;
  }

  .content {
    display: flex;

    .img {
      box-sizing: border-box;
      background: #f5f6f7;
      border: 1px solid #bbbfc4;
      border-radius: 4px;
      width: 80px;
      height: 80px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .el-icon-delete {
        color: #fff;
        font-size: 14px;
        display: none;
        z-index: 3;
        @include center;
        cursor: pointer;
      }

      .img-cont {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;

        &::after {
          display: none;
          content: "";
          position: absolute;
          background: rgba(31, 35, 41, 0.4);
          width: 100%;
          height: 100%;
          z-index: 2;
          top: 0;
          left: 0;
        }
      }

      img {
        width: 100%;
        height: 90%;
        // position: relative;
      }

      .de-progress {
        @include center;
        z-index: 6;
        width: 100%;
        .el-progress-bar {
            margin: 0;
            padding: 0 8px;
        }
      }
    }

    .is-hover {
      .el-icon-delete,
      .img-cont::after {
        display: block;
      }
    }

    .is-prosess {
      .img-cont::after {
        display: block;
      }
    }

    .upload-btn {
      padding-top: 12px;
    }
  }
}
</style>