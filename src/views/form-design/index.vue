<template>
  <div class="pull-chheight role-container">
    <!-- <basic-container> -->
    <avue-form-design
      :options="options"
      :aside-left-width="270"
      :aside-right-width="250"
      @submit="handleSubmit"
    ></avue-form-design>
    <!-- </basic-container> -->
  </div>
</template>

<script>
export default {
  name: "role",
  data() {
    return {
      options: {
        // column: [
        //   {
        //     prop: "img",
        //     type: "img",
        //     label: "图片",
        //     span: 24,
        //     display: true
        //   }
        // ],
        // labelWidth: 120,
        // gutter: 0
      },
      roleSwitch: ""
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(e);
    }
  }
};
</script>

<style  lang="scss">
.form-designer .widget-config-container .el-tabs__header {
  position: relative;
  width: 250px;
}
.form-designer .widget-config-container {
  width: 250px;
  margin-top: 0px;
}
</style>