<template>
    <div>
        <KlInject></KlInject>
    </div>
  </template>
  <script>
  import KlText from './text.vue'
  import KlInject from './inject.vue'
  import Vue from 'vue';
  Vue.component('KlText', KlText)
  export default {
    components: { KlInject },
    data() {
      return {
        dynamicValidateForm: {
          domains: [
            {
              date: "2016-05-02",
              name: "王小虎",
              province: "上海",
              city: "普陀区",
              address: "上海市普陀区金沙江路 1518 弄",
              zip: 200333,
            },
            {
              date: "2016-05-04",
              name: "王小虎",
              province: "上海",
              city: "普陀区",
              address: "上海市普陀区金沙江路 1517 弄",
              zip: 200333,
            },
            {
              date: "2016-05-01",
              name: "王小虎",
              province: "上海",
              city: "普陀区",
              address: "上海市普陀区金沙江路 1519 弄",
              zip: 200333,
            },
            {
              date: "2016-05-03",
              name: "王小虎",
              province: "上海",
              city: "普陀区",
              address: "上海市普陀区金沙江路 1516 弄",
              zip: 200333,
            },
          ],
          email: "",
        },
      };
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: "",
          key: Date.now(),
        });
      },
    },
  };
  </script>
  