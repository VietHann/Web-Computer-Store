<template>
  <NavbarUser />
  <br /><br /><br /><br />
  <div class="body-content outer-top-xs">
    <div class="container">
      <div class="row">
        <div class="col-md-3 sidebar">
          <div class="sidebar-module-container">
            <div class="sidebar-filter">
              <div
                class="sidebar-widget wow fadeInUp animated"
                style="visibility: visible; animation-name: fadeInUp"
              >
                <h3 class="section-title">LỌC SẢN PHẨM</h3>
                <div class="widget-header">
                  <h4 class="widget-title">Thương hiệu</h4>
                </div>
                <div class="sidebar-widget-body">
                  <div class="accordion">
                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a
                          style="text-decoration: none"
                          href="#Lenovo"
                          data-toggle="collapse"
                          class="accordion-toggle collapsed"
                          @click="filterProductsByBrand('Lenovo')"
                        >
                          Lenovo
                        </a>
                      </div>
                    </div>

                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a
                          style="text-decoration: none"
                          href="#MSI"
                          data-toggle="collapse"
                          class="accordion-toggle collapsed"
                          @click="filterProductsByBrand('MSI')"
                        >
                          MSI
                        </a>
                      </div>
                    </div>

                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a
                          style="text-decoration: none"
                          href="#HP-Gaming"
                          data-toggle="collapse"
                          class="accordion-toggle collapsed"
                          @click="filterProductsByBrand('HP Gaming')"
                        >
                          HP Gaming
                        </a>
                      </div>
                    </div>

                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a
                          style="text-decoration: none"
                          href="#Asus"
                          data-toggle="collapse"
                          class="accordion-toggle collapsed"
                          @click="filterProductsByBrand('Asus')"
                        >
                          Asus
                        </a>
                      </div>
                    </div>

                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a
                          style="text-decoration: none"
                          href="#Acer"
                          data-toggle="collapse"
                          class="accordion-toggle collapsed"
                          @click="filterProductsByBrand('Acer')"
                        >
                          Acer
                        </a>
                      </div>
                    </div>

                    <div class="accordion-group">
                      <div class="accordion-heading">
                        <a
                          style="text-decoration: none"
                          href="#Khac"
                          data-toggle="collapse"
                          class="accordion-toggle collapsed"
                          @click="showAllProducts()"
                        >
                          Khác
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-9">
          <div class="search-result-container">
            <div id="myTabContent" class="tab-content category-list">
              <div class="tab-pane active" id="grid-container">
                <div class="category-product">
                  <p class="section-title" style="text-align: center">
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
import NavbarUser from "@/components/Header/NavbarUser.vue";

export default {
  data() {
    return {
      products: [],
      selectedBrand: "",
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
    async filterProductsByBrand(brand) {
      try {
        const response = await axios.get(
          `http://localhost:3000/products?brand=${brand}`
        );
        this.products = response.data;
      } catch (error) {
        console.error("Er:", error);
      }
    },
  },
  components: {
    NavbarUser,
  },
};
</script>

<style>
a {
  text-decoration: none;
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
