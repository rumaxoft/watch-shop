import Vue from "vue";
import Inputmask from 'inputmask'

Vue.directive('mask', {
  bind: function (el, binding) {
    Inputmask(binding.value).mask(el.getElementsByTagName('INPUT')[0])
  }
})
