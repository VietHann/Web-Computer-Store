const state = {
  cartItems: [],
};

const getters = {
  cartItems: (state) => state.cartItems,
};

const mutations = {
  addToCart(state, product) {
    state.cartItems.push(product);
  },
  removeFromCart(state, productId) {
    state.cartItems = state.cartItems.filter(item => item.id !== productId);
  },
};

const actions = {
  addToCart({ commit }, product) {
    commit('addToCart', product);
  },
  removeFromCart({ commit }, productId) {
    commit('removeFromCart', productId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
