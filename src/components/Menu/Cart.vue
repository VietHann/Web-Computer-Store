<template>
  <NavbarUser />
  <br /><br /><br /><br /><br />
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Giỏ hàng của bạn</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Đơn giá</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                  <td>{{ item.product.name }}</td>
                  <td>{{ item.product.price }}đ</td>
                  <td>
                    <button
                      @click="removeFromCart(index, item)"
                      class="btn btn-danger btn-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between">
          <strong>Tổng cộng: {{ totalAmount }}</strong>
          <button @click="checkout" class="btn btn-primary">Thanh toán</button>
        </div>
        <div v-if="removeFromCartSuccess" class="alert alert-success mt-3">
          Đã xóa sản phẩm khỏi giỏ hàng thành công!
        </div>
        <div v-if="checkoutSuccess" class="alert alert-success mt-3">
          Đã thanh toán thành công!
        </div>
        <br />
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Thông tin người dùng</div>
          <div class="card-body">
            <p><strong>Email:</strong> {{ email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br><br>
  <Footer />
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import NavbarUser from "@/components/Header/NavbarUser.vue";
import Footer from "@/components/Menu/Footer.vue";
export default {
  data() {
    return {
      cart: [],
      email: "",
      removeFromCartSuccess: false,
      checkoutSuccess: false,
    };
  },
  components: {
    NavbarUser,
    Footer,
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.cart.forEach((item) => {
        const price = parseFloat(item.product.price.replace(/\./g, ""));
        console.log(price);

        if (!isNaN(price)) {
          total += price;
        }
      });

      return total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.email = JSON.parse(user).email;
      this.fetchProduct();
    } else {
      this.$router.push({ name: "Signup" });
    }
  },
  methods: {
    removeFromCart(index, item) {
      axios
        .delete(`http://localhost:3000/cart/${item.id}`)
        .then(() => {
          this.cart.splice(index, 1);
          this.removeFromCartSuccess = true;
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sản phẩm từ giỏ hàng:", error);
        });
    },
    checkout() {
      if (this.cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
      }

      const data = {
        totalAmount: this.totalAmount,
        email: this.email,
      };

      axios
        .post("http://localhost:3000/tongtienthanhtoan", data)
        .then((response) => {
          console.log(response.data);

          this.cart = [];
          this.checkoutSuccess = true;
          this.redirectTo("HomePage");
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API thanh toán:", error);
        });
    },

    fetchProduct() {
      axios
        .get(`http://localhost:3000/cart?email=${this.email}`)
        .then((response) => {
          console.log(this.email);
          console.log(response.data);
          this.cart = response.data;
        })

        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
        });
    },
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style scoped>
</style>
