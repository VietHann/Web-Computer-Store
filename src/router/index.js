import { createRouter, createWebHistory } from "vue-router";
import HomeAdmin from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import ErrorPage from "../views/ErrorPage.vue";
import UpdateProfile from "../components/Profile/UpdateProfile.vue";
import UpdateUser from "../components/Profile/UpdateUser.vue";
import AddNewProduct from "../components/Product/AddNewProduct.vue";
import UserManagement from "../components/Profile/UserManagement.vue"
import DeleteProduct from "../components/Product/DeleteProduct.vue";
import UpdateProduct from "../components/Product/UpdateProduct.vue";
import UserHome from "@/views/UserHome.vue";
import AdminHome from "@/views/AdminHome.vue";
import ProductHome from "../components/Menu/ProductHome.vue"
import ProductDetail from "../components/Product/ProductDetail.vue"
import ProductListHome from "../components/Menu/ProductListHome.vue"
import News from "../components/Menu/News.vue"
import Contact from "../components/Menu/Contact.vue"
import Cart from "../components/Menu/Cart.vue"
import Navbar from "../components/Header/Navbar.vue"
import DonHang from "../components/Menu/DonHang.vue"
import ThongKe from "../components/Menu/ThongKe.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeAdmin,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/nav",
    name: "Navbar",
    component: Navbar,
    meta: { requiresAdmin: true },

  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/thongke",
    name: "ThongKe",
    component: ThongKe,
    meta: { requiresAdmin: true },

  },
  {
    path: "/donhang-admin",
    name: "DonHang",
    component: DonHang,
    meta: { requiresAdmin: true },

  },
  {
    path: "/product-home",
    name: "ProductHome",
    component: ProductHome,
  },
  {
    path: "/product-test",
    name: "ProductListHome",
    component: ProductListHome,
    meta: { requiresAdmin: true },

  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/sign-up",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
  {
    path: "/usermanagement",
    name: "UserManagement",
    component: UserManagement,
    meta: { requiresAdmin: true },
  },
  {
    path: "/update/user/:userId",
    name: "UpdateUser",
    component: UpdateUser,
    meta: { requiresAdmin: true },
  },
  {
    path: "/add-new-product",
    name: "AddNewProduct",
    component: AddNewProduct,
    meta: { requiresAdmin: true },
  },
  {
    path: "/update/product/:productId",
    name: "UpdateProduct",
    component: UpdateProduct,
    meta: { requiresAdmin: true },
  },
  {
    path: "/delete-product/:productId",
    name: "DeleteProduct",
    component: DeleteProduct,
    meta: { requiresAdmin: true },
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
  { path: "/user-home", name: "UserHome", component: UserHome },
  {
    path: '/admin-home',
    name: 'AdminHome',
    component: AdminHome,
    meta: { requiresAdmin: true },

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const userInfo = localStorage.getItem('user-info');
    try {
      if (userInfo) {
        const user = JSON.parse(userInfo);
        if (user && user.permission === 'admin') {
          next();
        } else {
          next({ name: 'UserHome' });
        }
      } else {
        next({ name: 'Login' });
      }
    } catch (error) {
      console.error('Error:', error);
      next({ name: 'Login' });
    }
  } else {
    next();
  }
  if (to.params.pageTitle !== undefined) {
    document.title = `${to.name} | ${to.params.pageTitle} | BuyComputer`;
  } else {
    if (to.name == null) {
      document.title = `Unknow Page | BuyComputer`;
    } else {
      document.title = `${to.name} | BuyComputer`;
    }
  }
  next();

});
export default router;
