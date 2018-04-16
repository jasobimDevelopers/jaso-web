<template>
  <div class="navbar">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <div class="nav-wrapper flex-sb">
      <div class="logo-wrapper flex-row">
        <img src="@/assets/images/logo.png" />
        <div class="company-name">嘉实智慧安装</div>
      </div>

      <div class="right-menu flex-row">
        <div class="menu-list flex-row" v-if="userInfo">
          <!-- <router-link to="/#" class="menu-item">我的</router-link> -->
          <router-link v-if="userInfo.userType === 0" class="menu-item" to="/admin/UserManage">用户管理</router-link>
          <span v-else-if="userInfo.userType === 4" class="hover-cursor menu-item" @click="handleUserGuide"></span>
          <router-link v-if="userInfo.userType === 0" to="/admin/setting" class="menu-item">设置</router-link>
        </div>

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="userInfo.userIconUrl | setFileRoot">
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>
              admin
            </el-dropdown-item> -->
            <el-dropdown-item>
              <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger';

export default {
  name: 'Navbar',
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
    ]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    handleUserGuide() {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .navbar {
    position: relative;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background-color: #ffffff;
    z-index: 10;
  }

  .nav-wrapper {
    margin: 0 auto;
    padding: 15px 0;
    width: 1200px;
    height: 70px;

    .logo-wrapper img {
      height: 40px;
    }

    .company-name {
      margin-left: 15px;
      font-size: 18px;
      font-weight: bolder;
    }
  }

  .right-menu {
    height: 100%;
    &:focus{
     outline: none;
    }

    .menu-list {
      font-size: 14px;

      .menu-item {
        padding: 0 15px;
        border-right: 1px solid #DCDFE6;

        &:last-child {
          border-right: none;
        }
      }
    }


    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      height: 32px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #cccccc;
        }
      }
    }
  }

  // media
  @media (max-width: 1200px) {
    .nav-wrapper {
      padding: 0 8px;
      width: 100%;
    }
  }
</style>
