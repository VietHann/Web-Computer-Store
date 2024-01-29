import { createStore } from "vuex";
import router from "../router/index";
import cartModule from './modules/cart';

const state = {
  isUserLoggedIn: "",
  loggedInUserId: "",
  user: null,
};
const getters = {
  user: (state) => state.user,
};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  isLoggedInUser(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggedIn = true;
      state.loggedInUserId = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = false;
    }
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    cart: cartModule
  },
});
