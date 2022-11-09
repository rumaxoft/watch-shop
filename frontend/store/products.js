import {
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS
} from "../constants/product-constants";

export const state = () => ({ product: {}, loading: false, error: {} });

export const mutations = {
  [FETCH_PRODUCT_REQUEST](state) {
    (state.loading = true), (state.product = {});
    state.error = null;
  },
  [FETCH_PRODUCT_SUCCESS](state, product) {
    state.loading = false;
    state.product = product;
  },
  [FETCH_PRODUCT_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  }
};

export const actions = {
  async fetchProduct({ commit, rootGetters }, productId) {
    commit(FETCH_PRODUCT_REQUEST);
    try {
      const { data } = await this.$axios.get(
        `${rootGetters["apiUrl/getApiUrl"]}/products/${productId}`
      );
      commit(FETCH_PRODUCT_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(FETCH_PRODUCT_FAIL, errorMessage);
    }
  }
};

export const getters = {
  loading: state => state.loading,
  product: state => state.product,
  error: state => state.error
};
