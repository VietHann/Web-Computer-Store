<template>
  <div class="navbar">
    <div class="navbar-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>
    <div
      class="sidebar-overlay"
      @click="closeSidebar"
      v-if="isSidebarOpen"
    ></div>
    <aside :class="{ 'sidebar-open': isSidebarOpen }">
      <ul>
        <li>
          <router-link
            :to="{ name: 'Home', params: { pageTitle: 'Home Page' } }"
            exact
          >
            Quản lý sản phẩm
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'DonHang', params: { pageTitle: 'Order Management' } }"
            exact
          >
            Quản lý đơn hàng
          </router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'UserManagement',
              params: { pageTitle: 'User Management' },
            }"
            exact
          >
            Quản lý người dùng
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'ThongKe', params: { pageTitle: 'Statistics' } }"
            exact
          >
            Thống kê
          </router-link>
        </li>
        <li>
          <a href="#" @click="logMeOut">Đăng xuất</a>
        </li>
      </ul>
    </aside>
    <div class="close-text" @click="closeSidebar" v-if="isSidebarOpen">X</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    logMeOut() {
      localStorage.clear();
      this.redirectTo({ val: "Login" });
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
}

.navbar-toggle {
  cursor: pointer;
  padding: 10px;
}

.navbar-toggle i {
  font-size: 24px;
}

aside {
  width: 250px;
  background-color: #525a5a;
  color: darkcyan;
  height: 100vh;
  position: fixed;
  top: 0;
  left: -250px;
  transition: left 0.3s;
}

aside ul {
  list-style: none;
  padding: 0;
}

aside ul li {
  padding: 10px;
}

aside ul li a {
  color: darkcyan;
  text-decoration: none;
}

aside ul li a:hover {
  color: white;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: none;
}

.sidebar-open {
  left: 0;
}

.sidebar-open + .overlay {
  display: block;
}

.close-text {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: rgb(255, 0, 0);
}

</style>