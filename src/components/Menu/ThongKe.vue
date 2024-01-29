<template>
  <Navbar />

  <div class="container mt-5">
    <div class="user-stats">
      <h2>Thống Kê Người Dùng</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Tổng Tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userTotals" :key="user.email">
            <td>{{ user.email }}</td>
            <td>{{ user.total }}</td>
          </tr>
        </tbody>
      </table>
      <h3>Tổng Số Tiền: {{ tongTienU }}</h3>
    </div>
  </div>
</template>
  
  
  <script>
import axios from "axios";
import Navbar from "@/components/Header/Navbar.vue";

export default {
  data() {
    return {
      userTotals: [],
      tongTienU: 0,
    };
  },
  components: {
    Navbar,
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/tongtienthanhtoan"
        );
        this.processData(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    processData(data) {
      if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
      }

      let tongTienU = 0;

      const totalsByEmail = data.reduce((acc, item) => {
        const amount = parseInt(item.totalAmount.replace(/[₫.\s]/g, ""), 10);
        tongTienU += amount;
        if (acc[item.email]) {
          acc[item.email] += amount;
        } else {
          acc[item.email] = amount;
        }
        return acc;
      }, {});

      this.userTotals = Object.entries(totalsByEmail).map(([email, total]) => ({
        email,
        total: total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      }));

      this.tongTienU = tongTienU.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
};
</script>
  
<style scoped>
.user-stats {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  font-size: 20px;
  margin-top: 20px;
}
</style>
