<template>
  <div class="container">
    <NavbarUser />
    <br /><br /><br /><br /><br />
    <form @click.prevent>
      <div class="row g-3">
        <div
          class="col-md-6 col-lg-4 d-flex justify-content-center align-items-center"
        >
          <div class="can">
            <img src="../../assets/image/userlog.png" class="rounded-image" />
          </div>
        </div>
        <div class="col-md-6 col-lg-8">
          <h1 style="text-align: center">Thông tin người dùng</h1>
          <div class="form-floating mb-3">
            <input
              disabled
              type="text"
              class="form-control"
              id="floatNameIs"
              placeholder="Tên"
              v-model.trim="name"
            />
            <label for="floatNameIs">Tên</label>
          </div>
          <div class="form-floating mb-3">
            <input
              disabled
              type="email"
              class="form-control"
              id="floatEmailIs"
              placeholder="Email"
              v-model.trim="email"
            />
            <label for="floatEmailIs">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              disabled
              type="password"
              class="form-control"
              id="floatPassIs"
              placeholder="Password"
              v-model.trim="pass"
            />
            <label for="floatPassIs">Password</label>
          </div>
          <div class="d-flex justify-content-center">
            <button
              type="submit"
              @click="updateProfile()"
              class="btn btn-primary"
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
  


<script>
import NavbarUser from "@/components/Header/NavbarUser.vue";
import { mapActions } from "vuex";

export default {
  name: "ProfileForm",
  components: {
    NavbarUser,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
    } else {
      this.redirectTo({ val: "Signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    updateProfile() {
      this.redirectTo({ val: "UpdateProfile" });
    },
  },
};
</script>

<style>
.rounded-image {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
.can {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
