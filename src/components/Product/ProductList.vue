<template>
  <div class="backgr">
    <table
      class="table caption-top"
      v-if="products && products.length > 0"
      style="border: 1px solid #b1154a"
    >
      <caption>
        <span style="color: #ff0000">
          Danh sách sản phẩm: {{ products.length }}
        </span>
        <span class="float-end"> </span>
      </caption>
      <thead class="table-danger">
        <tr style="text-align: center">
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Hãng</th>
          <th scope="col">Giá tiền</th>
          <th scope="col">Mô tả</th>
          <th scope="col">Ảnh</th>
          <th scope="col">Thông số kĩ thuật</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <th scope="row">
            {{ product.name }}
          </th>
          <td>{{ product.brand }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>
            <img :src="product.image" style="width: 150px; height: 100px" />
          </td>
          <td>{{ product.specifications }}</td>
          <td>{{ product.quantity }}</td>

          <td>
            <router-link
              :to="{ name: 'DeleteProduct', params: { productId: product.id } }"
            >
              <button class="btn btn-danger" style="width: 80%">Delete</button>
            </router-link>
            &nbsp;
            <router-link
              :to="{ name: 'UpdateProduct', params: { productId: product.id } }"
            >
              <button class="btn btn-info" style="width: 80%">Update</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning mt15" role="alert">
      Không có sản phẩm
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["products"],
  methods: {
    deleteProduct(productId) {
      console.log(`Xóa: ${productId}`);
    },
    updateProduct(productId) {
      console.log(`Cập nhật: ${productId}`);
    },
  },
};
</script>

<style>
.mt15 {
  margin-top: 15px;
}
</style>
