<template>
  <div class="flex-table">
    <el-table
    :data="tableData"
    height="3000px"
    style="width: 100%;">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
  </el-table>
  <div class="pagination-cont">
      <el-pagination>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    }
  }
</script>
<style lang="less">
body {
    margin: 0;
}
.flex-table {
    height: 100vh;
    display: flex;
    overflow: hidden;
//   margin-top: 40px;
//   height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .pagination-cont {
        padding: 30px 0 0 0;
        text-align: right;
        // flex: 1;
    }
}
</style>