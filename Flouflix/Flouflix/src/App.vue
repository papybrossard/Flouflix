<template>
  <HeaderSite />
  <div class="view">
    <RouterView />
  </div>
  <Account />
  <ConfirmDisconnect />

</template>

<script>
import HeaderSite from "./views/HeaderSite.vue";
import Account from "./components/Account/AccountDialog.vue";
import ConfirmDisconnect from "./components/Account/ConfirmDisconnect.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    HeaderSite,
    Account,
    ConfirmDisconnect,
    RouterView
  },
  data() {
    return {
      activeIndex: "recommandation",
      dialogVisible: false,
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      this.$router.push(`/${index}`);
    },
  },
};
</script>
<style lang="scss" scoped> @import "@/assets/scss/App.scss"
</style>