<template>
  <div>
    <el-upload
    v-for="ele in eleList"
    :key="ele"
    class="upload-demo"
    action="upload"
    :on-success="handleAvatarSuccess"
    :show-file-list="false"
    :http-request="httpRequest"
    :on-progress="handleProgress"
    :before-upload="beforeAvatarUpload"
    :on-error="handleError"
  >
    <el-button> 123 </el-button>
  </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0,
      imageUrl: "",
      eleList: [1,2,3]
    };
  },
  methods: {
    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file);
      this.percentage = 100;
      setTimeout(() => {
        this.percentage = 0;
      }, 100);
    },
    httpRequest({ file }) {
      this.handleAvatarSuccess(file);
    },
    handleProgress(ev, file) {
      this.percentage = file.percentage;
    },
    handleError() {
      //   this.openMessageSuccess('', 'danger');
    },
    beforeAvatarUpload(file) {
      return true;
      //   const { imgType = ["image/jpeg", "image/jpg", "image/png"], countValue } =
      //     this.config;
      //   const isJPG = imgType.includes(file.type);
      //   const isLt2M = file.size < countValue;
      //   if (!isJPG) {
      //     this.$warning(this.$t("test_track.case.import.upload_limit_format"));
      //   }
      //   if (!isLt2M) {
      //     this.$warning(this.$t("test_track.case.import.upload_limit_size"));

      //     // this.$message.error(`上传图片大小不能超过 ${countTips}!`);
      //   }
      //   return isJPG && isLt2M;
    },
  },
};
</script>

<style>
</style>