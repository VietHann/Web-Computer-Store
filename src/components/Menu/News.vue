<template>
  <NavbarUser /> <br />
  <br />
  <br />
  <br />
  <div class="container">
    <h1 class="my-4">Danh sách tin tức</h1>
    <div class="list-group">
      <a
        v-for="(article, index) in articles"
        :key="index"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        :href="article.url"
        target="_blank"
      >
        <div>
          <h4 class="mb-0">{{ article.title }}</h4>
          <p class="mb-1">{{ article.description }}</p>
        </div>
        <img
          v-if="article.image"
          :src="article.image"
          alt="Ảnh tin tức"
          class="news-image"
        />
      </a>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import NavbarUser from "@/components/Header/NavbarUser.vue";

export default {
  data() {
    return {
      articles: [],
    };
  },
  components: {
    NavbarUser,
  },
  mounted() {
    axios
      .get(
        "https://gnews.io/api/v4/search?q=example&apikey=8098f04300f1e1ebd5956e6f515d7994"
      )
      .then((response) => {
        this.articles = response.data.articles.slice(0, 10).map((article) => ({
          title: article.title,
          description: article.description,
          image: article.image,
          url: article.url,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
  
  <style scoped>
.news-image {
  max-width: 100px;
}
</style>
  