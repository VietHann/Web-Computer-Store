<template>
  <Navbar />

  <div class="container mt-5">
    <div>
      <h1>Quản lý giỏ hàng user</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersWithCarts" :key="user.email">
            <td>{{ user.email }}</td>
            <td>
              <ul>
                <li v-for="cartItem in user.cart" :key="cartItem.id">
                  {{ cartItem.product.name }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="cartItem in user.cart" :key="cartItem.id">
                  {{ cartItem.product.price }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  
  <script>
import axios from "axios";
import Navbar from "@/components/Header/Navbar.vue";

export default {
  data() {
    return {
      usersWithCarts: [],
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => {
        const usersMap = new Map();
        response.data.forEach((cartItem) => {
          const email = cartItem.email;
          if (!usersMap.has(email)) {
            usersMap.set(email, []);
          }
          usersMap.get(email).push(cartItem);
        });

        this.usersWithCarts = Array.from(usersMap, ([email, cart]) => ({
          email,
          cart,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>
<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 4px;
}
</style>