<template>
    <div>
        <p>APP</p>
        <LeftNav />
        <router-view></router-view>
    </div>
</template>
<script>
import LeftNav from "./components/LeftNav.vue";
import api from "../../api/home.js";

export default {
  components: { LeftNav },
  created() {
    api
      .getImportantInfo({
        courseType: null,
        courseName: "",
        termId: "2de730ad-ffea-11e7-a929-005056ad2014",
        page: 1,
        pageSize: 9999,
        order: "term_desc"
      })
      .then(res => {
        // todo
      })
      .catch(err => {});
  }
};
</script>