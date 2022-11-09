import { ORDER_LIST_RESET } from "~/constants/order-constants";
import {
  USER_INITIALIZE_STATE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_UPDATE,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_DETAILS_BY_ID_FAIL,
  USER_DETAILS_BY_ID_REQUEST,
  USER_DETAILS_BY_ID_RESET,
  USER_DETAILS_BY_ID_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS
} from "../constants/user-constants";

export const state = () => {
  return {
    userInfo: {},
    user: {},
    userDetailsById: {},
    users: [],
    loading: false,
    error: "",
    message: "",
    alert: ""
  };
};

export const mutations = {
  [USER_INITIALIZE_STATE](state, userInfoFromStorage) {
    state.userInfo = userInfoFromStorage || {};
  },
  [USER_LOGIN_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [USER_LOGIN_SUCCESS](state, userInfo) {
    let message = `Добро пожаловать, ${userInfo.name}!`;
    state.userInfo = userInfo;
    state.loading = false;
    state.message = message;
  },
  [USER_LOGIN_UPDATE](state, userInfo) {
    state.userInfo = { ...state.userInfo, ...userInfo };
  },
  [USER_LOGIN_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_REGISTER_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [USER_REGISTER_SUCCESS](state, userInfo) {
    const message = `Добро пожаловать, ${userInfo.name}!`;
    const alert = `${userInfo.name}, на ваш email ${userInfo.email}, было выслано письмо для активации аккаунта`;
    state.userInfo = userInfo;
    state.loading = false;
    state.message = message;
    state.alert = alert;
  },
  [USER_REGISTER_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_DETAILS_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [USER_DETAILS_SUCCESS](state, user) {
    state.user = user;
    state.loading = false;
  },
  [USER_DETAILS_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_DETAILS_RESET](state) {
    state.users = [];
  },
  [USER_DETAILS_BY_ID_REQUEST](state) {
    state.loading = "";
    state.error = "";
  },
  [USER_DETAILS_BY_ID_SUCCESS](state, userDetails) {
    state.userDetailsById = userDetails;
    state.loading = false;
  },
  [USER_DETAILS_BY_ID_FAIL](state, error) {
    state.error = error;
    state.loading = false;
  },
  [USER_DETAILS_BY_ID_RESET](state) {
    state.userDetailsById = {};
  },
  [USER_LIST_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [USER_LIST_SUCCESS](state, users) {
    state.users = users;
    state.loading = false;
  },
  [USER_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_UPDATE_PROFILE_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [USER_UPDATE_PROFILE_SUCCESS](state, user) {
    state.user = user;
    state.loading = false;
    state.message = "Изменения успешно сохранены";
  },
  [USER_UPDATE_PROFILE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_UPDATE_REQUEST](state) {
    state.loading = true;
    state.error = "";
  },
  [USER_UPDATE_SUCCESS](state, userDetailsById) {
    state.userDetailsById = userDetailsById;
    state.loading = false;
    state.message = "Изменения успешно сохранены";
  },
  [USER_UPDATE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_DELETE_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [USER_DELETE_SUCCESS](state) {
    state.loading = false;
    state.message = "Пользователь удален";
  },
  [USER_DELETE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [USER_LOGOUT](state) {
    state.userInfo = {};
    state.user = {};
    state.loading = "";
    state.error = "";
    state.message = "Вы вышли!";
  }
};

export const actions = {
  async login({ commit, state, rootState, rootGetters }, payload) {
    try {
      commit(USER_LOGIN_REQUEST);
      const { email, password } = payload;
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await this.$axios.post(
        `${rootGetters["apiUrl/getApiUrl"]}users/login`,
        { email, password },
        config
      );
      commit(USER_LOGIN_SUCCESS, data);
      if (process.browser) {
        window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_LOGIN_FAIL, errorMessage);
    }
  },
  async register({ commit, state, rootState, rootGetters }, payload) {
    try {
      commit(USER_REGISTER_REQUEST);
      const { email, password, name } = payload;
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await this.$axios.post(
        `${rootGetters["apiUrl/getApiUrl"]}users`,
        { email, password, name },
        config
      );
      commit(USER_REGISTER_SUCCESS, data);
      commit(USER_LOGIN_SUCCESS, data);
      if (process.browser) {
        window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_REGISTER_FAIL, errorMessage);
    }
  },
  async getUserDetails({ commit, state, rootState, rootGetters }, id) {
    try {
      commit(USER_DETAILS_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.get(
        `${rootGetters["apiUrl/getApiUrl"]}users/${id}`,
        config
      );
      commit(USER_DETAILS_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_DETAILS_FAIL, errorMessage);
    }
  },
  async getUserDetailsById({ commit, state, rootState, rootGetters }, id) {
    try {
      commit(USER_DETAILS_BY_ID_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.get(
        `${rootGetters["apiUrl/getApiUrl"]}users/${id}`,
        config
      );
      commit(USER_DETAILS_BY_ID_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_DETAILS_BY_ID_FAIL, errorMessage);
    }
  },
  async getUsers({ commit, state, rootState, rootGetters }) {
    try {
      commit(USER_LIST_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.get(
        `${rootGetters["apiUrl/getApiUrl"]}users`,
        config
      );
      commit(USER_LIST_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_LIST_FAIL, errorMessage);
    }
  },
  async updateUserProfile({ commit, state, rootState, rootGetters }, user) {
    try {
      commit(USER_UPDATE_PROFILE_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.put(
        `${rootGetters["apiUrl/getApiUrl"]}users/profile`,
        user,
        config
      );
      commit(USER_UPDATE_PROFILE_SUCCESS, data);
      let userInfo = { name: data.name, email: data.email };
      commit(USER_LOGIN_UPDATE, userInfo);
      if (process.browser) {
        window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_UPDATE_PROFILE_FAIL, errorMessage);
    }
  },
  async updateUser({ commit, state, rootState, rootGetters }, user) {
    try {
      commit(USER_UPDATE_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.put(
        `${rootGetters["apiUrl/getApiUrl"]}users/${user._id}`,
        user,
        config
      );
      commit(USER_UPDATE_SUCCESS, data);
      commit(USER_DETAILS_BY_ID_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_UPDATE_FAIL, errorMessage);
    }
  },
  async deleteUser({ commit, state, rootState, rootGetters }, userId) {
    try {
      commit(USER_DELETE_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await new Promise(res => {
        setTimeout(() => {
          res();
        }, 2000);
      });
      const { data } = await this.$axios.delete(
        `${rootGetters["apiUrl/getApiUrl"]}users/${userId}`,
        config
      );
      commit(USER_DELETE_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_DELETE_FAIL, errorMessage);
    }
  },
  logout({ commit, state }) {
    try {
      if (process.browser) {
        window.localStorage.removeItem("userInfo");
      }
      commit(USER_LOGOUT);
      commit(USER_DETAILS_RESET);
      commit(`orders/${ORDER_LIST_RESET}`, null, { root: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(USER_LOGIN_FAIL, errorMessage);
    }
  },
  initializeState({ commit }) {
    try {
      let userInfoFromStorage = {};
      if (process.browser) {
        userInfoFromStorage = window.localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : {};
      }
      commit(USER_INITIALIZE_STATE, userInfoFromStorage);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getters = {
  loading: state => state.loading,
  userInfo: state => state.userInfo,
  userDetailsById: state => state.userDetailsById,
  user: state => state.user,
  users: state => state.users,
  error: state => state.error,
  message: state => state.message,
  alert: state => state.alert
};
