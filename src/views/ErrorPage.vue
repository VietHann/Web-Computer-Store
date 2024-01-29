<template>
  <div>
    <br />
    <div class="text-center">
      <router-link :to="{ name: 'Home' }">
        <button class="btn btn-info">Về trang chủ</button>
      </router-link>
    </div>
    <br />
    <img
      src="../assets/pageNotFound.png"
      class="rounded mx-auto d-block h400"
    />
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style>
.h400 {
  height: 400px;
}
</style>
