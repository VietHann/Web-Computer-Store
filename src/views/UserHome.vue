<template>
  <NavbarUser /> <br /><br /><br /><br />
  <div class="banner-slider">
    <div
      class="banner-slide"
      v-for="(slide, index) in slides"
      :key="index"
      :class="{ active: index === activeSlide }"
    >
      <img
        :src="slide.src"
        :alt="'Slide ' + (index + 1)"
        style="max-width: 100%; max-height:  600px;-"
      />
    </div>
  </div>
  <New />
  <ProductListHome />
  <br />
  <Footer />
</template>

<script>
import { mapActions } from "vuex";
import NavbarUser from "@/components/Header/NavbarUser.vue";
import New from "@/components/Menu/New.vue";
import ProductListHome from "@/components/Menu/ProductListHome.vue";
import Footer from "@/components/Menu/Footer.vue";

export default {
  data() {
    return {
      activeSlide: 0,
      slides: [
        { src: require("@/assets/image/banner1.png") },
        { src: require("@/assets/image/banner2.png") },
        { src: require("@/assets/image/banner3.png") },
      ],
    };
  },
  components: {
    NavbarUser,
    ProductListHome,
    New,
    Footer,
  },

  name: "Navbar",
  methods: {
    ...mapActions(["redirectTo"]),
    logMeOut() {
      localStorage.clear();
      this.redirectTo({ val: "Login" });
    },
    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 5000);
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-bottom: 50px;
}

ul a {
  text-decoration: none;
  font-weight: bold;
  color: darkcyan;
  padding: 10px;
}

a.router-link-exact-active a,
ul a:hover {
  color: #525a5a;
  box-shadow: 2px 2px 4px 0px #525a5a;
}

.banner-slider {
  position: relative;
  overflow: hidden;
  max-width: 100%;
}

.banner-slide {
  display: none;
}

.banner-slide.active {
  display: block;
}

.banner-slide img {
  width: 100%;
  height: auto;
}
</style>
