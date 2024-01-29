<template>
  <Navbar />

  <div class="container">
    <router-link :to="{ name: 'AddNewProduct' }">
      <button type="button" class="btn btn-primary">Thêm sản phẩm mới</button>
    </router-link>
    <br />
    <ProductList :products="listOfLocations" />
  </div>
</template>

<script>
import Navbar from "@/components/Header/Navbar.vue";
import ProductList from "@/components/Product/ProductList.vue";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      userName: "",
      userId: "",
      listOfLocations: [],
    };
  },
  components: {
    Navbar,
    ProductList,
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "Signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/products?userId=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        console.log(result.data);
        this.listOfLocations = result.data;
      }
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
