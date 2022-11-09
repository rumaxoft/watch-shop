export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch("setApiUrlServer");
    dispatch("setApiUrlBrowser");
  }
};
