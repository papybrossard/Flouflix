<template>
    <el-menu :default-active="activePage" class="aside-menu" mode="horizontal">
      <el-menu-item index="mes-recommandations" class="menu-route">
        <router-link to="/mes-recommandations">
          <span>Mes Recommandations</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="demarrage" class="menu-route">
        <router-link to="/demarrage">
          <span>Recommandation Rapide </span>
        </router-link>
      </el-menu-item>
      <el-menu-item v-if=isAdmin() index="admin" class="menu-route">
        <router-link to="/admin">
          <span>Administration du site </span>
        </router-link>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { ElMenuItem, ElMenu  } from "element-plus";
import { useUserActions } from '@/actionStore/userActions.js';

export default {
  setup() {
    const userAction = useUserActions();

    return { userAction };
  },
  name: "MenuSite",
  components: {
    ElMenuItem,
    ElMenu
  },
  data() {
    return {
      asideWidth: "20%",
      activePage: this.$route.path,
    };
  },
  watch: {
    $route(to) {
      this.activePage = to.path;
    },
  },
  methods:{
    isAdmin() {
      let roles = this.userAction.getRole();
      for(let role in roles) {
        if(roles[role] == "ROLE_ADMIN") {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped> @import "@/assets/scss/MenuSite.scss" </style>