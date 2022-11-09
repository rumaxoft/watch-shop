export const state = () => ({
  apiUrlServer: "",
  apiUrlBrowser: ""
});

export const mutations = {
  SET_API_URL_SERVER(state, apiUrl) {
    state.apiUrlServer = apiUrl;
  },
  SET_API_URL_BROWSER(state, apiUrl) {
    state.apiUrlBrowser = apiUrl;
  }
};

export const actions = {
  setApiUrlServer: {
    root: true,
    handler: ({ commit }) => {
      const apiUrl = process.env.API_URL_SERVER;
      commit("SET_API_URL_SERVER", apiUrl);
    }
  },
  setApiUrlBrowser: {
    root: true,
    handler: ({ commit }) => {
      const apiUrl = process.env.API_URL_BROWSER;
      commit("SET_API_URL_BROWSER", apiUrl);
    }
  }
};

export const getters = {
  getApiUrl: state => {
    if (process.browser) return state.apiUrlBrowser;
    return state.apiUrlServer;
  }
};
