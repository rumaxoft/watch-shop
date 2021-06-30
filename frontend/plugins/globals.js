import Vue from "vue";
import Element from "element-ui";
import VueLazyload from "vue-lazyload";
import locale from "element-ui/lib/locale/lang/ru-RU";
import "@/theme/element-variables.scss";
import currencyFilter from "./currency.filter";

Vue.directive("visible", (el, binding) => {
  el.style.visibility = !!binding.value ? "visible" : "hidden";
});

Vue.filter("currency", currencyFilter);

Vue.use(Element, { locale });
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
});
