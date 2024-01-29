<template>
  <Navbar />

  <div class="container">
    <table class="table caption-top" v-if="users && users.length > 0">
      <caption>
        <span> Danh sách người dùng ({{ users.length }}) </span>
        <span class="float-end"> </span>
      </caption>
      <table class="table table-striped">
        <thead class="table-primary">
          <tr>
            <th scope="col" class="text-center">Tên người dùng</th>
            <th scope="col" class="text-center">Email</th>
            <th scope="col" class="text-center">Mật khẩu</th>
            <th scope="col" class="text-center">Quyền hạn</th>
            <th scope="col" class="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody class="">
          <tr v-for="(user, index) in users" :key="index">
            <th scope="row" class="text-center">{{ user.name }}</th>
            <td class="text-center">{{ user.email }}</td>
            <td class="text-center">{{ user.pass }}</td>
            <td class="text-center">
              <span v-if="user.permission === 'admin'">Quản trị viên</span>
              <span v-else>Người dùng</span>
            </td>
            <td class="text-center">
              <button
                @click="confirmDeleteUser(user.id)"
                class="btn btn-danger"
              >
                Xóa User
              </button>
              &nbsp;
              <router-link
                :to="{ name: 'UpdateUser', params: { userId: user.id } }"
              >
                <button @click="updateUser(user.id)" class="btn btn-info">
                  Sửa User
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </table>
    <div v-else class="alert alert-warning mt15" role="alert">
      Không có user nào
    </div>
  </div>
</template>
  
  <script>
import Navbar from "@/components/Header/Navbar.vue";
import axios from "axios";

export default {
  name: "UserManagement",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        this.users = response.data;
      } catch (error) {
        console.error("Er:", error);
      }
    },
    confirmDeleteUser(userId) {
      if (confirm("Bạn có chắc là xóa user này không?")) {
        this.deleteUser(userId);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        console.log(`Delete: ${userId}`);
        this.fetchUsers();
      } catch (error) {
        console.error("Er:", error);
      }
    },
    updateUser(userId) {
      console.log(`Update: ${userId}`);
    },
  },
  created() {
    this.fetchUsers();
  },
  components: {
    Navbar,
  },
};
</script>
  
  <style>
.mt15 {
  margin-top: 15px;
}
</style>
  