<template>
  <form @submit.prevent>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title text-center">Sign Up</h1>
              <div
                class="form-floating mb-3"
                :class="{ 'has-error': v$.name.$error }"
              >
                <input
                  type="text"
                  class="form-control"
                  id="floatNameIs"
                  placeholder="Tên"
                  v-model.trim="name"
                />
                <label for="floatNameIs">Tên</label>
                <div class="error-feedback" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </div>
              </div>
              <div
                class="form-floating mb-3"
                :class="{ 'has-error': v$.email.$error }"
              >
                <input
                  type="email"
                  class="form-control"
                  id="floatEmailIs"
                  placeholder="Email"
                  v-model.trim="email"
                />
                <label for="floatEmailIs">Email</label>
                <div class="error-feedback" v-if="v$.email.$error">
                  {{ v$.email.$errors[0].$message }}
                </div>
              </div>
              <div
                class="form-floating mb-3"
                :class="{ 'has-error': v$.pass.$error }"
              >
                <input
                  type="password"
                  class="form-control"
                  id="floatPassIs"
                  placeholder="Password"
                  v-model.trim="pass"
                />
                <label for="floatPassIs">Password</label>
                <div class="error-feedback" v-if="v$.pass.$error">
                  {{ v$.pass.$errors[0].$message }}
                </div>
              </div>
              <button
                type="submit"
                @click="validateEmailBeforeSignUp"
                class="btn btn-success w-100"
              >
                Đăng ký
              </button>
              <span class="d-block text-center mt-3">
                Đã có tài khoản? <router-link :to="{ name: 'Login' }">Đăng nhập</router-link>
              </span>
              <div
                class="alert alert-success mt-3"
                v-if="successMessage.length > 0"
              >
                {{ successMessage }}
              </div>
              <div
                class="alert alert-danger mt-3"
                v-if="errorMessage.length > 0"
              >
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "SignUpForm",
  data() {
    return {
      v$: useValidate(),
      name: "",
      pass: "",
      email: "",
      successMessage: "",
      errorMessage: "",
      userEmailExists: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      pass: { required, minLength: minLength(10) },
      email: { required, email },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "Home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    LoginPage() {
      this.$router.push({ name: "Login" });
    },
    async validateEmailBeforeSignUp() {
      let res = await axios.get(
        `http://localhost:3000/users?email=${this.email}`
      );
      if (res.status == 200) {
        this.userEmailExists = res.data;
        if (this.userEmailExists.length != 1) {
          this.successMessage = "";
          this.errorMessage = "";
          this.signUpNow();
        } else {
          this.successMessage = "";
          this.errorMessage = "Email này đã tồn tại..";
        }
      }
    },
    async signUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Xong");
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          pass: this.pass,
          permission: "user",
        });
        if (result.status == 201) {
          console.log("Xong ");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result);
          console.log(JSON.stringify(result.data));
          this.successMessage = "Loading ...";
          this.errorMessage = "";
          setTimeout(() => {
            this.redirectTo({ val: "UserHome" });
          }, 2000);
        } else {
          this.successMessage = "";
          this.errorMessage = "Hyax thử lại";
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Phải điền vào tất cả các mực!";
      }
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
  font-size: 0.85em;
}
.has-error input {
  border-color: #f44336;
}

.has-error .error-feedback {
  color: #f44336;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>