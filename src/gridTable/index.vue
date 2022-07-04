<template>
  <div class="flex-table">
    <el-table v-bind="$attrs" v-on="tableEvent" height="400" :data="tableData">
      <table-body :columns="columns">
        <slot></slot>
      </table-body>
    </el-table>
    <div class="pagination-cont">
      <el-pagination v-bind="paginationDefalut" v-on="paginationEvent">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tableBody from "./tableBody";
export default {
  components: { tableBody },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => {},
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      paginationEvent: {},
      paginationDefalut: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        layout: "total, sizes, pager, jumper",
        total: 0,
      },
      tableEvent: {},
    };
  },
  computed: {
    tableHeight() {
      return {};
      // return { height: !this.paginationDefalut.total ? '100%' : 'auto', width: '100%'}
    },
  },
  created() {
    this.handleListeners();
  },
  watch: {
    pagination: {
      handler() {
        this.paginationDefalut = {
          ...this.paginationDefalut,
          ...this.pagination,
        };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleListeners() {
      Object.keys(this.$listeners).forEach((key) => {
        if (
          [
            "size-change",
            "current-change",
            "prev-click",
            "next-click",
          ].includes(key)
        ) {
          this.paginationEvent[key] = this.$listeners[key];
        } else {
          this.tableEvent[key] = this.$listeners[key];
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.flex-table {
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  .pagination-cont {
    padding: 30px 0 0 0;
    text-align: right;
  }
}
</style>