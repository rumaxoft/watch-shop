import {
  CART_INITIALIZE_STATE,
  CART_ADD_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET
} from "../constants/cart-constants";

export const state = () => {
  return {
    cartItems: [],
    address: {},
    paymentMethod: "",
    loading: false,
    error: "",
    message: ""
  };
};

export const mutations = {
  [CART_INITIALIZE_STATE](state, cartItemsFromStorage) {
    state.cartItems = cartItemsFromStorage || [];
  },
  [CART_ADD_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [CART_ADD_SUCCESS](state, item) {
    let message = "";
    const existItem = state.cartItems.find(el => el.product === item.product);
    if (existItem) {
      message = "этот товар уже есть в корзине";
      state.cartItems = state.cartItems.map(el => {
        const itemToArray = el.product === item.product ? item : el;
        if (el.qty !== item.qty) {
          message = "количество изменено";
        }
        return itemToArray;
      });
    } else {
      state.cartItems.push(item);
      message = "добавлено в корзину";
    }
    state.loading = false;
    state.message = message;
  },
  [CART_ADD_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [CART_REMOVE_REQUEST](state) {
    state.loading = true;
    state.error = "";
    state.message = "";
  },
  [CART_REMOVE_SUCCESS](state, item) {
    state.cartItems = state.cartItems.filter(el => el.product !== item.product);
    state.loading = false;
    state.message = "удален из корзины";
  },
  [CART_REMOVE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [CART_SAVE_ADDRESS](state, address) {
    state.address = address;
  },
  [CART_SAVE_PAYMENT_METHOD](state, paymentMethod) {
    state.paymentMethod = paymentMethod;
  },
  [CART_RESET](state) {
    state.cartItems = [];
  }
};

export const actions = {
  async addToCart({ commit, state }, payload) {
    try {
      commit(CART_ADD_REQUEST);
      const { data } = await this.$axios.get(
        `http://localhost:5050/api/products/${payload.productId}`
      );
      if (!data) throw new Error("такого товара не существует");
      const item = {
        product: data._id,
        name: data.name,
        image: data.images[0].thumb,
        price: data.price,
        countInStock: data.countInStock,
        qty: payload.qty
      };
      commit(CART_ADD_SUCCESS, item);
      if (process.browser) {
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems)
        );
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(CART_ADD_FAIL, errorMessage);
    }
  },
  async removeFromCart({ commit, state }, payload) {
    try {
      commit(CART_REMOVE_REQUEST);
      const { data } = await this.$axios.get(
        `http://localhost:5050/api/products/${payload.productId}`
      );

      if (!data) throw new Error("такого товара не существует");
      const item = {
        product: data._id
      };
      commit(CART_REMOVE_SUCCESS, item);
      if (process.browser) {
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems)
        );
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      commit(CART_REMOVE_FAIL, errorMessage);
    }
  },
  saveAddressToCart({ commit, state }, payload) {
    commit(CART_SAVE_ADDRESS, payload);
    if (process.browser) {
      window.localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.address)
      );
    }
  },
  savePaymentMethodToCart({ commit, state }, paymentMethod) {
    commit(CART_SAVE_PAYMENT_METHOD, paymentMethod);
    if (process.browser) {
      window.localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    }
  },
  resetCart({ commit }) {
    commit(CART_RESET);
    if (process.browser) {
      window.localStorage.removeItem("cartItems");
    }
  },
  initializeState({ commit }) {
    try {
      let cartItemsFromStorage = [];
      let shippingAddressFromStorage = {};
      let paymentMethodFromStorage = "";
      if (process.browser) {
        cartItemsFromStorage = window.localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [];
        shippingAddressFromStorage = window.localStorage.getItem(
          "shippingAddress"
        )
          ? JSON.parse(localStorage.getItem("shippingAddress"))
          : {};
        paymentMethodFromStorage = window.localStorage.getItem("paymentMethod")
          ? JSON.parse(localStorage.getItem("paymentMethod"))
          : "";
      }
      commit(CART_INITIALIZE_STATE, cartItemsFromStorage);
      commit(CART_SAVE_ADDRESS, shippingAddressFromStorage);
      commit(CART_SAVE_PAYMENT_METHOD, paymentMethodFromStorage);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getters = {
  loading: state => state.loading,
  cartItems: state => state.cartItems,
  address: state => state.address,
  paymentMethod: state => state.paymentMethod,
  error: state => state.error,
  message: state => state.message
};
