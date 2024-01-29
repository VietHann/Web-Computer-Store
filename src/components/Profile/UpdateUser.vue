<template>
  <div>
    <Navbar />
    <div class="form-container">
      <label>Tên:</label>
      <input
        type="text"
        v-model="inputName"
        placeholder="Name"
        class="input-field"
      />
      <label>Email:</label>
      <input
        type="text"
        v-model="inputEmail"
        placeholder="Email"
        class="input-field"
      />
      <label>Mật khẩu:</label>
      <input
        type="text"
        v-model="inputPass"
        placeholder="Password"
        class="input-field"
      />
      <label for="permission">Quyền hạn:</label>
      <select v-model="inputPermission" id="permission" class="select-field">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button @click="updateUserInfo" class="submit-btn">Sửa thông tin</button>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import Navbar from "@/components/Header/Navbar.vue";

export default {
  data() {
    return {
      inputName: "",
      inputEmail: "",
      inputPass: "",
      inputPermission: "user",
      userId: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const userId = this.$route.params.userId;
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        const user = response.data;

        this.inputName = user.name;
        this.inputEmail = user.email;
        this.inputPass = user.pass;
        this.inputPermission = user.permission;
        this.userId = user.id;
      } catch (error) {
        console.error("Er:", error);
      }
    },
    updateUserInfo() {
      axios
        .put(`http://localhost:3000/users/${this.userId}`, {
          name: this.inputName,
          email: this.inputEmail,
          pass: this.inputPass,
          permission: this.inputPermission,
        })
        .then((response) => {
          console.log("Cập nhật:", response.data);
          this.$router.go(-1);
        })
        .catch((error) => {
          console.error("Err:", error);
        });
    },
  },
  created() {
    this.fetchData();
  },
  components: {
    Navbar,
  },
};
</script>
  
<style>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.select-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
  