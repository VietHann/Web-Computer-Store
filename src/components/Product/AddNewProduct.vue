<template>
  <Navbar />
  <div class="container">
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <h1>Thêm sản phẩm mới</h1>
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
              id="floatRestNameIs"
              placeholder="Tên sản phẩm"
              v-model.trim="state.name"
            />
            <label for="floatRestNameIs">Tên sản phẩm</label>
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
            :class="{ 'form-group-error': v$.brand.$error }"
          >
            <input
              type="text"
              class="w250 form-control"
              id="floatRestbrand"
              placeholder="Hãng sản phẩm"
              v-model.trim="state.brand"
            />
            <label for="floatRestbrand">Hãng sản phẩm</label>
            <span class="error-feedback" v-if="v$.brand.$error">{{
              v$.brand.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.price.$error }"
          >
            <input
              type="text"
              class="w250 form-control"
              id="floatRestprice"
              placeholder="Giá sản phẩm"
              v-model.trim="state.price"
            />
            <label for="floatRestprice">Giá sản phẩm</label>
            <span class="error-feedback" v-if="v$.price.$error">{{
              v$.price.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.description.$error }"
          >
            <textarea
              class="w250 form-control"
              id="floatProductDescription"
              placeholder="Mô tả sản phẩm"
              v-model.trim="state.description"
            ></textarea>
            <label for="floatRestdescription">Mô tả sản phẩm</label>
            <span class="error-feedback" v-if="v$.description.$error">{{
              v$.description.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.image.$error }"
          >
            <input
              type="text"
              class="w250 form-control"
              id="floatRestimage"
              placeholder="Đường dẫn ảnh"
              v-model.trim="state.image"
            />
            <label for="floatRestimage">Đường dẫn ảnh</label>
            <span class="error-feedback" v-if="v$.image.$error">{{
              v$.image.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.specifications.$error }"
          >
            <textarea
              class="w250 form-control"
              id="floatProductspecifications"
              placeholder="Mô tả sản phẩm"
              v-model.trim="state.specifications"
            ></textarea>
            <label for="floatRestspecifications">Thông số kĩ thuật</label>
            <span class="error-feedback" v-if="v$.specifications.$error">{{
              v$.specifications.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <div
            class="form-floating mb-3"
            :class="{ 'form-group-error': v$.quantity.$error }"
          >
            <input
              type="text"
              class="w250 form-control"
              id="floatRestquantity"
              placeholder="Số lượng sản phẩm"
              v-model.trim="state.quantity"
            />
            <label for="floatRestquantity">Số lượng sản phẩm</label>
            <span class="error-feedback" v-if="v$.quantity.$error">{{
              v$.quantity.$errors[0].$message
            }}</span>
          </div>
        </div>
      </div>

      <div class="row g-3 align-items-center">
        <div class="col-auto d-block mx-auto">
          <button
            type="button"
            @click="addProduct()"
            class="w250 btn btn-primary"
          >
            Add Now
          </button>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div
          class="col-auto d-block mx-auto alert alert-success"
          v-if="successMessage.length > 0"
        >
          {{ successMessage }}
        </div>
        <div
          class="col-auto d-block mx-auto alert alert-danger"
          v-if="errorMessage.length > 0"
        >
          {{ errorMessage }}
        </div>
      </div>
    </form>
  </div>
</template>
  
  <script>
import Navbar from "@/components/Header/Navbar.vue";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "AddNewLocation",
  setup() {
    const state = reactive({
      name: "",
      price: "",
      brand: "",
      description: "",
      image: "",
      specifications: "",
      quantity: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(3) },
        brand: { required, minLength: minLength(3) },
        price: { required },
        description: { required, minLength: minLength(10) },
        image: { required, minLength: minLength(10) },
        specifications: { required, minLength: minLength(10) },
        quantity: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  components: {
    Navbar,
  },
  data() {
    return {
      userId: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userId = JSON.parse(user).id;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async addProduct() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Validated");
        let results = await axios.post(`http://localhost:3000/products`, {
          name: this.state.name,
          brand: this.state.brand,
          price: this.state.price,
          description: this.state.description,
          image: this.state.image,
          specifications: this.state.specifications,
          quantity: this.state.quantity,
          userId: this.userId,
        });
        if (results.status == 201) {
          this.errorMessage = "";
          this.successMessage = "Add New Product";
          setTimeout(() => {
            this.redirectTo({ val: "Home" });
          }, 2000);
          console.log("Thêm thành công");
        } else {
          this.successMessage = "";
          this.errorMessage = "Thử lại!";

          console.log("Lỗi thêm");
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Nhập đầy đủ!";
      }
    },
  },
};
</script>
  
  <style></style>
  