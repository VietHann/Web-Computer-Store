<template>
  <form @submit.prevent="userLogin" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Login</h1>
            <div
              class="form-floating mb-3"
              :class="{ 'has-error': v$.email.$error }"
            >
              <input
                type="email"
                class="form-control"
                id="floatEmailIs"
                placeholder="Email"
                v-model.trim="state.email"
              />
              <label for="floatEmailIs"
                ><i class="fa-solid fa-user"></i> Email</label
              >
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
                v-model.trim="state.pass"
              />
              <label for="floatPassIs"
                ><i class="fa-solid fa-lock"></i> Password</label
              >
              <div class="error-feedback" v-if="v$.pass.$error">
                {{ v$.pass.$errors[0].$message }}
              </div>
            </div>
            <button
              type="submit"
              class="ahu btn btn-success w-100"
              :disabled="isLoading"
            >
              <i class="fas fa-sign-in-alt"></i> Đăng nhập
              <span
                v-if="isLoading"
                class="ml-2 spinner-border spinner-border-sm"
              ></span>
            </button>

            <span class="d-block text-center mt-3">
              Chưa có tài khoản?
              <router-link :to="{ name: 'Signup' }">Đăng ký</router-link>
            </span>

            <div
              class="alert alert-success mt-3"
              v-if="successMessage.length > 0"
            >
              {{ successMessage }}
            </div>
            <div class="alert alert-danger mt-3" v-if="errorMessage.length > 0">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "LoginForm",
  computed: {
    ...mapGetters(["user"]),
  },
  setup() {
    const state = reactive({
      pass: "",
      email: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required },
      };
    });

    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      userNotFoundErr: "",
      successMessage: "",
      errorMessage: "",
      isLoading: false, 
    };
  },
  mounted() {
    const userInfo = localStorage.getItem("user-info");
    console.log("UserlocalStorage:", userInfo);

    try {
      if (userInfo) {
        const user = JSON.parse(userInfo);

        if (user && ["user", "admin"].includes(user.permission)) {
          this.$router.push({
            name: user.permission === "user" ? "UserHome" : "AdminHome",
          });
        } else {
          this.redirectToLogin();
        }
      } else {
        this.redirectToLogin();
      }
    } catch (error) {
      this.redirectToLogin();
    }
  },

  methods: {
    redirectToLogin() {
      this.$router.push({ name: "Login" });
    },
    ...mapActions(["redirectTo"]),
    async userLogin() {
      this.isLoading = true;
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}&pass=${this.state.pass}`
        );
        if (result.status == 200 && result.data.length > 0) {
          localStorage.setItem(
            "user-info",
            JSON.stringify({
              ...result.data[0],
              role: result.data[0].permission,
            })
          );

          if (result.data[0].permission === "user") {
            this.redirectTo({ val: "UserHome" });
          } else if (result.data[0].permission === "admin") {
            this.redirectTo({ val: "AdminHome" });
          } else {
            console.error("Er", result.data[0].permission);
            this.redirectTo({ val: "Home" });
          }
          this.successMessage = "Loading ...";
          this.errorMessage = "";
        } else {
          this.successMessage = "";
          this.errorMessage = "Người dùng không hợp lệ!";
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Phải nhập Email và Pass!";
      }
      this.isLoading = false; 
    },
  },
};
</script>

<style>
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

.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>