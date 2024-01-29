<template>
  <div class="container">
    <NavbarUser />
    <br /><br /><br /><br />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Cập nhật thông tin</h1>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.name.$error }"
          >
            <input
              type="text"
              class="w250 form-control"
              id="floatNameIs"
              placeholder="Tên"
              v-model.trim="name"
            />
            <label for="floatNameIs">Tên</label>
            <span class="error-feedback" v-if="v$.name.$error">{{
              v$.name.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.email.$error }"
          >
            <input
              type="email"
              class="w250 form-control"
              id="floatEmailIs"
              placeholder="Email"
              v-model.trim="email"
            />
            <label for="floatEmailIs">Email</label>
            <span class="error-feedback" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <span class="error-feedback" v-if="v$.pass.$error">{{
            v$.pass.$errors[0].$message
          }}</span>
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.pass.$error }"
          >
            <input
              type="password"
              class="w250 form-control"
              id="floatPassIs"
              placeholder="Password"
              v-model.trim="pass"
            />
            <label for="floatPassIs">Password</label>
            <span class="error-feedback" v-if="v$.pass.$error">{{
              v$.pass.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="submit"
            @click="updateProfileNow()"
            class="w250 btn btn-warning"
          >
            Cập nhật
          </button>
        </div>
      </div>

      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto error-feedback">
          {{ updateErr }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "@vuelidate/validators";
import { mapActions } from "vuex";
import NavbarUser from "@/components/Header/NavbarUser.vue";
import axios from "axios";
import useValidate from "@vuelidate/core";

export default {
  name: "UpdateProfile",
  components: {
    NavbarUser,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      pass: "",
      userId: "",
      updateErr: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      email: { required, email },
      pass: { required, minLength: minLength(10) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
      this.userId = JSON.parse(user).id;
    } else {
      this.redirectTo({ val: "Signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async updateProfileNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Validated");
        let result = await axios.put(
          `http://localhost:3000/users/${this.userId}`,
          {
            name: this.name,
            email: this.email,
            pass: this.pass,
            permission: "user",
          }
        );
        console.log(result);
        if (result.status == 200) {
          console.log("Profile Is Updated Successfully");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTo({ val: "Profile" });
        } else {
          console.warn("không được cập nhật");
          this.userNotFoundErr = "Hãy thử lại!";
        }
      } else {
        this.userNotFoundErr = "F5!";
      }
    },
  },
};
</script>

<style></style>
