<template>
  <header class="header" id="header">
    <nav class="nav container">
      <a
        href="/"
        class="nav__logo"
        style="
          text-decoration: none;
          font-family: var(--body-font);
          color: rgb(161, 85, 155);
        "
      >
        <img src="../../assets/image/logo.png" alt="Logo" width="150" />
      </a>

      <div class="nav__menu" id="nav-menu">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link
              to="/"
              class="nav__item"
              active-class="active"
              style="text-decoration: none"
            >
              <a
                class="nav__link"
                style="text-decoration: none; font-family: var(--body-font)"
              >
                Home
              </a>
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              to="About"
              class="nav__item"
              active-class="active"
              style="text-decoration: none"
            >
              <a
                href="#"
                class="nav__link"
                style="text-decoration: none; font-family: var(--body-font)"
                >About Us</a
              >
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              to="product-home"
              class="nav__item"
              active-class="active"
              style="text-decoration: none"
            >
              <a
                href="#"
                class="nav__link"
                style="text-decoration: none; font-family: var(--body-font)"
              >
                Product</a
              >
            </router-link>
          </li>

          <li class="nav__item">
            <a
              href="/news"
              class="nav__link"
              style="text-decoration: none; font-family: var(--body-font)"
              >News</a
            >
          </li>

          <li class="nav__item">
            <a
              href="/contact"
              class="nav__link"
              style="text-decoration: none; font-family: var(--body-font)"
              >Contact</a
            >
          </li>
        </ul>
        <div class="nav__close" id="nav-close">
          <i class="ri-close-line"></i>
        </div>
      </div>

      <div class="nav__actions">
        <i class="ri-search-line nav__search" id="search-btn"></i>
        <i
          @click="togglePopover"
          class="ri-user-line nav__login"
          id="login-btn"
        ></i>
        <div v-if="isPopoverOpen" class="popover">
          <ul>
            <li><a href="/profile">Chọn hồ sơ</a></li>
            <li><a href="/cart">Giỏ hàng</a></li>
            <li><a @click="logMeOut" href="#">Đăng xuất</a></li>
          </ul>
        </div>
        <div class="nav__toggle" id="nav-toggle">
          <i class="ri-menu-line"></i>
        </div>
      </div>
    </nav>
  </header>

  <div class="search" id="search">
    <form action="" class="search__form">
      <i class="ri-search-line search__icon"></i>
      <input type="search" placeholder="Sản phẩm?" class="search__input" />
    </form>

    <i class="ri-close-line search__close" id="search-close"></i>
  </div>
</template>

<script>
import "../../assets/css/main.css";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isPopoverOpen: false,
    };
  },

  mounted() {
    this.mainScript();
  },
  methods: {
    togglePopover() {
      this.isPopoverOpen = !this.isPopoverOpen;
    },
    ...mapActions(["redirectTo"]),
    logMeOut() {
      localStorage.clear();
      this.redirectTo({ val: "Login" });
    },
    mainScript() {
      document.addEventListener("DOMContentLoaded", () => {
        const navMenu = document.getElementById("nav-menu");
        const navToggle = document.getElementById("nav-toggle");
        const navClose = document.getElementById("nav-close");
        const search = document.getElementById("search");
        const searchBtn = document.getElementById("search-btn");
        const searchClose = document.getElementById("search-close");

        navToggle.addEventListener("click", () => {
          navMenu.classList.add("show-menu");
        });

        navClose.addEventListener("click", () => {
          navMenu.classList.remove("show-menu");
        });

        searchBtn.addEventListener("click", () => {
          search.classList.add("show-search");
        });

        searchClose.addEventListener("click", () => {
          search.classList.remove("show-search");
        });
      });
    },
  },
};
</script>

<style>
.popover {
  position: absolute;
  top: calc(100% - 20px);
  left: 91%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.popover ul {
  list-style: none;
  padding: 0;
}

.popover li {
  margin-bottom: 10px;
}

.popover a {
  text-decoration: none;
  color: #333;
}
.header {
  background-color: #eef0f7;
}
</style>
