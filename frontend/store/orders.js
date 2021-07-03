import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_RESET
} from "../constants/order-constants";

export const state = () => {
  return {
    order: {},
    fetchedOrder: {},
    fetchedOrders: [],
    loading: false,
    loadingPay: false,
    error: "",
    message: "",
    alert: "",
    successPay: false
  };
};

export const mutations = {
  [ORDER_CREATE_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [ORDER_CREATE_SUCCESS](state, order) {
    state.order = order;
    state.message = "Ваш заказ успешно размещен";
    state.loading = false;
  },
  [ORDER_CREATE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [ORDER_DETAILS_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [ORDER_DETAILS_SUCCESS](state, fetchedOrder) {
    state.fetchedOrder = fetchedOrder;
    state.loading = false;
  },
  [ORDER_DETAILS_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [ORDER_PAY_REQUEST](state) {
    state.loadingPay = true;
    state.error = "";
    state.alert = "";
    state.successPay = false;
  },
  [ORDER_PAY_SUCCESS](state, message) {
    state.alert = "Оплата прошла успешно";
    state.loadingPay = false;
    state.successPay = true;
  },
  [ORDER_PAY_FAIL](state, error) {
    state.error = error;
    state.loadingPay = false;
    state.alert = "";
  },
  [ORDER_PAY_RESET](state) {
    state.error = "";
    state.loadingPay = false;
    state.successPay = false;
  },
  [ORDER_LIST_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [ORDER_LIST_SUCCESS](state, fetchedOrders) {
    state.fetchedOrders = fetchedOrders;
    state.loading = false;
  },
  [ORDER_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [ORDER_LIST_RESET](state, error) {
    state.loading = false;
    state.error = "";
    state.fetchedOrders = [];
  }
};

export const actions = {
  async createOrder({ commit, state, rootState }, order) {
    try {
      commit(ORDER_CREATE_REQUEST);
      const {
        userInfo: { token }
      } = rootState.users;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.post(
        `http://localhost:5050/api/orders`,
        order,
        config
      );
      commit(ORDER_CREATE_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(ORDER_CREATE_FAIL, errorMessage);
    }
  },
  async getOrderDetails({ commit, state, rootState }, id) {
    try {
      commit(ORDER_DETAILS_REQUEST);
      const {
        userInfo: { token }
      } = rootState.users;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.get(
        `http://localhost:5050/api/orders/${id}`,
        config
      );
      commit(ORDER_DETAILS_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(ORDER_DETAILS_FAIL, errorMessage);
    }
  },
  async payOrder({ commit, state, rootState }, { orderId, paymentResult }) {
    try {
      commit(ORDER_PAY_REQUEST);
      const {
        userInfo: { token }
      } = rootState.users;
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.put(
        `http://localhost:5050/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      commit(
        ORDER_PAY_SUCCESS,
        `Оплата прошла успешно, ${paymentResult.payer.name.given_name}`
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(ORDER_PAY_FAIL, errorMessage);
    }
  },
  async getOrdersList({ commit, state, rootState }) {
    try {
      commit(ORDER_LIST_REQUEST);
      const {
        userInfo: { token }
      } = rootState.users;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await this.$axios.get(
        `http://localhost:5050/api/orders/myorders`,
        config
      );
      commit(ORDER_LIST_SUCCESS, data);
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(ORDER_LIST_FAIL, errorMessage);
    }
  }
};

export const getters = {
  loading: state => state.loading,
  loadingPay: state => state.loadingPay,
  order: state => state.order,
  fetchedOrder: state => state.fetchedOrder,
  fetchedOrders: state => state.fetchedOrders,
  error: state => state.error,
  message: state => state.message,
  alert: state => state.alert,
  successPay: state => state.successPay
};
