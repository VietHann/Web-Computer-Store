<template>
  <div class="container">
    <Navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <h1>Xóa sản phẩm với Id {{ deleteProductA }}</h1>
          <hr />
          <p class="text-danger">Xóa sản phẩm này?</p>
          {{ name }}<br />
          {{ brand }}<br />
          {{ price }}<br />
          {{ description }}<br />
          {{ image }}<br />
          {{ specifications }}<br />
          {{ quantity }}<br />
          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto d-block">
          <button class="btn btn-info" @click="goBack()">Trở lại</button>
          &nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger" @click="deleteProduct()">
            Xóa ngay
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
          class="col-auto d-block mx-auto alert alert-warning"
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
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "DeleteProduct",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      specifications: "",
      quantity: "",
      deleteProductA: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.deleteProductA = this.$route.params.productId;
      this.canProductUser();
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goBack() {
      this.redirectTo({ val: "Home" });
    },
    async canProductUser() {
      let result = await axios.get(
        `http://localhost:3000/products?id=${this.deleteProductA}`
      );
      if (result.status === 200 && result.data.length > 0) {
        this.productData = result.data;
        this.name = this.productData[0].name;
        this.brand = this.productData[0].brand;
        this.price = this.productData[0].price;
        this.description = this.productData[0].description;
        this.image = this.productData[0].image;
        this.specifications = this.productData[0].specifications;
        this.quantity = this.productData[0].quantity;
      } else {
        this.redirectTo({ val: "Home" });
      }
    },
    async deleteProduct() {
      let result = await axios.delete(
        `http://localhost:3000/products/${this.deleteProductA}`
      );
      if (result.status == 200) {
        this.successMessage = "Đang xóa sản phẩm ...";
        this.errorMessage = "";
        setTimeout(() => {
          this.redirectTo({ val: "Home" });
        }, 2000);
      } else {
        this.successMessage = "";
        this.errorMessage = "Thử lại";
      }
    },
  },
};
</script>

<style></style>
