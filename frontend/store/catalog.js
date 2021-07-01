import {
  CATALOG_FETCH_FAIL,
  CATALOG_FETCH_REQUEST,
  CATALOG_FETCH_SUCCESS
} from "../constants/catalog-constants";

export const state = () => ({ catalog: {}, loading: false, error: {} });

export const mutations = {
  [CATALOG_FETCH_REQUEST](state) {
    state.loading = true;
    state.catalog = {};
    state.error = null;
  },
  [CATALOG_FETCH_SUCCESS](state, catalog) {
    state.loading = false;
    state.catalog = catalog;
  },
  [CATALOG_FETCH_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  }
};

export const actions = {
  async fetchCatalog({ commit }) {
    commit(CATALOG_FETCH_REQUEST);
    try {
      const { data } = await this.$axios.get(
        `http://localhost:5050/api/categories`
      );
      commit(CATALOG_FETCH_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(CATALOG_FETCH_FAIL, errorMessage);
    }
  }
};

export const getters = {
  loading: state => state.loading,
  catalog: state => state.catalog,
  error: state => state.error
};
