<template>
  <NavbarUser />

  <div class="py-5 product-detail">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="product-image">
            <img :src="product.image" alt="Product Image" />
          </div>
        </div>
        <div class="col-md-6">
          <br /><br /><br />
          <div class="product-info">
            <h1>{{ product.name }}</h1>
            <p>Thương hiệu: {{ product.brand }}</p>
            <p>Giá: {{ product.price }} đồng</p>
            <p>Mô tả: {{ product.description }}</p>
            <p>Thông số kỹ thuật:</p>
            <ul>
              <li v-for="(spec, index) in specificationsList" :key="index">
                <i class="fa-solid fa-caret-up"></i> {{ spec }}
              </li>
            </ul>
            <p>Số lượng còn trong kho: {{ product.quantity }}</p>
            <div class="add-to-cart">
              <button class="btn btn-primary" @click="addToCart">
                Thêm vào giỏ
              </button>
            </div>
            <div v-if="addToCartSuccess" class="alert alert-success mt-3">
              Đã thêm sản phẩm vào giỏ hàng thành công!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
import NavbarUser from "@/components/Header/NavbarUser.vue";
import Footer from "@/components/Menu/Footer.vue";
import { mapActions } from "vuex";

export default {
  components: {
    NavbarUser,
    Footer,
  },
  data() {
    return {
      product: {},
      email: "",
      addToCartSuccess: false,
    };
  },
  computed: {
    specificationsList() {
      if (this.product && this.product.specifications) {
        return this.product.specifications.split("\n");
      }
      return [];
    },
  },

  mounted() {
    this.fetchProduct();
    let user = localStorage.getItem("user-info");
    if (user) {
      this.email = JSON.parse(user).email;
    } else {
      //this.$router.push("/login");
    }
  },

  methods: {
    ...mapActions(["redirectTo"]),
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${productId}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("Er:", error);
      }
    },
    async addToCart() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.post("http://localhost:3000/cart", {
          product: this.product,
          email: this.email,
          productId: productId,
        });

        console.log("API:", response.data);

        this.$store.dispatch("addToCart", this.product);
        this.addToCartSuccess = true;
      } catch (error) {
        console.error("Er:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
}

.product-image img {
  max-width: 100%;
  height: auto;
}

.product-info h1 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
}

.product-info p {
  font-size: 16px;
  margin-bottom: 10px;
}

.add-to-cart {
  margin-top: 20px;
}

</style>
