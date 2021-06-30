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
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS
} from "../constants/user-constants";

export const state = () => {
  return {
    userInfo: {},
    user: {},
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
    console.log(alert);
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
  [USER_UPDATE_PROFILE_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [USER_UPDATE_PROFILE_SUCCESS](state, user) {
    state.user = user;
    state.loading = false;
    state.message = "Изменения успешно сохранены";
  },
  [USER_UPDATE_PROFILE_RESET](state, user) {
    state.user = user;
    state.loading = false;
  },
  [USER_UPDATE_PROFILE_FAIL](state, error) {
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
  async login({ commit, state }, payload) {
    try {
      commit(USER_LOGIN_REQUEST);
      const { email, password } = payload;
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await this.$axios.post(
        "http://localhost:5050/api/users/login",
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
  async register({ commit, state }, payload) {
    try {
      commit(USER_REGISTER_REQUEST);
      const { email, password, name } = payload;
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await this.$axios.post(
        "http://localhost:5050/api/users",
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
  async getUserDetails({ commit, state }, id) {
    try {
      commit(USER_DETAILS_REQUEST);
      const {
        userInfo: { token }
      } = state;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.get(
        `http://localhost:5050/api/users/${id}`,
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
  async updateUserProfile({ commit, state }, user) {
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
        `http://localhost:5050/api/users/profile`,
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
  logout({ commit, state }) {
    try {
      if (process.browser) {
        window.localStorage.removeItem("userInfo");
      }
      commit(USER_LOGOUT);
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
  user: state => state.user,
  error: state => state.error,
  message: state => state.message,
  alert: state => state.alert
};
