<template>
  <div class="body-content outer-top-xs">
    <div class="container">
      <div class="row">
        <div class="">
          <div class="search-result-container">
            <div id="myTabContent" class="tab-content category-list">
              <div class="tab-pane active" id="grid-container">
                <div class="category-product">
                  <p
                    class="section-title"
                    style="text-align: center; font-size: 100%"
                  >
                    DANH SÁCH SẢN PHẨM
                  </p>
                  <div class="row">
                    <div
                      v-for="product in products"
                      :key="product.id"
                      class="col-sm-6 col-md-4 wow fadeInUp animated"
                    >
                      <router-link
                        :to="'/product/' + product.id"
                        style="text-decoration: none"
                      >
                        <div class="products">
                          <div class="product">
                            <div class="product-image">
                              <div class="image">
                                <a
                                  style="text-decoration: none"
                                  href="detail.html"
                                  class="nopeee"
                                  ><img :src="product.image" alt=""
                                /></a>
                              </div>
                            </div>

                            <div class="product-info text-left">
                              <h3 class="name">
                                {{ product.name }}
                              </h3>

                              <div class="product-info2">
                                <div class="product-price">
                                  <span class="price" style="color: coral">{{
                                    product.price
                                  }}</span>
                                </div>
                                <span
                                  class="price"
                                  style="
                                    margin-left: auto;
                                    color: rgb(52, 147, 171);
                                    font-size: 90%;
                                  "
                                  >Số lượng: {{ product.quantity }}</span
                                >
                              </div>
                            </div>
                            <div class="cart clearfix animate-effect">
                              <div class="action">
                                <ul class="list-unstyled">
                                  <li class="add-cart-button btn-group">
                                    <button
                                      class="btn btn-primary icon"
                                      data-toggle="dropdown"
                                      type="button"
                                      style="border-radius: 20px"
                                    >
                                      Mua ngay
                                      <i class="fa fa-shopping-cart"></i>
                                    </button>
                                    <button
                                      class="btn btn-primary cart-btn"
                                      type="button"
                                    ></button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    showAllProducts() {
      this.selectedBrand = "";
      this.fetchProducts();
    },

    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        this.products = response.data;
      } catch (error) {
        console.error("Er:", error);
      }
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
body {
  background-color: #525a5a;
}
.nopeee {
  text-decoration: none;
}
.product-info2 {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
}
</style>
